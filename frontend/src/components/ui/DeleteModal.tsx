import React from 'react';

interface DeleteModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ 
  isOpen, title, message, onConfirm, onCancel 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300">
      <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-8 w-full max-w-md space-y-6 shadow-2xl scale-100 transform transition-all">
        
        <h3 className="text-2xl font-bold text-center text-white">
          {title}
        </h3>
        
        <p className="text-zinc-400 text-center leading-relaxed">
          {message}
        </p>
        
        <div className="flex gap-4 pt-2">
          <button
            className="w-full py-3 rounded-xl bg-zinc-700 hover:bg-zinc-600 transition-colors text-white font-medium active:scale-95"
            onClick={onCancel}
          >
            Скасувати
          </button>
          
          <button
            className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 transition-colors text-white font-bold shadow-lg shadow-red-900/30 active:scale-95"
            onClick={onConfirm}
          >
            Видалити
          </button>
        </div>

      </div>
    </div>
  );
};

export default DeleteModal;