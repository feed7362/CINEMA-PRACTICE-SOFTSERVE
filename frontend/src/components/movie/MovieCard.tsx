import React from "react";
import { useMovieNavigation } from "@/hooks/movies/useMovieNavigation";
import type { IMovieCard } from "@/types/movie"; 
import type { SessionDisplay } from "@/types/session";
import { formatHallFormat } from "@/utils/formatters.ts";
import { PLACEHOLDER_IMAGE } from '@/constants';

interface MovieCardProps {
    movie: IMovieCard & { sessions?: SessionDisplay[] };
    isBlurred?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, isBlurred }) => {
    const { id, title, imageUrl, ageRating, sessions = [] } = movie; 
    const { goToMovieDetails, goToBooking } = useMovieNavigation(Number(id));
    const posterSrc = imageUrl && imageUrl.trim() !== '' ? imageUrl : PLACEHOLDER_IMAGE;
    const hasActiveSessions = sessions && sessions.length > 0;

    const handleBookingClick = (e: React.MouseEvent, sessionId: number) => {
        e.preventDefault();
        e.stopPropagation();
        goToBooking(sessionId);
    };

    return (
        <div
            onClick={goToMovieDetails}
            className={`flex flex-col group cursor-pointer w-full max-w-60 mx-auto transition-transform hover:scale-105 duration-300 ${
                isBlurred ? 'opacity-50 blur-sm pointer-events-none' : ''
            }`}
        >
            <article className="relative aspect-2/3 w-full rounded-[18px] overflow-hidden shadow-md bg-zinc-800">
                <img
                    className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-50"
                    src={posterSrc}
                    alt={title}
                    loading="lazy"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
                    }}
                />

                <div
                    className="absolute top-2 right-2 bg-[#D9D9D9]/90 backdrop-blur-sm px-1.5 py-0.5 rounded-[5px] text-black text-[12px] font-bold z-20 min-w-7 text-center">
                    {ageRating}
                </div>

                <div
                    className="absolute inset-0 bg-zinc-900/80 flex flex-col justify-end items-start p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <span className="text-white text-[15px] font-bold mb-3 drop-shadow-lg text-left">
                        Сеанси на сьогодні
                    </span>

                    <div
                        className="flex flex-wrap gap-2 justify-start w-full overflow-y-auto max-h-[80%] pr-1 custom-scrollbar">
                        {hasActiveSessions ? (
                            sessions.map((session: SessionDisplay) => (
                                <button
                                    key={session.id}
                                    onClick={(e) => handleBookingClick(e, session.id)}
                                    className="flex flex-col items-center bg-[#0545BB] hover:bg-[#032d7b] text-white p-2 rounded-xl transition-all duration-300 shadow-md active:scale-95 min-w-17.5 border border-white/10"
                                >
                                    <span className="text-[14px] font-black">{session.time}</span>
                                    <span className="text-[8px] uppercase opacity-80 whitespace-nowrap">
                                        {session.hallFormat ? formatHallFormat(session.hallFormat) : '2D'}
                                    </span>
                                </button>
                            ))
                        ) : (
                            <span
                                className="text-white text-[13px] font-bold bg-zinc-700/80 px-4 py-2.5 rounded-xl cursor-default shadow-md w-full text-center">
                                Сьогодні немає сеансів
                            </span>
                        )}
                    </div>
                </div>
            </article>

            <div className="mt-3 h-13.5 flex items-start justify-center overflow-hidden px-1">
                <h3 className="text-white text-[18px] font-medium text-center leading-tight line-clamp-2">
                    {title}
                </h3>
            </div>
        </div>
    );
};

export default MovieCard;