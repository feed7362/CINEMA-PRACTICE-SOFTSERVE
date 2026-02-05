export interface Movie {
  id: number;
  title: string;
  price: number;
  status: string;
  poster: string;
}

export const MOCK_MOVIES: Movie[] = [
  { id: 1, title: 'Інтерстеллар', price: 200, status: 'В кіно', poster: 'https://upload.wikimedia.org/wikipedia/ru/c/c3/Interstellar_2014.jpg' },
  { id: 2, title: 'Джокер', price: 200, status: 'В кіно', poster: 'https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg' },
  { id: 3, title: 'Гарі Потер', price: 175, status: 'Скоро в прокаті', poster: 'https://m.media-amazon.com/images/M/MV5BMGVmMWNiMDktYjQ0Mi00MWIxLTk0N2UtN2ZlYTdkN2IzNDNlXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg' },
];