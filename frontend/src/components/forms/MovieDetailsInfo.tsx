import React from 'react';
import AdminInput from '../ui/AdminInput';

const MovieDetailsInfo: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <AdminInput id="movie-director" label="Режисер" type="text" />
      <AdminInput id="movie-actors" label="Актори" type="text" />

      <div className="grid grid-cols-2 gap-6">
        <AdminInput id="movie-country" label="Країна" type="text" />
        <AdminInput id="movie-language" label="Мова" type="text" />
      </div>

      {/* Тут 3 колонки */}
      <div className="grid grid-cols-3 gap-6">
        <AdminInput id="movie-year" label="Рік" type="number" placeholder="2024" />
        <AdminInput id="movie-rating" label="Рейтинг" type="number" step="0.1" placeholder="0.0" />
        <AdminInput id="movie-age" label="Вік.Обм" type="text" placeholder="16+" />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <AdminInput id="movie-date-start" label="Початок прокату" type="date" />
        <AdminInput id="movie-date-end" label="Кінець прокату" type="date" />
      </div>
    </div>
  );
};

export default MovieDetailsInfo;