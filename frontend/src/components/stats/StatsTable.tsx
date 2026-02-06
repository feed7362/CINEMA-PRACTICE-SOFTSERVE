import React from 'react';

interface Movie {
    title: string;
    genre: string;
    director: string;
    country: string;
    releaseYear: number;
    imdbRating: number;
    ageRating: string;
    ticketsSold: number;
    revenue: number;
}

interface StatsTableProps {
    movies: Movie[];
    isLoading: boolean;
}

const StatsTable: React.FC<StatsTableProps> = ({movies, isLoading}) => {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('uk-UA', {
            style: 'currency',
            currency: 'UAH',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="bg-[#002D6E]/80 border border-blue-400/20 rounded-xl overflow-hidden shadow-xl">
            <div className="p-6 border-b border-blue-400/10 flex justify-between items-center">
                <h3 className="text-lg font-bold text-white">Найпопулярніші фільми за період</h3>
                {!isLoading && movies.length > 0 && (
                    <span className="text-xs text-blue-200 bg-blue-900/50 px-3 py-1 rounded-full">
            Всього стрічок: {movies.length}
          </span>
                )}
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-white">
                    <thead className="bg-[#002050] text-gray-400 text-sm">
                    <tr>
                        <th className="py-4 px-6">Назва фільму</th>
                        <th className="py-4 px-6">Жанр / Рік</th>
                        <th className="py-4 px-6 hidden md:table-cell">Режисер</th>
                        <th className="py-4 px-6 text-center">IMDb</th>
                        <th className="py-4 px-6 text-right">Квитків</th>
                        <th className="py-4 px-6 text-right">Дохід</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-blue-400/5">
                    {isLoading ? (
                        <tr>
                            <td colSpan={6} className="py-10 text-center animate-pulse text-blue-200">Завантаження
                                статистики...
                            </td>
                        </tr>
                    ) : movies.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="py-10 text-center text-gray-500">Немає даних за цей період</td>
                        </tr>
                    ) : (
                        movies.map((movie, index) => (
                            <tr key={index} className="hover:bg-white/5 transition-colors duration-150">
                                <td className="py-4 px-6">
                                    <div className="font-bold text-white">{movie.title}</div>
                                    <div className="text-xs text-gray-400 md:hidden">{movie.director}</div>
                                </td>

                                <td className="py-4 px-6">
                                    <div className="text-sm text-gray-300">{movie.genre}</div>
                                    <div className="text-xs text-gray-500">{movie.releaseYear}</div>
                                </td>

                                <td className="py-4 px-6 text-gray-300 hidden md:table-cell">
                                    {movie.director}
                                </td>

                                <td className="py-4 px-6 text-center">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                        movie.imdbRating >= 8 ? 'bg-green-500/20 text-green-400' :
                            movie.imdbRating >= 6 ? 'bg-yellow-500/20 text-yellow-500' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {movie.imdbRating}
                    </span>
                                </td>

                                <td className="py-4 px-6 text-right font-mono text-blue-200">
                                    {movie.ticketsSold}
                                </td>

                                <td className="py-4 px-6 text-right font-mono font-medium text-emerald-400">
                                    {formatCurrency(movie.revenue)}
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StatsTable;