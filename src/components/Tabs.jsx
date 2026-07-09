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
            
            {slide.desc && (
              <p className="text-lg sm:text-xl md:text-2xl text-zinc-300 leading-relaxed max-w-4xl border-l-4 border-primary-500 pl-5 md:pl-6 py-2 font-medium mb-6 bg-gradient-to-r from-primary-500/5 to-transparent rounded-r-xl">
                {slide.desc}
              </p>
            )}

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
      title: 'Bước 1: Lên ý tưởng và Định hình thông điệp', 
      desc: 'Để máy tính có thể hiểu và tái tạo chính xác bức tranh bạn mong muốn, bước đầu tiên và quan trọng nhất là phải có một ý tưởng thật rõ ràng. Với các hoạt động của Đoàn Thanh niên, bức ảnh cần thể hiện được sự nhiệt huyết, sức trẻ và tinh thần cống hiến. Bạn cần xác định rõ các yếu tố cấu thành: Nhân vật trung tâm là ai? Đang làm hành động gì? Bối cảnh diễn ra ở đâu? Không khí và màu sắc chủ đạo của bức tranh sẽ mang cảm xúc như thế nào?', 
      details: ['👥 Nhân vật: Đoàn viên, thanh niên, thiếu nhi...', '📍 Bối cảnh: Vùng sâu vùng xa, mặt trận tình nguyện...', '🎨 Phong cách: Chân thực, nghệ thuật, cổ động...', '☀️ Cảm xúc: Tươi sáng, nhiệt huyết, tự hào...']
    },
    { 
      step: 'VD1', 
      title: 'Ví dụ thực tế: Lên ý tưởng', 
      example: '💡 Ý tưởng sơ phác: "Một nhóm đoàn viên thanh niên mặc áo xanh tình nguyện đang hăng hái trồng cây xanh tại một miền quê yên bình vào buổi sáng sớm. Ánh nắng ban mai rực rỡ chiếu xuống, thể hiện sức sống tuổi trẻ và tinh thần chung tay bảo vệ môi trường xanh - sạch - đẹp."'
    },
    { 
      step: '2', 
      title: 'Bước 2: Chuyển đổi ý tưởng thành câu lệnh chuẩn', 
      desc: 'Máy tính xử lý hình ảnh dựa trên các "câu lệnh". Vì hầu hết các hệ thống trí tuệ nhân tạo tạo ảnh tiên tiến hiện nay đều hoạt động tốt nhất với dữ liệu ngoại ngữ, chúng ta nên sử dụng một công cụ xử lý ngôn ngữ (như Gemini) để biên dịch và trau chuốt lại ý tưởng tiếng Việt. Hệ thống ngôn ngữ sẽ giúp tối ưu hóa từ vựng, thêm các thuật ngữ nhiếp ảnh và nghệ thuật chuyên sâu nhằm đảm bảo bức ảnh xuất ra đạt chất lượng cao nhất.', 
    },
    { 
      step: 'VD2', 
      title: 'Ví dụ thực tế: Câu lệnh chuẩn', 
      example: '💡 Lệnh nhờ Trợ lý ảo: "Tôi muốn tạo một bức ảnh về Đoàn Thanh niên. Hãy đóng vai một chuyên gia đồ họa, dịch và tối ưu ý tưởng sau sang tiếng Anh để hệ thống vẽ tranh hiểu tốt nhất: Một nhóm thanh niên mặc áo sơ mi xanh Đoàn đang trồng cây dưới ánh nắng bình minh, phong cách nhiếp ảnh chân thực, sắc nét."'
    },
    { 
      step: '3', 
      title: 'Bước 3: Sử dụng tư liệu tham khảo gốc', 
      desc: 'Đôi khi, việc mô tả bằng lời nói là chưa đủ để diễn tả hết sự độc đáo của một khoảnh khắc. Bạn hoàn toàn có thể cung cấp cho hệ thống trí tuệ nhân tạo một bức ảnh có sẵn làm tài liệu tham khảo. Khi có hình ảnh mốc, máy tính có thể phân tích bố cục, đặc điểm khuôn mặt hoặc màu sắc của áo Đoàn để vẽ ra một bức tranh mới bám sát với thực tế phong trào của chi đoàn bạn hơn.', 
    },
    { 
      step: 'VD3', 
      title: 'Ví dụ thực tế: Dùng tư liệu tham khảo', 
      example: '💡 Thực hành: Bạn tải lên một bức ảnh chụp tập thể chi đoàn đang tham gia chiến dịch Mùa hè xanh, sau đó yêu cầu hệ thống: "Dựa trên bố cục và trang phục trong bức ảnh này, hãy vẽ lại dưới dạng một bức tranh cổ động nghệ thuật mang màu sắc tươi sáng, rực rỡ."'
    },
    { 
      step: '4', 
      title: 'Bước 4: Tạo hình và tinh chỉnh chi tiết', 
      desc: 'Sau khi đưa câu lệnh và tư liệu cho hệ thống xử lý, bạn sẽ nhận được các kết quả đầu tiên. Sẽ có những trường hợp máy tính vẽ chưa chính xác các chi tiết đặc thù, chẳng hạn như huy hiệu Đoàn bị mờ. Đừng vội bỏ cuộc, hãy sử dụng tính năng "Chỉnh sửa cục bộ". Tính năng này cho phép bạn khoanh vùng chính xác phần bị lỗi và yêu cầu máy tính chỉ vẽ lại duy nhất khu vực đó mà không làm hỏng tổng thể bức tranh.', 
    },
    { 
      step: 'VD4', 
      title: 'Ví dụ thực tế: Tinh chỉnh chi tiết', 
      example: '💡 Xử lý lỗi: Bức ảnh tổng thể rất đẹp nhưng huy hiệu Đoàn trên ngực trái áo xanh bị nhòe. Bạn dùng công cụ chỉnh sửa, khoanh tròn vùng ngực trái và gõ thêm một câu lệnh bổ sung cực kỳ ngắn gọn: "Huy hiệu Đoàn Thanh niên Cộng sản Hồ Chí Minh, cờ đỏ sao vàng rõ nét".'
    }
  ];

  const videoSlides = [
    { 
      step: '1', 
      title: 'Bước 1: Lên kịch bản chi tiết cho đoạn phim', 
      desc: 'Sản xuất một đoạn phim ngắn yêu cầu sự chuẩn bị kỹ lưỡng hơn so với hình ảnh tĩnh. Bạn cần viết ra một kịch bản rõ ràng, đóng vai trò như một người đạo diễn chỉ đạo diễn xuất. Trong phong trào Đoàn, những đoạn phim thường hướng tới truyền cảm hứng. Do đó, hãy mô tả chi tiết: Hành động bắt đầu như thế nào? Sự vật xung quanh chuyển động ra sao? Khung cảnh biến đổi như thế nào trong vài giây ngắn ngủi đó?', 
    },
    { 
      step: 'VD1', 
      title: 'Ví dụ thực tế: Kịch bản phim', 
      example: '💡 Kịch bản: "Tại một buổi lễ ra quân chiến dịch thanh niên tình nguyện, một đoàn viên nam đang phất cao lá cờ Đoàn. Gió thổi mạnh làm lá cờ tung bay phấp phới, trong khi phía sau là hàng trăm thanh niên đang đứng nghiêm trang vỗ tay hào hứng."'
    },
    { 
      step: '2', 
      title: 'Bước 2: Phân tách kịch bản hình ảnh và chuyển động', 
      desc: 'Hệ thống trí tuệ nhân tạo xử lý video cần phân biệt rõ giữa bối cảnh tĩnh và yếu tố động. Bạn hãy sử dụng trợ lý ảo để tách kịch bản của mình thành hai phần: Phần mô tả hình ảnh tĩnh (để xây dựng bối cảnh) và phần mô tả chuyển động máy quay (để tạo cảm giác góc máy điện ảnh). Việc chia nhỏ này giúp hệ thống không bị nhầm lẫn giữa việc nhân vật di chuyển hay máy quay di chuyển.', 
    },
    { 
      step: 'VD2', 
      title: 'Ví dụ thực tế: Phân tách chuyển động', 
      example: '💡 Lệnh nhờ Trợ lý ảo: "Hãy viết câu lệnh tạo video chuyên nghiệp. Phân tách rõ: \n- Bối cảnh: Thanh niên cầm cờ Đoàn tại lễ ra quân.\n- Chuyển động: Gió thổi cờ bay phấp phới, góc máy quay từ từ lùi lại dần để thấy toàn cảnh đội hình rộng lớn phía sau."'
    },
    { 
      step: '3', 
      title: 'Bước 3: Tạo khung hình gốc chất lượng cao', 
      desc: 'Một bí quyết quan trọng nhất để có video mượt mà, sắc nét là không yêu cầu máy tính tự tạo video từ con số không. Thay vào đó, bạn hãy quay lại các bước ở phần "Tạo Ảnh", tự mình rèn giũa và vẽ ra một bức ảnh tĩnh mở màn thật hoàn mỹ. Bức ảnh này sẽ là điểm tựa vững chắc để phần mềm dựa vào đó mà tiếp tục kéo dài sự chuyển động cho đoạn phim.', 
    },
    { 
      step: 'VD3', 
      title: 'Ví dụ thực tế: Tạo khung hình gốc', 
      example: '💡 Hành động: Dùng công cụ tạo ảnh để vẽ một bức ảnh tuyệt đẹp mô tả "Đoàn viên thanh niên giơ cao ngọn đuốc truyền thống". Bức ảnh có ánh sáng rực rỡ, độ nét cực cao. Bạn lưu bức ảnh này về máy tính để làm nguyên liệu gốc.'
    },
    { 
      step: '4', 
      title: 'Bước 4: Thổi hồn chuyển động vào bức ảnh', 
      desc: 'Bây giờ, bạn sẽ đưa bức ảnh gốc tĩnh lặng đó vào trong hệ thống trí tuệ nhân tạo chuyên xử lý video. Kết hợp với đoạn câu lệnh chuyển động đã chuẩn bị ở Bước 2, bạn tiến hành căn chỉnh thêm mức độ di chuyển của máy quay. Máy tính sẽ phân tích các điểm ảnh và "thổi hồn", biến khoảnh khắc đứng im thành một đoạn phim sống động, lưu giữ những hình ảnh hào hùng nhất của thanh niên.', 
    },
    { 
      step: 'VD4', 
      title: 'Ví dụ thực tế: Hoàn thiện video', 
      example: '💡 Thao tác cuối: Tải ảnh người thanh niên cầm đuốc lên hệ thống. Gắn kèm câu lệnh chuyển động: "Ngọn lửa trên đuốc cháy bập bùng, tàn lửa bay nhẹ trong không trung, máy quay xoay vòng chậm rãi quanh nhân vật". Nhấn nút Tạo và chờ đón thành quả nghệ thuật của tuổi trẻ!'
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
