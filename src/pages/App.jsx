import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner';

export default function App() {
  const [screen, setScreen] = useState('splash');
  const [balance, setBalance] = useState(12450000);

  // 1. Logika Splash Screen (Otomatis pindah ke Login)
  useEffect(() => {
    if (screen === 'splash') {
      const timer = setTimeout(() => setScreen('login'), 2500);
      return () => clearTimeout(timer);
    }
  }, [screen]);

  // Fungsi Navigasi
  const navigate = (page) => {
    setScreen(page);
    window.scrollTo(0, 0);
  };

  // Komponen Navigasi Bawah (Hanya muncul di halaman utama)
  const BottomNav = () => {
    const menus = [
      { id: 'home', icon: '🏠', label: 'Home' },
      { id: 'transfer', icon: '💸', label: 'Send' },
      { id: 'history', icon: '📊', label: 'History' },
      { id: 'profile', icon: '👤', label: 'Account' },
    ];

    return (
      <nav className="absolute bottom-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-xl border-t border-slate-100 px-8 flex justify-between items-center z-50">
        {menus.map((menu) => (
          <button
            key={menu.id}
            onClick={() => navigate(menu.id)}
            className={`flex flex-col items-center gap-1 transition-all ${
              screen === menu.id ? 'text-blue-600 scale-110' : 'text-slate-300'
            }`}
          >
            <span className="text-xl">{menu.icon}</span>
            <span className="text-[9px] font-bold uppercase">{menu.label}</span>
          </button>
        ))}
      </nav>
    );
  };

  return (
    <div className="relative mx-auto bg-slate-50 shadow-2xl overflow-hidden font-sans" style={{ maxWidth: '390px', height: '844px' }}>
      
      {/* --- 1. SPLASH SCREEN --- */}
      {screen === 'splash' && (
        <div className="h-full bg-blue-700 flex flex-col items-center justify-center text-white animate-pulse">
          <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-4 shadow-2xl">
            <span className="text-blue-700 text-4xl font-black italic">N</span>
          </div>
          <h1 className="text-xl font-bold tracking-[0.3em]">NEOBANK</h1>
        </div>
      )}

      {/* --- 2. LOGIN SCREEN --- */}
      {screen === 'login' && (
        <div className="p-8 pt-24 h-full bg-white animate-in fade-in duration-500">
          <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">Akses Aman<br />Akun Anda</h2>
          <p className="text-slate-400 mt-2 font-medium">Masukkan kredensial m-banking</p>
          <div className="mt-12 space-y-6">
            <input type="text" placeholder="Username" className="w-full bg-slate-50 rounded-2xl p-4 outline-none border-2 border-transparent focus:border-blue-500 transition-all" />
            <input type="password" placeholder="Password PIN" className="w-full bg-slate-50 rounded-2xl p-4 outline-none border-2 border-transparent focus:border-blue-500 transition-all" />
            <button onClick={() => navigate('home')} className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-200 active:scale-95 transition-transform">LOGIN</button>
          </div>
        </div>
      )}

      {/* --- 3. HOME SCREEN --- */}
      {screen === 'home' && (
        <div className="h-full pb-20 overflow-y-auto no-scrollbar">
          <div className="bg-blue-700 p-6 pt-12 pb-24 rounded-b-[3rem] shadow-lg text-white">
            <div className="flex justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">👤</div>
                <div>
                  <p className="text-[10px] text-blue-200 font-bold uppercase">Saldo Aktif</p>
                  <h3 className="font-bold">Budi Setiawan</h3>
                </div>
              </div>
              <button className="p-2 bg-white/10 rounded-xl">🔔</button>
            </div>
            <div className="bg-white p-6 rounded-[2.5rem] text-slate-800 shadow-2xl">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Tabungan Utama</p>
              <h2 className="text-3xl font-black mt-1 text-blue-700">Rp {balance.toLocaleString('id-ID')}</h2>
              <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center text-[10px] font-bold text-slate-400">
                <span>8890 **** 1204</span>
                <span className="text-blue-600">DETAIL</span>
              </div>
            </div>
          </div>
          <div className="px-6 -mt-10 grid grid-cols-4 gap-4">
            {['Transfer', 'Top Up', 'Bill', 'More'].map((m, i) => (
              <div key={i} onClick={() => m === 'Transfer' && navigate('transfer')} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-50 flex flex-col items-center gap-2 cursor-pointer active:scale-90 transition-all">
                <span className="text-xl">{(i === 0) ? '💸' : (i === 1) ? '📱' : (i === 2) ? '🧾' : '✨'}</span>
                <span className="text-[9px] font-bold text-slate-500 uppercase">{m}</span>
              </div>
            ))}
          </div>
          <BottomNav />
        </div>
      )}

      {/* --- 4. TRANSFER SCREEN --- */}
      {screen === 'transfer' && (
        <div className="p-6 h-full bg-white">
          <div className="flex items-center gap-4 mb-8">
            <button onClick={() => navigate('home')} className="text-xl">←</button>
            <h2 className="text-lg font-bold">Transfer Dana</h2>
          </div>
          <div className="space-y-6">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase block mb-2">Nominal</label>
              <input type="number" className="w-full text-4xl font-black text-blue-600 border-b-2 border-slate-100 outline-none pb-2" placeholder="0" />
            </div>
            <input type="text" placeholder="Rekening Tujuan" className="w-full bg-slate-50 p-4 rounded-2xl outline-none" />
            <button 
              onClick={() => { toast.success('Transfer Berhasil!'); navigate('home'); }} 
              className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl mt-10 shadow-lg"
            >
              KIRIM SEKARANG
            </button>
          </div>
          <BottomNav />
        </div>
      )}

      {/* --- 5. HISTORY SCREEN --- */}
      {screen === 'history' && (
        <div className="h-full bg-slate-50">
          <div className="sticky top-0 bg-white/80 backdrop-blur-md p-6 pt-12 border-b border-slate-100 z-20">
            <h2 className="text-center font-bold uppercase tracking-widest text-sm">Riwayat</h2>
          </div>
          <div className="p-6 space-y-4 pb-24">
            {[
              { t: 'Starbucks', a: '-48.000', i: '☕', c: 'text-red-500' },
              { t: 'Gaji Pokok', a: '+8.500.000', i: '💼', c: 'text-green-500' },
              { t: 'Topup GoPay', a: '-100.000', i: '📱', c: 'text-red-500' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-4 rounded-2xl flex justify-between items-center shadow-sm border border-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-lg">{item.i}</div>
                  <div>
                    <p className="text-xs font-bold">{item.t}</p>
                    <p className="text-[9px] text-slate-400 uppercase font-bold">Berhasil</p>
                  </div>
                </div>
                <span className={`text-xs font-black ${item.c}`}>{item.a}</span>
              </div>
            ))}
          </div>
          <BottomNav />
        </div>
      )}

      {/* --- 6. PROFILE SCREEN --- */}
      {screen === 'profile' && (
        <div className="h-full bg-slate-50 text-center">
          <div className="bg-white p-10 pt-20 rounded-b-[4rem] shadow-sm mb-6">
            <div className="w-24 h-24 bg-blue-100 rounded-[2.5rem] mx-auto flex items-center justify-center text-3xl mb-4">👤</div>
            <h3 className="font-bold text-lg">Budi Setiawan</h3>
            <p className="text-xs text-blue-600 font-bold uppercase tracking-widest">Nasabah Priority</p>
          </div>
          <div className="p-6">
            <button onClick={() => navigate('login')} className="w-full bg-red-50 text-red-500 font-bold py-4 rounded-2xl active:scale-95 transition-all">LOGOUT</button>
          </div>
          <BottomNav />
        </div>
      )}

      <Toaster position="top-center" />
    </div>
  );
}