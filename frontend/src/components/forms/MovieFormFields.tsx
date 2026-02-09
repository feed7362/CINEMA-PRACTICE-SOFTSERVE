import React from 'react';
import { useFormContext } from 'react-hook-form';
import AdminInput from '../admin/AdminInput';
import AdminTextarea from '../admin/AdminTextarea';
import type { CreateMovie } from '@/types/admin';

const MovieFormFields: React.FC = () => {
  const { register, formState: { errors } } = useFormContext<CreateMovie>();

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AdminInput 
          id="movie-title-ukr" 
          label="Назва (укр)" 
          type="text" 
          placeholder="Інтерстеллар"
          error={errors.titleUkr?.message}
          {...register("titleUkr", { required: "Введіть українську назву" })}
        />
        <AdminInput 
          id="movie-title-org" 
          label="Оригінальна назва" 
          type="text" 
          placeholder="Interstellar"
          error={errors.titleOrg?.message}
          {...register("titleOrg", { required: "Введіть оригінальну назву" })}
        />
      </div>

      <AdminTextarea 
        id="movie-description"
        label="Опис фільму"
        placeholder="Короткий опис сюжету..."
        error={errors.description?.message}
        {...register("description", { required: "Опис обов'язковий" })}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AdminInput 
          id="movie-director" 
          label="Режисер" 
          type="text" 
          placeholder="Крістофер Нолан"
          error={errors.director?.message}
          {...register("director", { required: "Вкажіть режисера" })}
        />
        <AdminInput 
          id="movie-actors" 
          label="ID Акторів (через кому)" 
          type="text" 
          placeholder="101, 102, 105"
          error={errors.actorIds?.message}
          {...register("actorIds", { required: "Вкажіть хоча б один ID актора" })}
        /> 
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <AdminInput 
            id="movie-country" 
            label="Країна" 
            type="text" 
            placeholder="США"
            error={errors.country?.message}
            {...register("country", { required: "Вкажіть країну" })}
        />
        <AdminInput 
            id="movie-genres" 
            label="ID Жанрів (через кому)" 
            type="text" 
            placeholder="1, 5"
            error={errors.genreIds?.message}
            {...register("genreIds", { required: "Вкажіть ID жанрів" })}
        />
        <AdminInput 
            id="movie-studio" 
            label="ID Студії" 
            type="number" 
            placeholder="1"
            error={errors.studioId?.message}
            {...register("studioId", { required: "Вкажіть ID студії", min: 1 })}
        />
        <div className="flex flex-col gap-2">
            <label className="text-white font-medium ml-1">Субтитри</label>
            <div className="bg-white rounded-lg px-4 py-3 h-12.5 flex items-center">
                 <label className="flex items-center gap-2 cursor-pointer text-black w-full">
                    <input 
                        type="checkbox" 
                        className="w-5 h-5 accent-blue-600"
                        {...register("subtitles")}
                    />
                    <span>Наявність</span>
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
            {...register("duration", { required: "Вкажіть тривалість", min: 1 })}
        />
        <AdminInput 
            id="movie-rating" 
            label="IMDb Рейтинг" 
            type="number" 
            step="0.1" 
            placeholder="8.5"
            error={errors.imdbRating?.message}
            {...register("imdbRating", { required: "Вкажіть рейтинг", min: 0, max: 10 })}
        />
        <AdminInput 
            id="movie-age" 
            label="Вік (років)" 
            type="number" 
            placeholder="16"
            error={errors.ageRating?.message}
            {...register("ageRating", { required: "Вкажіть віковий рейтинг", min: 0 })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AdminInput 
            id="movie-image" 
            label="Посилання на постер (URL)" 
            type="text" 
            placeholder="https://..."
            error={errors.imageUrl?.message}
            {...register("imageUrl", { required: "Додайте посилання на зображення" })}
        />
        <AdminInput 
            id="movie-trailer" 
            label="Посилання на трейлер (URL)" 
            type="text" 
            placeholder="https://youtube.com/..."
            error={errors.trailerUrl?.message}
            {...register("trailerUrl", { required: "Додайте посилання на трейлер" })}
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <AdminInput 
            id="movie-date-start" 
            label="Початок прокату" 
            type="datetime-local" 
            error={errors.releaseDate?.message}
            {...register("releaseDate", { required: "Вкажіть дату початку" })}
        />
        <AdminInput 
            id="movie-date-end" 
            label="Кінець прокату" 
            type="datetime-local" 
            error={errors.finishDate?.message}
            {...register("finishDate", { required: "Вкажіть дату закінчення" })}
        />
      </div>
    </div>
  );
};

export default MovieFormFields;