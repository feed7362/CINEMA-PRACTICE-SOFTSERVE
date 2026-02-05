import React from 'react';
import effect1 from '../../assets/images/backgroundEffects/effect1.png';
import effect2 from '../../assets/images/backgroundEffects/effect2.png';

const BackgroundEffects: React.FC = () => {
  return (
    <>
      <img 
        src={effect1} 
        alt="" 
        className="absolute top-0 left-0 w-[600px] object-cover opacity-60 pointer-events-none select-none z-0 mix-blend-screen" 
        style={{ transform: 'translate(-20%, -10%)' }}
      />
      <img 
        src={effect2} 
        alt="" 
        className="absolute bottom-0 right-0 w-[700px] object-contain opacity-40 pointer-events-none select-none z-0 mix-blend-screen" 
        style={{ transform: 'translate(20%, 20%)' }}
      />
    </>
  );
};

export default BackgroundEffects;