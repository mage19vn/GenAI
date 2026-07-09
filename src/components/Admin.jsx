import React, { useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import Papa from 'papaparse';
import { Lock, ShieldAlert, Download, Loader2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Admin = () => {
  const [layer1, setLayer1] = useState('');
  const [layer2, setLayer2] = useState('');
  const [authLevel, setAuthLevel] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Placeholders for demo purposes
  const APP_PASSWORD = 'mage';
  const SECRET_KEY = 'admin123';

  const handleLayer1Submit = (e) => {
    e.preventDefault();
    if (layer1 === APP_PASSWORD) {
      setAuthLevel(1);
      setError('');
    } else {
      setError('Sai App Password');
    }
  };

  const handleLayer2Submit = (e) => {
    e.preventDefault();
    if (layer2 === SECRET_KEY) {
      setAuthLevel(2);
      setError('');
    } else {
      setError('Sai Secret Key');
    }
  };

  const handleExportCSV = async () => {
    setLoading(true);
    try {
      let data = [];
      
      // Thử lấy từ Firebase
      try {
        const querySnapshot = await getDocs(collection(db, 'attendance'));
        data = querySnapshot.docs.map(doc => {
          const docData = doc.data();
          return {
            'Họ Tên': docData.name || '',
            'Trường': docData.school || docData.class || '',
            'Mã Điểm Danh': docData.attendanceCode || docData.studentId || '',
            'Thời Gian': docData.timestamp?.toDate().toLocaleString() || 'N/A'
          };
        });
      } catch (err) {
        console.warn("Lỗi tải từ Firebase, dùng dữ liệu dự phòng:", err);
      }

      // Lấy thêm từ LocalStorage dự phòng (nếu Firebase bị lỗi hoặc thiếu)
      try {
        const localData = JSON.parse(localStorage.getItem('attendance_fallback') || '[]');
        const localFormatted = localData.map(doc => ({
          'Họ Tên': doc.name || '',
          'Trường': doc.school || '',
          'Mã Điểm Danh': doc.attendanceCode || '',
          'Thời Gian': new Date(doc.timestamp).toLocaleString() || 'N/A'
        }));
        
        // Nối dữ liệu
        data = [...data, ...localFormatted];
      } catch (e) {
        console.error("Lỗi tải LocalStorage:", e);
      }

      if (data.length === 0) {
        alert("Không có dữ liệu điểm danh.");
        setLoading(false);
        return;
      }

      const csv = Papa.unparse(data);
      const blob = new Blob(["\ufeff" + csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'attendance.csv';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Error fetching data:", err);
      alert("Lỗi xuất dữ liệu: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <Link 
        to="/"
        className="absolute top-4 left-4 md:top-6 md:left-6 px-4 py-2 rounded-full bg-zinc-900/50 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-all border border-zinc-800/50 flex items-center gap-2 text-sm font-medium backdrop-blur shadow-lg z-50"
      >
        <ArrowLeft size={16} /> Quay lại
      </Link>
      <div className="w-full max-w-md glass-panel p-8">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center text-red-500">
            {authLevel === 0 ? <Lock size={32} /> : <ShieldAlert size={32} />}
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-8 text-zinc-100">
          Admin Dashboard
        </h2>

        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        {authLevel === 0 && (
          <form onSubmit={handleLayer1Submit} className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">App Password</label>
              <input
                type="password"
                className="input-field"
                value={layer1}
                onChange={(e) => setLayer1(e.target.value)}
                placeholder="••••"
              />
            </div>
            <button type="submit" className="btn-primary w-full bg-red-600 hover:bg-red-500 shadow-red-500/20">
              Verify Layer 1
            </button>
          </form>
        )}

        {authLevel === 1 && (
          <form onSubmit={handleLayer2Submit} className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Secret Key</label>
              <input
                type="password"
                className="input-field"
                value={layer2}
                onChange={(e) => setLayer2(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <button type="submit" className="btn-primary w-full bg-red-600 hover:bg-red-500 shadow-red-500/20">
              Verify Layer 2
            </button>
          </form>
        )}

        {authLevel === 2 && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="p-4 bg-primary-500/10 border border-primary-500/30 rounded-xl text-center">
              <p className="text-primary-400 mb-1 font-medium">Access Granted</p>
              <p className="text-sm text-zinc-400">You have full administrative privileges.</p>
            </div>
            
            <button 
              onClick={handleExportCSV}
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Download size={20} />}
              Xuất CSV Điểm Danh
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
