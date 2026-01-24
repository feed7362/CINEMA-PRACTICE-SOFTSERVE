import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import BaseButton from '../ui/BaseButton';
import UserIcon from '../../assets/icons/UserIcon';
import logo from "../../assets/images/logo.png";

const Header: React.FC = () => {
  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `transition-colors duration-200 text-2xl font-normal ${isActive ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'}`;

  return (
    <header className="w-full bg-[#020617] border-b border-white/5 py-4 px-6 sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        <Link to="/" className="flex-shrink-0">
          <img className="w-40 h-12 object-contain" src={logo} alt="NetFilm Logo" />
        </Link>
        <nav className="hidden lg:flex items-center gap-11">
          <NavLink to="/schedule" className={navLinkClasses}>Розклад сеансів</NavLink>
          <NavLink to="/" className={navLinkClasses}>Зараз у кіно</NavLink>
          <NavLink to="/soon" className={navLinkClasses}>Скоро у кіно</NavLink>
          <NavLink to="/contacts" className={navLinkClasses}>Контакти</NavLink>
        </nav>
        <div className="flex items-center gap-4">
          <BaseButton to="/register" className="px-6 py-2 rounded-lg">
            <span className="text-white font-bold">Реєстрація</span>
          </BaseButton>
          <BaseButton to="/profile" className="w-16 h-14 rounded-xl">
            <UserIcon className="w-7 h-7 text-white" />
          </BaseButton>
        </div>
      </div>
    </header>
  );
};

export default Header;