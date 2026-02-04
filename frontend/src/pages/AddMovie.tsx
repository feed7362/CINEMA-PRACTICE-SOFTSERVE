import React from 'react';
import HeaderAdmin from '../components/layout/HeaderAdmin';
import AdminInput from '../components/ui/AdminInput';
import AdminSelect from '../components/ui/AdminSelect';
import AdminTextarea from '../components/ui/AdminTextarea';

import effect1 from '../assets/images/backgroundEffects/effect1.png';
import effect2 from '../assets/images/backgroundEffects/effect2.png';

const AddMovie: React.FC = () => {

  const genresList = [
    "Бойовик", "Комедія", "Драма", "Жахи", "Фантастика", 
    "Трилер", "Мелодрама", "Детектив", "Мультфільм", "Історичний"
  ];
  const genreOptions = genresList.map(g => ({ value: g, label: g }));

  const statusOptions = [
    { value: "soon", label: "Скоро в кіно" },
    { value: "now", label: "В кіно" },
    { value: "sale", label: "Акція" },
    { value: "ended", label: "Прокат завершено" },
  ];

  return (
    <div className="min-h-screen bg-main-dark text-white relative overflow-hidden flex flex-col font-sans">
        
        <HeaderAdmin />

        <img src={effect1} alt="" className="absolute top-0 left-0 w-[600px] object-cover opacity-60 pointer-events-none select-none z-0 mix-blend-screen -translate-x-1/5 -translate-y-1/10" />
        <img src={effect2} alt="" className="absolute bottom-0 right-0 w-[700px] object-contain opacity-40 pointer-events-none select-none z-0 mix-blend-screen translate-x-1/5 translate-y-1/5" />

        <div className="flex-grow flex items-center justify-center relative z-10 px-4 py-10">
            <div className="w-full max-w-6xl bg-[#002D6E]/90 border border-blue-400/20 rounded-2xl p-8 md:p-12 shadow-2xl backdrop-blur-sm">
                
                <form className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6">
                    
                    <div className="flex flex-col gap-6">
                        <AdminInput id="movie-title" label="Назва фільму" type="text" placeholder="Введіть назву..." />

                        <div className="grid grid-cols-2 gap-6">
                            <AdminSelect id="movie-genre" label="Жанри" options={genreOptions} />

                            <div className="flex flex-col gap-2">
                                <label htmlFor="movie-poster" className="text-white font-medium ml-1 cursor-pointer">Постер</label>
                                <div className="w-full h-full min-h-[48px] bg-white rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors border border-gray-300 relative overflow-hidden group">
                                    <span className="text-gray-500 text-sm group-hover:scale-105 transition-transform">Оберіть файл</span>
                                    <input id="movie-poster" type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <AdminInput id="movie-price" label="Ціна" type="number" placeholder="0" />
                            <AdminSelect id="movie-status" label="Стан" options={statusOptions} />
                        </div>

                        <AdminTextarea id="movie-description" label="Опис" placeholder="Про що цей фільм..." />
                    </div>

                    <div className="flex flex-col gap-6">
                        <AdminInput id="movie-director" label="Режисер" type="text" />
                        <AdminInput id="movie-actors" label="Актори" type="text" />

                        <div className="grid grid-cols-2 gap-6">
                            <AdminInput id="movie-country" label="Країна" type="text" />
                            <AdminInput id="movie-language" label="Мова" type="text" />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <AdminInput id="movie-year" label="Рік" type="number" placeholder="2024" />
                            <AdminInput id="movie-rating" label="Рейтинг" type="number" step="0.1" placeholder="0.0" />
                            <AdminInput id="movie-age" label="Вік.Обм" type="text" placeholder="16+" />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <AdminInput id="movie-date-start" label="Початок прокату" type="date" />
                            <AdminInput id="movie-date-end" label="Кінець прокату" type="date" />
                        </div>

                        <div className="flex gap-4 mt-auto pt-8 justify-end">
                            <button 
                                id="btn-save-movie"
                                type="button"
                                className="w-full md:w-auto px-10 py-3 bg-[#0041C4] hover:bg-[#0035A0] text-white rounded-lg font-bold shadow-lg shadow-blue-900/50 transition-all active:scale-95"
                            >
                                Підтвердити
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    </div>
  );
};

export default AddMovie;