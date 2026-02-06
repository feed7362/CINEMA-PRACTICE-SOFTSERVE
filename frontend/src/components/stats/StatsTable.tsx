import React from 'react';

interface StatsTableProps {
  movies: any[];
  isLoading: boolean;
}

const StatsTable: React.FC<StatsTableProps> = ({ movies, isLoading }) => {
  return (
    <div className="bg-[#002D6E]/80 border border-blue-400/20 rounded-xl overflow-hidden shadow-xl">
      <div className="p-6 border-b border-blue-400/10">
        <h3 className="text-lg font-bold text-white">Найпопулярніші фільми за період</h3>
      </div>
      <table className="w-full text-left text-white">
        <thead className="bg-[#002050] text-gray-400 text-sm">
          <tr>
            <th className="py-4 px-6">Назва фільму</th>
            <th className="py-4 px-6">Режисер</th>
            <th className="py-4 px-6">Країна</th>
            <th className="py-4 px-6 text-center">IMDb</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr><td colSpan={4} className="py-10 text-center">Завантаження...</td></tr>
          ) : movies.length === 0 ? (
            <tr><td colSpan={4} className="py-10 text-center text-gray-500">Немає даних</td></tr>
          ) : (
            movies.map((movie, index) => (
              <tr key={index} className="border-b border-blue-400/5 hover:bg-white/5">
                <td className="py-4 px-6 font-medium">{movie.titleUkr || movie.titleOrg}</td>
                <td className="py-4 px-6 text-gray-300">{movie.director}</td>
                <td className="py-4 px-6 text-sm text-gray-400">{movie.country}</td>
                <td className="py-4 px-6 text-center">
                  <span className="bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded text-xs font-bold">
                    {movie.imdbRating}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StatsTable;