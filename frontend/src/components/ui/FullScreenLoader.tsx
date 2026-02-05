import React from 'react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const FullScreenLoader: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617]">
      <LoadingSpinner />
    </div>
  );
};

export default FullScreenLoader;