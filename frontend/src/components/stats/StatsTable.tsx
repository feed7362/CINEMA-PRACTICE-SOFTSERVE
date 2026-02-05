import React from 'react';

const DATA = [
  { id: 1, date: '07.02 12:00', movie: 'Гарі Потер', tickets: '68/70', income: '12 450', status: 'В процесі' },
  { id: 2, date: '16.02 12:30', movie: 'Інтерстеллар', tickets: '70/70', income: '14 000', status: 'Завершено' },
  { id: 3, date: '07.02 13:00', movie: 'Звірополіс', tickets: '10/70', income: '2 000', status: 'Скасовано' },
];

const StatsTable: React.FC = () => {
  return (
    <div className="bg-[#002D6E]/80 border border-blue-400/20 rounded-xl overflow-hidden shadow-xl">
        <div className="p-6 border-b border-blue-400/10 flex justify-between items-center">
            <h3 className="text-lg font-bold text-white">Детальна статистика сеансів</h3>
            <button className="text-blue-400 hover:text-white text-sm">Завантажити звіт</button>
        </div>
        <table className="w-full text-left text-white">
            <thead className="bg-[#002050] text-gray-400 text-sm">
                <tr>
                    <th className="py-4 px-6">Дата</th>
                    <th className="py-4 px-6">Фільм</th>
                    <th className="py-4 px-6">Квитків</th>
                    <th className="py-4 px-6">Дохід</th>
                    <th className="py-4 px-6">Статус</th>
                </tr>
            </thead>
            <tbody>
                {DATA.map((row) => (
                    <tr key={row.id} className="border-b border-blue-400/5 hover:bg-white/5">
                        <td className="py-4 px-6 text-sm">{row.date}</td>
                        <td className="py-4 px-6">{row.movie}</td>
                        <td className="py-4 px-6 text-sm">{row.tickets}</td>
                        <td className="py-4 px-6 text-blue-200">{row.income} грн</td>
                        <td className="py-4 px-6 text-sm">{row.status}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
};

export default StatsTable;