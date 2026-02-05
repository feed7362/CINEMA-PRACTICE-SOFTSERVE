import React from 'react';
import HeaderAdmin from '../components/layout/HeaderAdmin';
import BackgroundEffects from '../components/ui/BackgroundEffects';
import MovieGeneralInfo from '../components/forms/MovieGeneralInfo';
import MovieDetailsInfo from '../components/forms/MovieDetailsInfo';

const AddMovie: React.FC = () => {
  return (
    <div className="min-h-screen bg-main-dark text-white relative overflow-hidden flex flex-col font-sans">
        
        <HeaderAdmin />
        <BackgroundEffects />

        <div className="flex-grow flex items-center justify-center relative z-10 px-4 py-10">
            <div className="w-full max-w-6xl bg-[#002D6E]/90 border border-blue-400/20 rounded-2xl p-8 md:p-12 shadow-2xl backdrop-blur-sm">
                
                <form>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6">
                        <MovieGeneralInfo />
                        <MovieDetailsInfo />
                    </div>

                    <div className="flex justify-end mt-8 pt-6 border-t border-blue-400/30">
                        <button 
                            id="btn-save-movie"
                            type="button" 
                            className="w-full md:w-auto px-12 py-3 bg-[#0041C4] hover:bg-[#0035A0] text-white rounded-lg font-bold shadow-lg shadow-blue-900/50 transition-all active:scale-95 cursor-pointer"
                        >
                            Підтвердити
                        </button>
                    </div>
                </form>

            </div>
        </div>
    </div>
  );
};

export default AddMovie;