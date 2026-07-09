import React from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import Tabs from './components/Tabs';
import Admin from './components/Admin';
import Footer from './components/Footer';

import Quiz from './components/Quiz';
import { Gamepad2 } from 'lucide-react';

const MainLayout = () => {
  const [isQuizOpen, setIsQuizOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-zinc-950">
      {/* Dynamic Background Ambient Effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary-600/20 blur-[150px] pointer-events-none animate-pulse duration-10000" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-900/20 blur-[150px] pointer-events-none animate-pulse duration-7000 delay-1000" />
      <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] rounded-full bg-emerald-600/10 blur-[120px] pointer-events-none" />

      {/* Quiz Button */}
      <button 
        onClick={() => setIsQuizOpen(true)}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 p-3 sm:px-5 sm:py-3 flex items-center gap-2 rounded-full transition-all duration-300 bg-gradient-to-r from-primary-500 to-blue-500 hover:from-primary-400 hover:to-blue-400 text-white z-50 group shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:scale-105 hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] cursor-pointer"
        title="Làm bài kiểm tra"
      >
        <Gamepad2 size={20} className="group-hover:animate-bounce" />
        <span className="hidden sm:inline font-bold">Ôn Tập</span>
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-zinc-900"></span>
      </button>

      <Quiz isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />

      <header className="w-full pt-12 pb-8 text-center relative z-10 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/50 border border-zinc-800/80 text-primary-600 text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur shadow-xl">
          <span className="w-2 h-2 rounded-full bg-primary-500 animate-ping absolute" />
          <span className="w-2 h-2 rounded-full bg-primary-500 relative" />
          AI Presentation System
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white via-zinc-200 to-zinc-500 drop-shadow-2xl mb-4">
          Mage And <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-blue-500">AI</span>
        </h1>
        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed px-4">
          Nền tảng hướng dẫn tự động hóa và sáng tạo hình ảnh bằng Trí tuệ nhân tạo.
        </p>
      </header>

      <main className="flex-grow w-full relative z-10">
        <Tabs />
      </main>

      <div className="relative z-10">
        <Footer />
      </div>

      {/* Admin Dashboard Link */}
      <Link 
        to="/admin-dashboard"
        className="fixed bottom-4 left-4 p-2 rounded-full transition-all duration-300 bg-zinc-900/30 text-zinc-600 hover:bg-zinc-800 hover:text-primary-500 z-50 group border border-zinc-800/0 hover:border-zinc-700/50 shadow-lg"
        title="Admin Dashboard"
      >
        <Shield size={16} className="group-hover:scale-110 transition-transform" />
      </Link>
    </div>
  );
};

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/admin-dashboard" element={<Admin />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
