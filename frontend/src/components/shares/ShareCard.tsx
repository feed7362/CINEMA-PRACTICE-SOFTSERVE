import React from 'react';
import { PROMO_PLACEHOLDER } from '@/constants';

export interface PromotionProps {
  id: string;
  title: string;
  description: string;
  discountValue: string;
  image: string;
  conditions: string;
}

const ShareCard: React.FC<PromotionProps> = ({ 
  title, 
  description, 
  discountValue, 
  image, 
  conditions
}) => {
  const imageSrc = image ? image : PROMO_PLACEHOLDER;

  return (
    <div className="group relative bg-[#051838]/60 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-[#0753E0]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(7,83,224,0.2)] flex flex-col h-full">
      
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = PROMO_PLACEHOLDER;
          }}
        />
        <div className="absolute top-4 right-4 bg-[#0753E0] text-white font-bold px-3 py-1 rounded-lg shadow-lg rotate-3 group-hover:rotate-0 transition-transform duration-300">
          {discountValue}
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-[#051838] to-transparent opacity-80" />
      </div>

      <div className="p-6 flex flex-col grow relative z-10 -mt-10">
        <h3 className="text-2xl font-bold text-white mb-2 leading-tight group-hover:text-[#3b82f6] transition-colors">
          {title}
        </h3>
        
        <p className="text-white/70 text-sm mb-6 grow font-light">
          {description}
        </p>

        <div className="bg-white/5 p-4 rounded-xl border border-white/5 mt-auto">
          <span className="text-[#0753E0] text-xs font-bold uppercase tracking-wider block mb-1">
            Умови акції:
          </span>
          <p className="text-white/90 text-sm leading-snug">
            {conditions}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShareCard;