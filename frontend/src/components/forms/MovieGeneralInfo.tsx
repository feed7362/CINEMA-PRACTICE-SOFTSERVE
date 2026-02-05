import React from 'react';
import AdminInput from '../ui/AdminInput';
import AdminSelect from '../ui/AdminSelect';
import AdminTextarea from '../ui/AdminTextarea';
import FileUpload from '../ui/FileUpload';
import { MOVIE_GENRES, MOVIE_STATUS_OPTIONS } from '../../constants/movieData';

const MovieGeneralInfo: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <AdminInput id="movie-title" label="Назва фільму" type="text" placeholder="Введіть назву..." />

      <div className="grid grid-cols-2 gap-6">
        <AdminSelect id="movie-genre" label="Жанри" options={MOVIE_GENRES} />
        <FileUpload id="movie-poster" label="Постер" />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <AdminInput id="movie-price" label="Ціна" type="number" placeholder="0" />
        <AdminSelect id="movie-status" label="Стан" options={MOVIE_STATUS_OPTIONS} />
      </div>

      <AdminTextarea id="movie-description" label="Опис" placeholder="Про що цей фільм..." />
    </div>
  );
};

export default MovieGeneralInfo;