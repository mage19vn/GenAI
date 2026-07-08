import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Tabs from './components/Tabs';
import Admin from './components/Admin';
import Footer from './components/Footer';

const MainLayout = () => (
  <div className="min-h-screen flex flex-col relative overflow-hidden bg-zinc-950">
    {/* Dynamic Background Ambient Effects */}
    <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary-600/20 blur-[150px] pointer-events-none animate-pulse duration-10000" />
    <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-900/20 blur-[150px] pointer-events-none animate-pulse duration-7000 delay-1000" />
    <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] rounded-full bg-emerald-600/10 blur-[120px] pointer-events-none" />

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
  </div>
);

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
