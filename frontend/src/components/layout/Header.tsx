import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import BaseButton from '@/components/ui/BaseButton';
import UserIcon from '@/assets/icons/UserIcon';
import logo from "@/assets/images/logo.png";
import { useAuth } from '@/context/AuthContext';

const Header: React.FC = () => {
  const { isAdmin, token } = useAuth(); 

  const baseLinkStyles = "transition-colors duration-200 text-2xl font-normal";

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `${baseLinkStyles} ${isActive ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'}`;

  const adminLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `${baseLinkStyles} ml-4 ${isActive ? 'text-blue-400' : 'text-blue-600 hover:text-blue-400'}`;

  return (
    <header className="w-full bg-[#020617] border-b border-white/5 py-4 px-6 sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-360 mx-auto flex items-center justify-between">
        <Link to="/" className="shrink-0">
          <img className="w-40 h-12 object-contain" src={logo} alt="NetFilm Logo" />
        </Link>
        
        <nav className="hidden lg:flex items-center gap-11">
          <NavLink to="/schedule" className={navLinkClasses}>Розклад сеансів</NavLink>
          <NavLink to="/" className={navLinkClasses}>Зараз у кіно</NavLink>
          <NavLink to="/soon" className={navLinkClasses}>Скоро у кіно</NavLink>
          <NavLink to="/shares" className={navLinkClasses}>Акції</NavLink>
          <NavLink to="/contacts" className={navLinkClasses}>Контакти</NavLink>

          {isAdmin && (
             <NavLink to="/admin" className={adminLinkClasses}>
               Адмін панель
             </NavLink>
          )}
        </nav>
        
        <div className="flex items-center gap-4">
          {!token && (
             <Link to="/signup">
                <BaseButton className="px-6 py-2 rounded-lg bg-[#0753E0] hover:bg-[#0642b5] transition-colors">
                  <span className="text-white font-bold">Реєстрація</span>
                </BaseButton>
             </Link>
          )}
          
          <Link to={token ? "/profile" : "/login"}>
            <BaseButton className="w-14 h-11 rounded-lg flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors">
               <UserIcon className="w-6 h-6 text-white" />
            </BaseButton>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;