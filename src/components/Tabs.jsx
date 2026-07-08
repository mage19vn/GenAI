import React, { useState, useEffect, useRef } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Image, Video, Laptop, UserCheck, Sparkles, Wand2, ChevronLeft, ChevronRight, Maximize, Minimize } from 'lucide-react';

const SlideShow = ({ title, slides, mode, setMode }) => {
  const [current, setCurrent] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);

  const nextSlide = () => {
    if (current < slides.length - 1) setCurrent(current + 1);
  };
  const prevSlide = () => {
    if (current > 0) setCurrent(current - 1);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [current, slides.length]);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      if (containerRef.current) {
        await containerRef.current.requestFullscreen().catch(err => console.log(err));
      }
    } else {
      await document.exitFullscreen().catch(err => console.log(err));
    }
  };

  const slide = slides[current];

  return (
    <div className={`animate-in fade-in duration-500 w-full flex flex-col items-center ${isFullscreen ? 'space-y-0' : 'space-y-6'}`}>
      <div 
        ref={containerRef}
        className={`w-full flex flex-col relative overflow-hidden transition-all duration-500 shadow-[0_0_50px_rgba(0,0,0,0.5)] 
        ${isFullscreen ? 'bg-zinc-950 h-screen justify-center rounded-none border-none' : 'glass-panel min-h-[450px] md:min-h-[550px]'}`}
      >
        {/* Mode Toggle inside Fullscreen */}
        {isFullscreen && setMode && (
          <div className="absolute top-4 left-4 md:top-6 md:left-6 z-40 flex gap-2">
            <button 
              onClick={() => { setMode('image'); setCurrent(0); }}
              className={`px-4 py-2 md:px-5 md:py-2.5 rounded-full font-bold text-xs md:text-sm transition-all backdrop-blur shadow-lg border ${mode === 'image' ? 'bg-primary-500 text-zinc-950 border-primary-400' : 'bg-zinc-900/50 text-zinc-400 border-zinc-800 hover:text-zinc-200 hover:bg-zinc-800'}`}
            >
              🖼️ Học Tạo Ảnh
            </button>
            <button 
              onClick={() => { setMode('video'); setCurrent(0); }}
              className={`px-4 py-2 md:px-5 md:py-2.5 rounded-full font-bold text-xs md:text-sm transition-all backdrop-blur shadow-lg border ${mode === 'video' ? 'bg-primary-500 text-zinc-950 border-primary-400' : 'bg-zinc-900/50 text-zinc-400 border-zinc-800 hover:text-zinc-200 hover:bg-zinc-800'}`}
            >
              🎬 Học Tạo Video
            </button>
          </div>
        )}

        {/* Fullscreen Button */}
        <button 
          onClick={toggleFullscreen}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-40 p-2 md:p-3 rounded-full bg-zinc-900/50 hover:bg-zinc-800 text-zinc-400 hover:text-primary-400 transition-all border border-zinc-800/50 backdrop-blur shadow-lg active:scale-90"
          title={isFullscreen ? "Thu nhỏ" : "Toàn màn hình"}
        >
          {isFullscreen ? <Minimize className="w-5 h-5 md:w-6 md:h-6" /> : <Maximize className="w-5 h-5 md:w-6 md:h-6" />}
        </button>

        {/* Progress Bar at the top */}
        <div className="w-full h-1.5 md:h-2 bg-zinc-900 absolute top-0 left-0 z-30 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary-600 via-primary-400 to-primary-300 transition-all duration-500 relative" 
            style={{ width: `${((current + 1) / slides.length) * 100}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse" />
          </div>
        </div>

        {/* Slide Content */}
        <div className={`flex-1 flex flex-col justify-center p-6 sm:p-8 md:p-12 lg:p-16 relative w-full ${isFullscreen ? 'max-w-7xl mx-auto' : ''}`}>
          {/* Huge background number */}
          <div className="absolute right-4 bottom-16 md:right-12 md:bottom-20 text-[120px] md:text-[240px] font-black text-transparent bg-clip-text bg-gradient-to-b from-zinc-800/30 to-transparent select-none pointer-events-none leading-none transform rotate-[-5deg]">
            {slide.step}
          </div>

          <div key={current} className="animate-in slide-in-from-right-8 fade-in duration-500 flex flex-col items-start justify-center w-full h-full z-10 mx-auto max-w-5xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 md:px-5 md:py-2 rounded-full bg-primary-500/10 text-primary-400 font-semibold mb-4 md:mb-6 border border-primary-500/30 text-xs md:text-sm shadow-[0_0_20px_rgba(20,184,166,0.15)] backdrop-blur-md">
              <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
              {title}
            </div>
            
            <div className="flex items-center gap-4 md:gap-6 mb-5 md:mb-6">
              <div className="w-14 h-14 md:w-16 md:h-16 shrink-0 rounded-2xl bg-gradient-to-br from-primary-500/20 to-primary-600/5 text-primary-400 flex items-center justify-center font-black text-3xl md:text-4xl shadow-[0_0_30px_rgba(20,184,166,0.25)] border border-primary-500/40 ring-2 ring-primary-500/20 ring-offset-4 ring-offset-zinc-950">
                {slide.step}
              </div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-zinc-50 tracking-tight leading-tight">{slide.title}</h3>
            </div>
            
            <p className="text-lg sm:text-xl md:text-2xl text-zinc-300 leading-relaxed max-w-4xl border-l-4 border-primary-500 pl-5 md:pl-6 py-2 font-medium mb-6 bg-gradient-to-r from-primary-500/5 to-transparent rounded-r-xl">
              {slide.desc}
            </p>

            {slide.details && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-6 w-full max-w-5xl">
                {slide.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start p-3 md:p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/60 hover:bg-zinc-800/50 transition-colors">
                    <span className="text-sm md:text-base text-zinc-300 leading-relaxed">{detail}</span>
                  </div>
                ))}
              </div>
            )}

            {slide.example && (
              <div className="bg-gradient-to-br from-zinc-900/90 to-zinc-900/50 border border-zinc-700/50 rounded-xl md:rounded-2xl p-5 md:p-6 mt-2 w-full max-w-4xl border-l-4 border-l-yellow-500 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 blur-3xl -mr-16 -mt-16 transition-opacity opacity-50 group-hover:opacity-100" />
                <p className="text-sm md:text-lg text-yellow-100/90 font-mono italic whitespace-pre-wrap relative z-10">
                  {slide.example}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Presenter Controls */}
        <div className="w-full flex justify-between items-center px-4 sm:px-8 md:px-12 pb-5 md:pb-8 pt-4 z-20 shrink-0 relative bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent">
          <div className="flex items-center gap-2 md:gap-3 bg-zinc-900/70 px-5 py-2 md:px-6 md:py-2.5 rounded-full border border-zinc-800/80 backdrop-blur shadow-xl">
            <span className="text-primary-400 font-bold text-lg md:text-xl">{current + 1}</span>
            <span className="text-zinc-500 font-semibold text-sm md:text-base">/ {slides.length}</span>
          </div>
          <div className="flex gap-3 md:gap-5">
            <button 
              onClick={prevSlide}
              disabled={current === 0}
              className="p-3 md:p-4 rounded-full bg-zinc-900/80 backdrop-blur border border-zinc-700 hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-[0_0_15px_rgba(0,0,0,0.3)] active:scale-90 text-zinc-300 hover:text-primary-400 group"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={nextSlide}
              disabled={current === slides.length - 1}
              className="p-3 md:p-4 rounded-full bg-zinc-900/80 backdrop-blur border border-zinc-700 hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-[0_0_15px_rgba(0,0,0,0.3)] active:scale-90 text-zinc-300 hover:text-primary-400 group"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
      <p className="text-zinc-500 text-xs sm:text-sm md:text-base animate-pulse text-center">
        💡 Mẹo: Sử dụng phím mũi tên Trái/Phải (← →) hoặc bút trình chiếu để chuyển slide
      </p>
    </div>
  );
};

const GuideWrapper = ({ activeTab, setActiveTab }) => {
  const imageSlides = [
    { 
      step: '1', 
      title: 'Bước 1: Suy nghĩ và Định hình Ý tưởng', 
      desc: 'Để Trí tuệ Nhân tạo (AI) có thể vẽ chính xác hình ảnh bạn đang tưởng tượng trong đầu, bạn cần cung cấp đủ 4 mảnh ghép quan trọng sau đây:', 
      details: ['🐶 Ai hoặc Con gì? (Ví dụ: Một chú chó con lông xù)', '🏡 Đang ở đâu? (Ví dụ: Đang chạy nhảy trên đồng lúa chín vàng)', '🎨 Thể loại tranh gì? (Ví dụ: Vẽ theo kiểu phim hoạt hình 3D)', '☀️ Ánh sáng ra sao? (Ví dụ: Dưới ánh nắng hoàng hôn rực rỡ ấm áp)'],
      example: '💡 Ví dụ gộp lại: "Một chú chó con lông xù đang chạy nhảy trên đồng lúa chín vàng, vẽ theo kiểu phim hoạt hình 3D, dưới ánh nắng hoàng hôn rực rỡ ấm áp."'
    },
    { 
      step: '2', 
      title: 'Bước 2: Nhờ AI "phiên dịch" lệnh', 
      desc: 'Các phần mềm vẽ tranh quốc tế thường làm việc tốt nhất với tiếng Anh. Bạn đừng lo nếu không rành ngoại ngữ, chúng ta sẽ nhờ một trợ lý ảo (như Gemini) dịch và trau chuốt lại câu nói của bạn cho thật chuyên nghiệp.', 
      example: '💡 Lệnh nhờ Gemini: "Bạn hãy dịch câu sau sang tiếng Anh để tôi ra lệnh cho máy vẽ tranh: Một chú chó con chạy ngoài đồng lúa, kiểu hoạt hình 3D..."'
    },
    { 
      step: '3', 
      title: 'Bước 3: Giao việc cho máy vẽ', 
      desc: 'Bây giờ, bạn chỉ việc sao chép (copy) đoạn tiếng Anh vừa được dịch và dán vào phần mềm tạo ảnh. Tuyệt vời hơn, bạn có thể gửi kèm một bức ảnh thật của mình làm mẫu để máy vẽ theo đúng tỷ lệ khuôn mặt.', 
      example: '💡 Mẹo cực hay: Bạn chụp ảnh chú cún cưng ở nhà tải lên làm ảnh gốc, rồi gửi kèm đoạn chữ tiếng Anh vừa dịch. Máy sẽ vẽ ra một chú chó hoạt hình y hệt cún nhà bạn!'
    },
    { 
      step: '4', 
      title: 'Bước 4: Chỉnh sửa các lỗi nhỏ', 
      desc: 'Đôi khi AI có thể vẽ thừa ngón tay hoặc sai chi tiết nhỏ. Thay vì bỏ đi bức tranh và bắt máy vẽ lại từ đầu rất tốn thời gian, bạn chỉ cần sử dụng tính năng khoanh vùng sửa lỗi cục bộ.', 
      example: '💡 Ví dụ: Bạn dùng chuột khoanh tròn vào cái chân bị vẽ thừa, sau đó gõ chữ "xóa cái chân này đi" (bằng tiếng Anh). AI sẽ lập tức tẩy đi và đắp lại khung cảnh cho chuẩn xác.'
    }
  ];

  const videoSlides = [
    { 
      step: '1', 
      title: 'Bước 1: Lên kịch bản chi tiết', 
      desc: 'Để tạo ra một đoạn phim ngắn, bạn cần bắt đầu bằng việc viết ra một câu miêu tả thật rõ ràng. Hãy hình dung bạn đang kể một câu chuyện: Có ai, đang làm hành động gì, và khung cảnh xung quanh ra sao?', 
      example: '💡 Kịch bản ví dụ: "Một đám trẻ con đang nô đùa thi nhau thả diều trên con đường làng bằng đất nện vào một buổi chiều gió mát."'
    },
    { 
      step: '2', 
      title: 'Bước 2: Tách kịch bản thành 2 mảnh', 
      desc: 'Máy làm phim cần hiểu rõ 2 thứ để làm việc tốt nhất. Một là "Bức tranh lúc bắt đầu trông như thế nào", hai là "Mọi thứ sẽ chuyển động ra sao". Bạn hãy nhờ Gemini tách kịch bản ra giúp bạn.', 
      example: '🖼️ [Phần Hình Ảnh]: Bọn trẻ đang cầm diều đứng trên đường làng đất nện.\n🌪️ [Phần Chuyển Động]: Cánh diều bay vút lên cao, gió thổi phấp phới, góc nhìn chạy theo cánh diều.'
    },
    { 
      step: '3', 
      title: 'Bước 3: Đặt góc máy quay như phim rạp', 
      desc: 'Để đoạn phim không bị nhàm chán, bạn có thể ra lệnh cho máy tính cách cầm máy quay giống hệt như một người thợ quay phim chuyên nghiệp đang ghi hình bộ phim của bạn.', 
      details: ['➡️ Lia máy: Quay từ từ sang trái hoặc phải để quét toàn bộ phong cảnh', '↕️ Cuộn máy: Ngước máy lên nhìn bầu trời hoặc cúi xuống nhìn mặt đất', '🔍 Thu phóng: Phóng to ống kính vào sát khuôn mặt một người', '🏃‍♂️ Chạy theo: Máy quay di chuyển chạy ngay phía sau lưng nhân vật'],
      example: '💡 Ví dụ: "Hãy lia máy quay từ từ sang ngang để khán giả có thể nhìn thấy hết cả một cánh đồng lúa bao la".'
    },
    { 
      step: '4', 
      title: 'Bước 4: Vẽ bức tranh mở màn', 
      desc: 'Đây là bước cực kỳ quan trọng! Trước khi làm phim, bạn hãy dùng công cụ vẽ tranh (đã học ở phần Tạo Ảnh) để tạo ra một bức ảnh tĩnh thật ưng ý. Đoạn phim của bạn sẽ bắt đầu chuyển động từ chính bức ảnh này.', 
      example: '💡 Hướng dẫn: Bạn truy cập công cụ vẽ, yêu cầu máy vẽ cảnh bọn trẻ cầm diều trên đường làng thật sắc nét và lưu bức ảnh đó về máy tính.'
    },
    { 
      step: '5', 
      title: 'Bước 5: Thổi hồn cho bức tranh', 
      desc: 'Bây giờ, bạn mở phần mềm làm video AI lên. Tải bức ảnh tĩnh vừa vẽ ở Bước 4 vào phần mềm, sau đó cung cấp thêm "Câu tả chuyển động" (đã chuẩn bị ở Bước 2). Máy tính sẽ tự động tạo ra thước phim!', 
      example: '💡 Thực hành: Tải bức tranh cánh đồng lên, gõ thêm lệnh: "Gió thổi mạnh, bông lúa đung đưa, bọn trẻ ùa chạy về phía trước".'
    },
    { 
      step: '6', 
      title: 'Bước 6: Tinh chỉnh tốc độ chuyển động', 
      desc: 'Một lỗi rất thường gặp là dặn máy cho người chạy quá nhanh, khiến hình ảnh trong video bị móp méo, biến dạng. Bí quyết là hãy dặn máy cho cử động từ từ và tự nhiên thôi.', 
      example: '💡 Mẹo xử lý: Nếu thấy video bị méo, bạn hãy tìm thanh trượt "Độ mạnh chuyển động" (Motion Strength) kéo xuống thấp để mọi cử động trở nên mượt mà, chân thực nhất.'
    }
  ];

  const slides = activeTab === 'image' ? imageSlides : videoSlides;
  const title = activeTab === 'image' ? 'Học Tạo Ảnh' : 'Học Tạo Video';

  return <SlideShow title={title} slides={slides} mode={activeTab} setMode={setActiveTab} />;
};

const Attendance = () => {
  const [formData, setFormData] = useState({ name: '', school: '', attendanceCode: '' });
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await addDoc(collection(db, 'attendance'), {
        ...formData,
        timestamp: new Date()
      });
      setStatus('success');
      setFormData({ name: '', school: '', attendanceCode: '' });
      setTimeout(() => setStatus(null), 3000);
    } catch (error) {
      console.error("Error adding document: ", error);
      setStatus('error');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500 max-w-lg mx-auto py-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-500/10 text-primary-400 mb-2 border border-primary-500/30 shadow-[0_0_30px_rgba(20,184,166,0.2)]">
          <UserCheck size={32} />
        </div>
        <h2 className="text-4xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary-300 via-primary-500 to-primary-600 drop-shadow-lg">
          Điểm Danh Lớp Học
        </h2>
        <p className="text-zinc-400 font-medium">Vui lòng nhập đầy đủ thông tin để hệ thống ghi nhận.</p>
      </div>

      <form onSubmit={handleSubmit} className="glass-panel p-8 md:p-10 space-y-8 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 blur-3xl rounded-full pointer-events-none transition-opacity duration-700 opacity-50 group-hover:opacity-100" />
        
        <div className="space-y-5 relative z-10">
          <div>
            <label className="block text-sm font-semibold text-zinc-300 mb-2 ml-1">Họ và tên học sinh</label>
            <input
              required
              className="input-field bg-zinc-950/50 border-zinc-700/80 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 text-lg py-3.5 shadow-inner"
              placeholder="VD: Mai Trương Thái Lâm"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-zinc-300 mb-2 ml-1">Trường đang học</label>
            <input
              required
              className="input-field bg-zinc-950/50 border-zinc-700/80 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 text-lg py-3.5 shadow-inner"
              placeholder="VD: Trường THPT Phan Văn Trị"
              value={formData.school}
              onChange={(e) => setFormData({...formData, school: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-zinc-300 mb-2 ml-1">Mã số điểm danh</label>
            <input
              required
              className="input-field bg-zinc-950/50 border-zinc-700/80 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 text-lg py-3.5 shadow-inner uppercase tracking-widest font-mono font-bold text-primary-300 placeholder:normal-case placeholder:font-sans placeholder:tracking-normal placeholder:font-normal"
              placeholder="Nhập mã do giáo viên cấp..."
              value={formData.attendanceCode}
              onChange={(e) => setFormData({...formData, attendanceCode: e.target.value})}
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={status === 'submitting'} 
          className="w-full py-4 rounded-xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(20,184,166,0.3)] bg-gradient-to-r from-primary-500 to-primary-600 text-zinc-950 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2 relative z-10"
        >
          {status === 'submitting' ? (
            <><Sparkles className="animate-spin" /> Đang ghi nhận...</>
          ) : (
            'Gửi Điểm Danh'
          )}
        </button>
        {status === 'success' && (
          <div className="text-emerald-400 font-medium text-center py-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 animate-in fade-in slide-in-from-bottom-2 relative z-10">
            ✅ Điểm danh thành công!
          </div>
        )}
        {status === 'error' && (
          <div className="text-red-400 font-medium text-center py-3 bg-red-500/10 rounded-xl border border-red-500/20 animate-in fade-in slide-in-from-bottom-2 relative z-10">
            ❌ Có lỗi xảy ra, vui lòng kiểm tra lại mạng!
          </div>
        )}
      </form>
    </div>
  );
};

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('image');

  const tabs = [
    { id: 'image', label: 'Tạo Ảnh', icon: Image },
    { id: 'video', label: 'Tạo Video', icon: Video },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto mt-8 px-4 relative min-h-screen pb-16">
      <div className="flex flex-wrap gap-2 md:gap-4 mb-10 justify-center bg-zinc-900/40 p-2 md:p-3 rounded-full border border-zinc-800/60 backdrop-blur-xl w-fit mx-auto shadow-2xl">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2 md:px-7 md:py-3 rounded-full font-bold text-sm md:text-base transition-all duration-500 ${
                isActive 
                  ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-zinc-950 shadow-[0_0_20px_rgba(20,184,166,0.4)] scale-105' 
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
              }`}
            >
              <Icon size={18} className={isActive ? 'animate-pulse' : ''} />
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className="min-h-[500px]">
        {(activeTab === 'image' || activeTab === 'video') && <GuideWrapper activeTab={activeTab} setActiveTab={setActiveTab} />}
        {activeTab === 'attendance' && <Attendance />}
      </div>

      {/* Hidden Attendance Button */}
      <button 
        onClick={() => setActiveTab('attendance')}
        className={`fixed bottom-4 right-4 p-2 rounded-full transition-all duration-300 ${activeTab === 'attendance' ? 'bg-primary-500 text-zinc-950' : 'bg-zinc-900/30 text-zinc-600 hover:bg-zinc-800 hover:text-zinc-400'}`}
        title="Điểm danh"
      >
        <UserCheck size={16} />
      </button>
    </div>
  );
};

export default Tabs;
