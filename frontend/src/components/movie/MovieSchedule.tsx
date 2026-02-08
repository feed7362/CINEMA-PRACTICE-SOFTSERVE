import React from 'react';
import {Link} from 'react-router-dom';
import type {IMovieScheduleItem} from '@/types/session';
import {formatHallFormat} from "@/utils/formatters.ts";

interface MovieScheduleProps {
    schedule?: IMovieScheduleItem[];
}

const MovieSchedule: React.FC<MovieScheduleProps> = ({schedule}) => {
    return (
        <div
            className="bg-[#051838]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-xl sticky top-24 w-full">
            <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">
                Розклад сеансів
            </h3>

            <div className="flex flex-col gap-6">
                {schedule && schedule.length > 0 ? (
                    schedule.map((day, idx) => (
                        <div key={`${day.date}-${idx}`} className="flex flex-col gap-2">
                            <p className="text-white/60 text-[10px] uppercase tracking-widest font-bold pl-1 mb-1">
                                {day.date}
                            </p>

                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                                {day.sessions.map((session) => (
                                    <Link
                                        key={session.id}
                                        to={`/booking/${session.id}`}
                                        className="flex flex-col items-center border border-[#0753E0]/40 bg-[#0753E0]/5 text-blue-400 hover:bg-[#0753E0] hover:text-white hover:shadow-[0_0_15px_rgba(7,83,224,0.4)] transition-all duration-300 rounded-xl py-2 px-1 w-full text-center"
                                    >
                                        <span className="font-mono text-lg font-black leading-none">
                                            {session.time}
                                        </span>

                                        {/* Combined Hall Name and Format */}
                                        <div className="flex flex-col mt-1 opacity-80 group-hover:opacity-100">
                                            <span className="text-[12px] leading-tight opacity-70">
                                                {formatHallFormat(session.hallFormat)}
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div
                        className="text-white/50 text-center py-8 bg-white/5 rounded-xl border border-dashed border-white/10">
                        На жаль, сеансів не знайдено
                    </div>
                )}
            </div>
        </div>
    );
};

export default MovieSchedule;