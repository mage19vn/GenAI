import React, { useState, useEffect, useRef } from 'react';
import { X, CheckCircle2, XCircle, Trophy, RefreshCcw } from 'lucide-react';

const questions = [
  {
    id: 1,
    question: "Để AI tạo ra một hình ảnh bám sát ý tưởng nhất, bạn cần mô tả chi tiết những yếu tố nào?",
    options: [
      "Chỉ cần mô tả màu sắc chủ đạo của bức tranh.",
      "Không gian, thời gian, con người, hoạt động, cảm xúc và phong cách nghệ thuật.",
      "Câu lệnh lập trình phức tạp.",
      "Tên của các phần mềm đồ họa chuyên nghiệp."
    ],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "Tại sao nên dùng Trợ lý ảo (như ChatGPT, Gemini) để chuyển đổi ý tưởng thành câu lệnh (prompt)?",
    options: [
      "Vì hệ thống tạo ảnh chỉ hiểu được ngôn ngữ lập trình.",
      "Để tự động đăng kết quả lên mạng xã hội.",
      "Giúp dịch sang tiếng Anh chuyên ngành và sắp xếp các từ khóa tối ưu để AI tạo ảnh hiểu tốt nhất.",
      "Vì Trợ lý ảo sẽ vẽ ảnh trực tiếp thay cho công cụ tạo ảnh."
    ],
    correctAnswer: 2
  },
  {
    id: 3,
    question: "Mục đích của tính năng \"Sử dụng tư liệu tham khảo gốc\" (Image-to-image) là gì?",
    options: [
      "Chép y hệt bức ảnh gốc mà không thay đổi bất kỳ chi tiết nào.",
      "Tự động tìm kiếm hình ảnh tương tự trên Google.",
      "Ghép hai bức ảnh khác nhau thành một.",
      "Dùng một bức ảnh có sẵn làm mốc để AI phân tích bố cục, đặc điểm và vẽ ra một bức tranh mới bám sát thực tế hơn."
    ],
    correctAnswer: 3
  },
  {
    id: 4,
    question: "Khi bức ảnh AI tạo ra có tổng thể rất đẹp nhưng bị lỗi một chi tiết nhỏ (ví dụ: huy hiệu Đoàn bị mờ), bạn nên làm gì?",
    options: [
      "Xóa ảnh và yêu cầu AI tạo lại từ đầu.",
      "Dùng tính năng \"Chỉnh sửa cục bộ\" (Inpainting) để khoanh vùng và yêu cầu máy tính chỉ vẽ lại duy nhất khu vực bị lỗi.",
      "Tăng độ phân giải của toàn bộ bức ảnh lên 8K.",
      "Thay đổi phong cách nghệ thuật của bức ảnh sang dạng hoạt hình."
    ],
    correctAnswer: 1
  },
  {
    id: 5,
    question: "Theo hướng dẫn, bước đầu tiên và quan trọng nhất khi sản xuất một đoạn phim ngắn bằng AI là gì?",
    options: [
      "Viết một kịch bản rõ ràng, mô tả chi tiết hành động bắt đầu, chuyển động xung quanh và sự biến đổi khung cảnh.",
      "Chọn nhạc nền cho video.",
      "Lồng tiếng cho các nhân vật trong video.",
      "Cân chỉnh lại màu sắc (color grading) cho toàn bộ video."
    ],
    correctAnswer: 0
  },
  {
    id: 6,
    question: "Vì sao cần phân tách kịch bản thành phần \"hình ảnh tĩnh\" và \"chuyển động\" khi yêu cầu AI tạo video?",
    options: [
      "Giúp video render nhanh hơn bình thường.",
      "Giúp AI không bị nhầm lẫn giữa việc nhân vật di chuyển hay máy quay (camera) di chuyển.",
      "Giúp tăng độ phân giải của video lên mức tối đa.",
      "Vì hệ thống AI chỉ đọc được mỗi câu lệnh gồm 2 dòng."
    ],
    correctAnswer: 1
  },
  {
    id: 7,
    question: "Theo bài giảng, bí quyết quan trọng nhất để tạo ra một video mượt mà, sắc nét mà không bị mờ nhòe là gì?",
    options: [
      "Viết câu lệnh chuyển động thật dài và phức tạp.",
      "Không yêu cầu máy tính tự tạo video từ con số không, mà sử dụng một bức ảnh tĩnh mở màn thật hoàn mỹ làm điểm tựa (nguyên liệu gốc).",
      "Chỉnh tốc độ khung hình (FPS) lên 60.",
      "Sử dụng phần mềm chỉnh sửa video chuyên nghiệp của bên thứ ba để khử nhiễu."
    ],
    correctAnswer: 1
  },
  {
    id: 8,
    question: "Trong bước \"Thổi hồn chuyển động vào bức ảnh\", máy tính sẽ dựa vào những yếu tố nào để tạo ra đoạn phim?",
    options: [
      "Bức ảnh tĩnh được tải lên và đoạn âm thanh mô tả.",
      "Nhiều bức ảnh chụp liên tiếp ghép lại.",
      "Bức ảnh gốc tĩnh lặng kết hợp với đoạn câu lệnh chuyển động đã được phân tách rõ ràng.",
      "Lời nói trực tiếp của người dùng qua micro."
    ],
    correctAnswer: 2
  }
];

// Web Audio API Helpers
const playTone = (frequency, type, duration, vol = 0.1) => {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);

    gainNode.gain.setValueAtTime(vol, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + duration);
  } catch (e) {
    console.error("Audio playback failed", e);
  }
};

const playSuccess = () => {
  playTone(600, 'sine', 0.1);
  setTimeout(() => playTone(800, 'sine', 0.2), 100);
};

const playError = () => {
  playTone(300, 'sawtooth', 0.3, 0.05);
  setTimeout(() => playTone(250, 'sawtooth', 0.4, 0.05), 150);
};

const playVictory = () => {
  const notes = [440, 554, 659, 880];
  notes.forEach((freq, i) => {
    setTimeout(() => playTone(freq, 'sine', 0.3, 0.1), i * 150);
  });
};

const Quiz = ({ isOpen, onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (showResult && score >= questions.length / 2) {
      playVictory();
    }
  }, [showResult]);

  if (!isOpen) return null;

  const handleAnswerClick = (index) => {
    if (isAnswered) return;
    
    setSelectedAnswer(index);
    setIsAnswered(true);

    if (index === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
      playSuccess();
    } else {
      playError();
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden relative flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-zinc-800/80 bg-zinc-900/50">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-blue-500">
              Bài Tập Ôn Tập Kiến Thức
            </h2>
            {!showResult && (
              <p className="text-zinc-400 text-sm mt-1">Câu {currentQuestion + 1} / {questions.length}</p>
            )}
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-8 overflow-y-auto custom-scrollbar">
          {showResult ? (
            <div className="flex flex-col items-center justify-center text-center py-10 animate-in zoom-in-95 duration-500">
              <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-blue-600 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(20,184,166,0.3)]">
                <Trophy size={48} className="text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">Hoàn thành bài tập!</h3>
              <p className="text-xl text-zinc-300 mb-8">
                Bạn trả lời đúng <span className="text-primary-400 font-bold text-2xl mx-1">{score}</span> trên tổng số <span className="text-blue-400 font-bold text-2xl mx-1">{questions.length}</span> câu hỏi.
              </p>
              
              <div className="flex gap-4">
                <button 
                  onClick={handleRestart}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold transition-colors"
                >
                  <RefreshCcw size={20} /> Làm lại
                </button>
                <button 
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-blue-600 hover:opacity-90 text-white font-semibold transition-opacity"
                >
                  Đóng
                </button>
              </div>
            </div>
          ) : (
            <div className="animate-in slide-in-from-right-4 duration-300">
              <h3 className="text-xl sm:text-2xl text-white font-medium mb-8 leading-relaxed">
                {questions[currentQuestion].question}
              </h3>
              
              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => {
                  let btnClass = "w-full text-left p-4 sm:p-5 rounded-xl border-2 transition-all duration-300 flex items-start gap-4 ";
                  let icon = <div className="w-6 h-6 shrink-0 rounded-full border-2 border-zinc-600 mt-0.5 group-hover:border-primary-500 transition-colors flex items-center justify-center text-xs font-bold text-zinc-400">{String.fromCharCode(65 + index)}</div>;

                  if (!isAnswered) {
                    btnClass += "bg-zinc-800/50 border-zinc-700 hover:border-primary-500 hover:bg-zinc-800 cursor-pointer group";
                  } else {
                    btnClass += "cursor-default ";
                    if (index === questions[currentQuestion].correctAnswer) {
                      btnClass += "bg-emerald-900/20 border-emerald-500 text-emerald-100";
                      icon = <CheckCircle2 className="shrink-0 text-emerald-500 mt-0.5" size={24} />;
                    } else if (index === selectedAnswer) {
                      btnClass += "bg-red-900/20 border-red-500 text-red-100";
                      icon = <XCircle className="shrink-0 text-red-500 mt-0.5" size={24} />;
                    } else {
                      btnClass += "bg-zinc-800/30 border-zinc-800 text-zinc-500 opacity-50";
                      icon = <div className="w-6 h-6 shrink-0 rounded-full border-2 border-zinc-700 mt-0.5 flex items-center justify-center text-xs font-bold text-zinc-600">{String.fromCharCode(65 + index)}</div>;
                    }
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerClick(index)}
                      className={btnClass}
                      disabled={isAnswered}
                    >
                      {icon}
                      <span className="text-base sm:text-lg leading-relaxed">{option}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Progress bar */}
        {!showResult && (
          <div className="h-1.5 w-full bg-zinc-800">
            <div 
              className="h-full bg-gradient-to-r from-primary-500 to-blue-500 transition-all duration-500 ease-out"
              style={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
