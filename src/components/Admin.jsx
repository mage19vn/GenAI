import React, { useState, useEffect } from 'react';
import { ref, get, child } from 'firebase/database';
import { db } from '../firebase';
import Papa from 'papaparse';
import { Lock, ShieldAlert, Download, Loader2, ArrowLeft, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

const Admin = () => {
  const [layer1, setLayer1] = useState('');
  const [layer2, setLayer2] = useState('');
  const [authLevel, setAuthLevel] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dataList, setDataList] = useState([]);

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

  const fetchData = async () => {
    setLoading(true);
    try {
      let data = [];
      
      const snapshot = await get(child(ref(db), 'attendance'));
      if (snapshot.exists()) {
        const dbData = snapshot.val();
        data = Object.values(dbData).map(docData => ({
          'Họ Tên': docData.name || '',
          'Trường': docData.school || docData.class || '',
          'Mã Điểm Danh': docData.attendanceCode || docData.studentId || '',
          'Thời Gian': docData.timestamp ? new Date(docData.timestamp).toLocaleString() : 'N/A'
        }));
      }

      setDataList(data.reverse());
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Lỗi lấy dữ liệu: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authLevel === 2) {
      fetchData();
    }
  }, [authLevel]);

  const handleExportCSV = () => {
    if (dataList.length === 0) {
      alert("Không có dữ liệu điểm danh.");
      return;
    }
    const csv = Papa.unparse(dataList);
    const blob = new Blob(["\ufeff" + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'attendance.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <Link 
        to="/"
        className="absolute top-4 left-4 md:top-6 md:left-6 px-4 py-2 rounded-full bg-zinc-900/50 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-all border border-zinc-800/50 flex items-center gap-2 text-sm font-medium backdrop-blur shadow-lg z-50"
      >
        <ArrowLeft size={16} /> Quay lại
      </Link>
      <div className={`w-full glass-panel p-6 sm:p-8 transition-all duration-500 ${authLevel === 2 ? 'max-w-3xl' : 'max-w-md'}`}>
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
            <div className="p-4 bg-primary-500/10 border border-primary-500/30 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-primary-400 font-bold text-lg">Quản Trị Viên</p>
                <p className="text-sm text-zinc-400 mt-1">Tổng số: <span className="text-white font-bold">{dataList.length}</span> lượt điểm danh</p>
              </div>
              <button 
                onClick={fetchData} 
                className="p-3 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700/50 hover:border-primary-500/50 hover:text-primary-400 rounded-xl text-zinc-400 transition-all shadow-md group"
                title="Làm mới dữ liệu"
              >
                <RefreshCw size={20} className={loading ? "animate-spin text-primary-500" : "group-hover:-rotate-180 transition-transform duration-500"} />
              </button>
            </div>
            
            <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-xl shadow-inner max-h-[450px] overflow-hidden flex flex-col relative">
              {loading && dataList.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 text-zinc-500 h-64">
                  <Loader2 className="animate-spin mb-4 text-primary-500" size={32} />
                  <p className="text-sm font-medium">Đang tải dữ liệu...</p>
                </div>
              ) : dataList.length === 0 ? (
                <div className="p-12 text-center text-zinc-500 text-sm h-64 flex items-center justify-center">
                  Chưa có dữ liệu điểm danh nào.
                </div>
              ) : (
                <div className="overflow-auto custom-scrollbar flex-1">
                  <table className="w-full text-left text-sm whitespace-nowrap min-w-[600px]">
                    <thead className="bg-zinc-900/90 text-zinc-400 sticky top-0 backdrop-blur z-10 shadow-sm border-b border-zinc-800">
                      <tr>
                        <th className="px-5 py-4 font-semibold tracking-wider uppercase text-xs">Họ Tên</th>
                        <th className="px-5 py-4 font-semibold tracking-wider uppercase text-xs">Trường</th>
                        <th className="px-5 py-4 font-semibold tracking-wider uppercase text-xs">Mã Điểm Danh</th>
                        <th className="px-5 py-4 font-semibold tracking-wider uppercase text-xs">Thời Gian</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/50 text-zinc-300">
                      {dataList.map((row, idx) => (
                        <tr key={idx} className="hover:bg-zinc-800/40 transition-colors group">
                          <td className="px-5 py-4 font-medium text-primary-200">{row['Họ Tên']}</td>
                          <td className="px-5 py-4 text-zinc-400">{row['Trường']}</td>
                          <td className="px-5 py-4">
                            <span className="font-mono text-xs uppercase bg-zinc-900 border border-zinc-800 px-2 py-1 rounded text-zinc-300 group-hover:border-primary-500/30 transition-colors">{row['Mã Điểm Danh']}</span>
                          </td>
                          <td className="px-5 py-4 text-zinc-500 text-xs">{row['Thời Gian']}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            
            <button 
              onClick={handleExportCSV}
              disabled={loading || dataList.length === 0}
              className="btn-primary w-full flex items-center justify-center gap-3 py-4 text-lg mt-4 shadow-[0_0_20px_rgba(20,184,166,0.15)] disabled:shadow-none"
            >
              <Download size={22} className={loading ? "opacity-50" : ""} /> 
              {loading ? "Đang xuất..." : "Xuất file CSV"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
