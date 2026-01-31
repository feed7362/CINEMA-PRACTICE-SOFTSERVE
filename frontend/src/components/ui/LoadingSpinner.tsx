import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full min-h-75">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0753E0]"></div>
    </div>
  );
};

export default LoadingSpinner;