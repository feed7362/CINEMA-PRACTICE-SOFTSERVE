export interface Session {
  id: number;
  movieId: string;
  hallId: string;
  time: string;
  date: string;
}

export const MOVIES_LIST = [
  { value: '1', label: 'Інтерстеллар' },
  { value: '2', label: 'Джокер' },
  { value: '3', label: 'Гарі Потер' },
];

export const HALLS_LIST = [
  { value: '1', label: 'Головний зал' },
  { value: '2', label: 'IMAX' },
  { value: '3', label: 'VIP зал' },
];

export const INITIAL_SESSIONS: Session[] = [
  { id: 1, movieId: '1', hallId: '1', time: '12:50', date: '2026-01-30' },
  { id: 2, movieId: '2', hallId: '3', time: '15:30', date: '2026-01-30' },
];