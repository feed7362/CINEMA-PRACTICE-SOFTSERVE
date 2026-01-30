import React from 'react';
import MovieCard from '@/components/movie/MovieCard';
import MovieSchedule from '@/components/movie/MovieSchedule';
import MoviePreviewCard from '@/components/movie/MoviePreviewCard';
import Input from '@/components/ui/Input';
import BaseButton from '@/components/ui/BaseButton';
import UserIcon from '@/assets/icons/UserIcon';
import PlayIcon from '@/assets/icons/PlayIcon';
import { MOCK_MOVIES, MOCK_SCHEDULE } from '@/constants/mockMovies';
import { MOCK_PREVIEW } from '@/constants/mockPreview';

const Example: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-10 space-y-20">
      
      <section>
        <h2 className="text-white text-4xl font-bold mb-8 text-center">Зараз у кіно</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {MOCK_MOVIES?.slice(0, 5).map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      <section className="flex flex-col lg:flex-row gap-12 items-start">
        <div className="flex-1 w-full">
          <h2 className="text-white text-4xl font-bold mb-8 text-center">Скоро у прокаті</h2>
          <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
            {MOCK_PREVIEW?.slice(0, 5).map((movie, index) => (
              <MoviePreviewCard 
                key={`${movie.id}-${index}`}
                id={movie.id}
                title={movie.title}
                poster={movie.poster}
                releaseDate={movie.releaseDate}
                ageRating={movie.ageRating}
                isBlurred={movie.isBlurred}
              />
            ))}
          </div>
        </div>

        <aside className="lg:w-auto mx-auto lg:mx-0">
          <MovieSchedule schedule={MOCK_SCHEDULE} />
        </aside>
      </section>

      <section className="bg-white/5 p-10 rounded-3xl border border-white/5 space-y-12 mb-10">
        <h2 className="text-white text-3xl font-bold border-b border-white/10 pb-4">UI Kit Preview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-zinc-400">
          <div className="space-y-6">
            <h3 className="uppercase text-sm font-bold tracking-widest text-zinc-500">Inputs</h3>
            <Input label="Ваше ім'я" placeholder="Наталя" id="ui-name" />
            <Input label="Електронна пошта" type="email" placeholder="example@mail.com" id="ui-email" />
          </div>

          <div className="space-y-6">
            <h3 className="uppercase text-sm font-bold tracking-widest text-zinc-500">Buttons & States</h3>
            <div className="flex flex-wrap items-center gap-6">
              
              <BaseButton 
                to="#" 
                className="px-8 py-3 rounded-xl gap-3"
              >
                <PlayIcon className="text-white w-6 h-6" />
                <span className="text-white text-xl font-bold">Дивитися трейлер</span>
              </BaseButton>

              <BaseButton 
                to="/profile" 
                className="w-16 h-14 rounded-xl"
              >
                <UserIcon className="w-7 h-7 text-white" />
              </BaseButton>

            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Example;