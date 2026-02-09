import React from 'react';
import BaseButton from '@/components/ui/BaseButton';
import InfoRow from '@/components/ui/InfoRow';
import MovieSchedule from '@/components/movie/MovieSchedule';
import MovieTrailer from '@/components/movie/MovieTrailer';
import MovieRecommendations from '@/components/movie/MovieRecommendations';
import type { IMovieDetails, IMovieCard } from '@/types/movie';
import { PLACEHOLDER_IMAGE } from '@/constants';

interface MovieDetailsContentProps {
	movie: IMovieDetails;
	recommendations: IMovieCard[];
	onScrollToTrailer: () => void;
	playerRef: React.RefObject<HTMLDivElement>;
	poster: string;
}

const MovieDetailsContent: React.FC<MovieDetailsContentProps> = ({
	movie,
	recommendations,
	onScrollToTrailer,
	playerRef,
	poster,
}) => {
	const posterSrc = poster && poster.trim() !== '' ? poster : PLACEHOLDER_IMAGE;

	const subtitlesValue = typeof movie.subtitles === 'boolean' 
		? (movie.subtitles ? 'Так' : 'Ні') 
		: movie.subtitles;

	const ratingValue = (movie as any).rating || (movie as any).imdbRating || 'N/A';

	return (
		<div className="relative w-full font-['Inter'] bg-[#020617] min-h-screen pb-20 overflow-hidden">

			<div
				className="absolute -top-25 -left-50 w-150 h-150 bg-[#0753E0] rounded-full blur-[150px] opacity-20 pointer-events-none z-0"/>

			<div className="max-w-7xl mx-auto px-6 pt-10 relative z-10">

				<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">

					<div className="lg:col-span-3 flex flex-col gap-5">
						<div
							className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-2/3 bg-zinc-800">
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
							onClick={onScrollToTrailer}
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
							<InfoRow label="Жанр" value={movie.genre}/>
							<InfoRow label="Рейтинг експертів" value={ratingValue}/>
							<InfoRow label="Мова" value={movie.language}/>
							<InfoRow label="Субтитри" value={subtitlesValue}/>
							<InfoRow label="У головних ролях" value={movie.cast.toString()}/>
						</div>

						<div className="border-t border-white/10 pt-6">
							<h3 className="text-xl font-bold mb-3 text-white/90">Опис:</h3>
							<p className="text-white/80 leading-relaxed font-light text-justify text-lg">
								{movie.description}
							</p>
						</div>
					</div>

					<div className="lg:col-span-3">
						<MovieSchedule schedule={movie.schedule}/>
					</div>
				</div>

				<MovieTrailer
					ref={playerRef}
					poster={posterSrc}
					trailerUrl={movie.trailerUrl}
				/>

				<MovieRecommendations
					movies={recommendations}
					currentMovieId={Number(movie.id)}
				/>

			</div>
		</div>
	);
};

export default MovieDetailsContent;