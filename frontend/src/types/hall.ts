// src/types/hall.ts

export interface Hall {
  id: number;
  name: string;
  rows: number;
  seatsPerRow: number;
  premiumRows: number[]; // <-- Змінили з number на number[]
}

export const MOCK_HALLS: Hall[] = [
  { id: 1, name: 'Головний зал', rows: 10, seatsPerRow: 12, premiumRows: [9, 10] }, 
  { id: 2, name: 'IMAX', rows: 8, seatsPerRow: 15, premiumRows: [7, 8] },
  { id: 3, name: 'Samsung Onyx', rows: 5, seatsPerRow: 8, premiumRows: [] }, // Немає преміум
  { id: 4, name: 'Laser (Лазерний зал)', rows: 7, seatsPerRow: 10, premiumRows: [4, 5] }, // Преміум посередині
];