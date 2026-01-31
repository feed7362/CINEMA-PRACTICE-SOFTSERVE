import React from 'react';
import UserIcon from '@/assets/icons/UserIcon';
import SettingsIcon from '@/assets/icons/SettingsIcon';

interface RoundIconProps {
  children: React.ReactNode;
  isActive?: boolean;
}

const RoundIcon: React.FC<RoundIconProps> = ({ children, isActive }) => (
  <button className={`w-24 h-24 rounded-full flex items-center justify-center bg-linear-to-bl from-blue-700 to-sky-900 shadow-[0px_10px_10px_0px_rgba(0,0,0,0.45)] transition-all duration-300 hover:scale-110 active:scale-95 ${isActive ? 'ring-4 ring-purple-500 ring-offset-4 ring-offset-transparent' : ''}`}>
    <div className="w-10 h-10 flex items-center justify-center text-white">{children}</div>
  </button>
);

const IconSidebar: React.FC = () => (
  <nav className="flex flex-col items-center gap-10 p-5 w-32 rounded-2xl border border-purple-500 bg-zinc-950/50 overflow-hidden">
    <RoundIcon><UserIcon className="w-8 h-8" /></RoundIcon>
    <RoundIcon isActive={true}><SettingsIcon className="w-8 h-8" /></RoundIcon>
  </nav>
);

export default IconSidebar;