import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from "@/assets/images/logo.png";

const HeaderAdmin: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isMainPage = location.pathname === '/admin';

  return (
    <header className="w-full bg-[#020617] border-b border-white/5 py-4 px-6 sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">

        <div className="flex items-center gap-6">
            <Link to="/" className="shrink-0 group" title="Повернутися на сайт">
                <img 
                    className="w-32 md:w-40 h-12 object-contain group-hover:opacity-90 transition-opacity" 
                    src={logo} 
                    alt="NetFilm Logo" 
                />
            </Link>

            <div className="h-8 w-[1px] bg-white/20 hidden md:block"></div>

            <Link 
                to="/admin" 
                className="text-white text-lg md:text-xl font-normal tracking-wide hover:text-brand-blue transition-colors"
            >
                Адмін панель
            </Link>
        </div>

        <div>
            {isMainPage ? (
                <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                    <span className="text-zinc-400 text-sm font-mono">Administrator</span>
                </div>
            ) : (
                <button 
                    onClick={() => navigate('/admin')}
                    className="px-6 py-2 bg-[#0041C4] hover:bg-[#0035A0] text-white font-medium rounded-lg transition-colors shadow-lg shadow-blue-900/20 active:scale-95"
                >
                    Назад
                </button>
            )}
        </div>

      </div>
    </header>
  );
};

export default HeaderAdmin;