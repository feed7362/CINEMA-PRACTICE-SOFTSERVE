import React from 'react';
import { useFormContext } from 'react-hook-form';
import AdminInput from '../admin/AdminInput';
import type { CreateMovie } from '@/types/movie';

const MovieDetailsInfo: React.FC = () => {
  const { register, formState: { errors } } = useFormContext<CreateMovie>();

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-6">
        <AdminInput 
            id="movie-director" 
            label="Режисер" 
            type="text" 
            placeholder="Крістофер Нолан"
            {...register("director")}
        />

        <AdminInput 
            id="movie-actors" 
            label="ID Акторів (через кому)" 
            type="text" 
            placeholder="101, 102, 105"
            {...register("actorIds")}
        /> 
      </div>

      <div className="grid grid-cols-2 gap-6">
        <AdminInput 
            id="movie-country" 
            label="Країна" 
            type="text" 
            placeholder="США"
            {...register("country")}
        />
         <div className="flex flex-col gap-2">
            <label className="text-white font-medium ml-1">Субтитри</label>
            <div className="bg-white rounded-lg px-4 py-3 h-[50px] flex items-center">
                 <label className="flex items-center gap-2 cursor-pointer text-black w-full">
                    <input 
                        type="checkbox" 
                        className="w-5 h-5 accent-blue-600"
                        {...register("subtitles")}
                    />
                    <span>Наявність субтитрів</span>
                 </label>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <AdminInput 
            id="movie-duration" 
            label="Тривалість (хв)" 
            type="number" 
            placeholder="120"
            error={errors.duration?.message}
            {...register("duration", { min: 1 })}
        />
        <AdminInput 
            id="movie-rating" 
            label="IMDb Рейтинг" 
            type="number" 
            step="0.1" 
            placeholder="8.5"
            {...register("imdbRating", { min: 0, max: 10 })}
        />
        <AdminInput 
            id="movie-age" 
            label="Вік (років)" 
            type="number" 
            placeholder="16"
            {...register("ageRating", { min: 0 })}
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <AdminInput 
            id="movie-date-start" 
            label="Початок прокату" 
            type="datetime-local" 
            error={errors.releaseDate?.message}
            {...register("releaseDate", { required: "Вкажіть дату" })}
        />
        <AdminInput 
            id="movie-date-end" 
            label="Кінець прокату" 
            type="datetime-local" 
            error={errors.finishDate?.message}
            {...register("finishDate", { required: "Вкажіть дату" })}
        />
      </div>
    </div>
  );
};

export default MovieDetailsInfo;