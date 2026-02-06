import React from 'react';
import {useParams} from 'react-router-dom';
import {useMovieDetails} from '@/hooks/useMovieDetails';
import {useMovies} from '@/hooks/useMovies';
import {useScrollToSection} from '@/hooks/useScrollToSection';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import BaseButton from '@/components/ui/BaseButton';
import InfoRow from '@/components/ui/InfoRow';
import MovieSchedule from '@/components/movie/MovieSchedule';
import MovieTrailer from '@/components/movie/MovieTrailer';
import MovieRecommendations from '@/components/movie/MovieRecommendations';

const PLACEHOLDER_IMAGE = "https://placehold.co/300x450/1e293b/ffffff?text=Постер+відсутній";

const MovieDetails: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const {movie, loading} = useMovieDetails(id);
    const {movies: recommendations} = useMovies();

    const {ref: playerRef, scrollTo: scrollToTrailer} = useScrollToSection();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#020617]">
                <LoadingSpinner/>
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white text-xl">
                Фільм не знайдено 😔
            </div>
        );
    }

    const posterSrc = movie.poster && movie.poster.trim() !== '' ? movie.poster : PLACEHOLDER_IMAGE;

    return (
        <div className="relative w-full font-['Inter'] bg-[#020617] min-h-screen pb-20 overflow-hidden">

            <div
                className="absolute -top-25 -left-50 w-150 h-150 bg-[#0753E0] rounded-full blur-[150px] opacity-20 pointer-events-none z-0"/>

            <div className="max-w-360 mx-auto px-6 pt-10 relative z-10">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">

                    <div className="lg:col-span-3 flex flex-col gap-5">
                        <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-2/3">
                            <img
                                src={posterSrc}
                                alt={movie.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
                                }}
                            />
                        </div>

                        <BaseButton
                            onClick={scrollToTrailer}
                            className="w-full py-4 text-lg font-bold rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(7,83,224,0.4)] cursor-pointer active:scale-95 transition-transform"
                        >
                            <span className="text-xl">▷</span> Дивитися трейлер
                        </BaseButton>
                    </div>

                    <div className="lg:col-span-6 text-white">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-wide drop-shadow-md">
                            {movie.title}
                        </h1>

                        <div className="flex flex-col gap-1 mb-8">
                            <InfoRow label="Вікові обмеження" value={movie.ageRating}/>
                            <InfoRow label="Оригінальна назва" value={movie.originalTitle}/>
                            <InfoRow label="Режисер" value={movie.director}/>
                            <InfoRow label="Рік" value={movie.year}/>
                            <InfoRow label="Країна" value={movie.country}/>
                            <InfoRow label="Жанр"
                                     value={Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre}/>                            <InfoRow label="Рейтинг" value={movie.rating}/>
                            <InfoRow label="Мова" value={movie.language}/>
                            <InfoRow label="Субтитри" value={movie.subtitles}/>
                            <InfoRow label="У головних ролях"
                                     value={Array.isArray(movie.cast) ? movie.cast.join(', ') : movie.cast}/>
                        </div>

                        <div className="border-t border-white/10 pt-6">
                            <h3 className="text-xl font-bold mb-3 text-white/90">Опис:</h3>
                            <p className="text-white/80 leading-relaxed font-light text-justify text-lg">
                                {movie.description}
                            </p>
                        </div>
                    </div>

                    <div className="lg:col-span-3">
                        <MovieSchedule schedule={movie.schedule || []}/>
                    </div>
                </div>

                <MovieTrailer ref={playerRef} poster={posterSrc} trailerUrl={movie.trailerUrl}/>
                <MovieRecommendations movies={recommendations} currentMovieId={movie.id.toString()}/>

            </div>
        </div>
    );
};

export default MovieDetails;