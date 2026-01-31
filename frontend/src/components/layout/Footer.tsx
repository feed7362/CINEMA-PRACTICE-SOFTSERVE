import React from 'react';
import { Link } from 'react-router-dom';
import { FOOTER_LINKS } from '@/constants/navigation';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#020617] border-t border-white/5 py-6 px-6 mt-auto font-['Inter']">
      <div className="max-w-360 mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        
        <nav className="flex flex-wrap justify-center md:justify-start items-center gap-x-8 gap-y-4">
          {FOOTER_LINKS.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className="text-white/80 text-base font-normal hover:text-[#0753E0] transition-colors duration-200"
            >
              {link.title}
            </Link>
          ))}
        </nav>
        
        <div className="text-white/20 text-xs whitespace-nowrap">
          © 2026 NetFilm. Усі права захищені.
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;