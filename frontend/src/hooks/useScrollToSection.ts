import { useRef } from 'react';

export const useScrollToSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  const scrollTo = () => {
    ref.current?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'center' 
    });
  };

  return { ref, scrollTo };
};