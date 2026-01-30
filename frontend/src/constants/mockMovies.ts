import type { IMovie } from "@/types/movie";
import type { IScheduleEntry } from "@/types/movie";

import poster1 from "@/assets/images/poster1.jfif";
import poster2 from "@/assets/images/poster2.jfif";
import poster3 from "@/assets/images/poster3.jfif";
import poster4 from "@/assets/images/poster4.jfif";

export const MOCK_SCHEDULE: IScheduleEntry[] = [
  { date: "Пт, 16 січня", times: ["16:00", "20:00", "23:00"] },
  { date: "Сб, 17 січня", times: ["16:00", "20:00", "23:00"] },
  { date: "Нд, 18 січня", times: ["16:00", "20:00", "23:00"] },
];

export const MOCK_MOVIES: IMovie[] = [
  {
    id: 1,
    title: "Потяг у 31 грудня",
    poster: poster1,
    ageRating: "5+",
    sessions: ["12:00", "20:00"]
  },
  {
    id: 2,
    title: "Вартові планети",
    poster: poster2,
    ageRating: "12+",
    sessions: ["14:30", "18:00", "21:00"]
  },
  {
    id: 3,
    title: "Пригоди у лісі",
    poster: poster3,
    ageRating: "0+",
    sessions: ["10:00", "13:00"]
  },
  {
    id: 4,
    title: "Нічний патруль",
    poster: poster4,
    ageRating: "16+",
    sessions: ["22:30", "00:00"]
  },
  {
    id: 5,
    title: "Космічна подорож",
    poster: poster1,
    ageRating: "6+",
    sessions: ["11:00", "15:00", "19:00"]
  }
];