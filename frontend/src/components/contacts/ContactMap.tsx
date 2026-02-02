import React from 'react';

const ContactMap: React.FC = () => {
  return (
    <div className="w-full h-64 rounded-2xl overflow-hidden border border-white/10 shadow-lg relative bg-zinc-800">
      <iframe 
        src="https://maps.google.com/maps?q=Kyiv&t=&z=13&ie=UTF8&iwloc=&output=embed"
        width="100%" 
        height="100%" 
        style={{ border: 0, filter: 'grayscale(1) invert(1) contrast(0.8) brightness(0.8)' }} 
        allowFullScreen 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
        title="Cinema Location"
      />
    </div>
  );
};

export default ContactMap;