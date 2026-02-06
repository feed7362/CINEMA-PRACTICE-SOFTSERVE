import React, { useState } from 'react';
import DateSelector from '@/components/schedule/DateSelector';
import ScheduleMovieCard from '@/components/schedule/ScheduleMovieCard';

const MOCK_SCHEDULE_MOVIES = [
  {
    id: '1',
    title: 'Дюна: Частина друга',
    poster: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
    hall: 'IMAX Laser 3D',
    sessions: [
      { id: 101, time: '10:00', price: 200 },
      { id: 102, time: '13:45', price: 250 },
      { id: 103, time: '17:30', price: 300 },
      { id: 104, time: '21:15', price: 300 }
    ]
  },
  {
    id: '2',
    title: 'Кунг-фу Панда 4',
    poster: 'https://image.tmdb.org/t/p/w500/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg',
    hall: 'Red Hall',
    sessions: [
      { id: 201, time: '11:00', price: 150 },
      { id: 202, time: '13:00', price: 150 },
      { id: 203, time: '15:00', price: 180 },
      { id: 204, time: '17:00', price: 180 }
    ]
  },
  {
    id: '3',
    title: 'Ґодзілла та Конг: Нова імперія',
    poster: 'https://image.tmdb.org/t/p/w500/tMefBSflR6PGQLv7WvFPpKLZkyk.jpg',
    hall: 'Blue Hall',
    sessions: [
      { id: 301, time: '12:30', price: 160 },
      { id: 302, time: '16:00', price: 190 },
      { id: 303, time: '19:30', price: 220 }
    ]
  }
];

const ScheduleDemo: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="space-y-12 pb-20 text-white">
      
      <div>
        <h1 className="text-3xl font-bold mb-2">Schedule Components</h1>
        <p className="text-gray-400">
          Компоненти для сторінки розкладу сеансів.
        </p>
      </div>

      <section className="bg-[#051329]/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 min-h-[600px]">
        <h2 className="text-xl font-bold mb-6 text-[#0753E0] border-b border-white/10 pb-2">
          Full Schedule View Demo
        </h2>
        
        <div className="mb-8">
            <DateSelector 
                activeDate={selectedDate.toISOString()} 
                onDateSelect={handleDateSelect} 
            />
        </div>

        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl mb-8 text-center">
            <span className="text-blue-300 text-sm">
                Обрана дата для запиту API: 
                <span className="font-bold text-white ml-2">
                    {selectedDate.toLocaleDateString('uk-UA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
            </span>
        </div>

        <div className="space-y-8">
            {MOCK_SCHEDULE_MOVIES.map(movie => (
                <div key={movie.id} className="pb-8 border-b border-white/5 last:border-0">
                    <ScheduleMovieCard movie={movie} />
                </div>
            ))}
        </div>
      </section>

    </div>
  );
};

export default ScheduleDemo;