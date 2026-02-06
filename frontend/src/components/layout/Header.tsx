import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import BaseButton from '@/components/ui/BaseButton';
import UserIcon from '@/assets/icons/UserIcon';
import logo from "@/assets/images/logo.png";
import { isAdmin } from '@/utils/authUtils'; 

const Header: React.FC = () => {
  const userIsAdmin = isAdmin();

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

          {userIsAdmin && (
             <NavLink to="/admin" className={adminLinkClasses}>
               Адмін панель
             </NavLink>
          )}
        </nav>
        
        <div className="flex items-center gap-4">
          <BaseButton to="/signup" className="px-6 py-2 rounded-lg">
            <span className="text-white font-bold">Реєстрація</span>
          </BaseButton>
          
          <BaseButton to="/profile" className="w-14 h-11 rounded-lg flex items-center justify-center">
            <UserIcon className="w-6 h-6 text-white" />
          </BaseButton>
        </div>
      </div>
    </header>
  );
};

export default Header;