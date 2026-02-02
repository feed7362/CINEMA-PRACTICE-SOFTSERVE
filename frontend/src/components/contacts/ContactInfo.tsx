import React from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Send as Telegram } from 'lucide-react';

const ContactInfo: React.FC = () => {
  return (
    <div className="grid gap-8">
      <div className="flex items-start gap-4 group">
        <div className="w-12 h-12 rounded-xl bg-[#0753E0]/10 flex items-center justify-center text-[#0753E0] group-hover:bg-[#0753E0] group-hover:text-white transition-all duration-300 shrink-0">
          <MapPin size={24} />
        </div>
        <div>
          <h3 className="text-lg font-bold mb-1 text-white">Адреса кінотеатру</h3>
          <p className="text-zinc-400">вул. Кінематографічна, 12<br />м. Київ, Україна, 02000</p>
        </div>
      </div>

      <div className="flex items-start gap-4 group">
        <div className="w-12 h-12 rounded-xl bg-[#0753E0]/10 flex items-center justify-center text-[#0753E0] group-hover:bg-[#0753E0] group-hover:text-white transition-all duration-300 shrink-0">
          <Phone size={24} />
        </div>
        <div>
          <h3 className="text-lg font-bold mb-1 text-white">Телефони</h3>
          <p className="text-zinc-400 block mb-1 hover:text-[#60A5FA] transition-colors">
            <a href="tel:+380441234567">+38 (044) 123-45-67</a> (Бронювання)
          </p>
          <p className="text-zinc-400 block hover:text-[#60A5FA] transition-colors">
            <a href="tel:+380449876543">+38 (044) 987-65-43</a> (Адміністрація)
          </p>
        </div>
      </div>

      <div className="flex items-start gap-4 group">
        <div className="w-12 h-12 rounded-xl bg-[#0753E0]/10 flex items-center justify-center text-[#0753E0] group-hover:bg-[#0753E0] group-hover:text-white transition-all duration-300 shrink-0">
          <Clock size={24} />
        </div>
        <div>
          <h3 className="text-lg font-bold mb-1 text-white">Час роботи</h3>
          <p className="text-zinc-400">Щодня: 09:00 - 23:00<br />Без вихідних</p>
        </div>
      </div>

      <div className="flex items-start gap-4 group">
        <div className="w-12 h-12 rounded-xl bg-[#0753E0]/10 flex items-center justify-center text-[#0753E0] group-hover:bg-[#0753E0] group-hover:text-white transition-all duration-300 shrink-0">
          <Mail size={24} />
        </div>
        <div>
          <h3 className="text-lg font-bold mb-1 text-white">Email</h3>
          <a href="mailto:support@netfilm.com" className="text-zinc-400 hover:text-[#60A5FA] transition-colors">
            support@netfilm.com
          </a>
        </div>
      </div>

      <div className="flex gap-4 mt-2">
        {[<Facebook key="fb" />, <Instagram key="inst" />, <Telegram key="tg" />].map((icon, i) => (
          <a 
            key={i}
            href="#" 
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:bg-[#0753E0] hover:border-[#0753E0] hover:text-white transition-all duration-300"
          >
            {icon}
          </a>
        ))}
      </div>
    </div>
  );
};

export default ContactInfo;