import type { MoviePreviewProps } from "../types/movie";

import poster1 from "@/assets/images/poster1.jfif";
import poster2 from "@/assets/images/poster2.jfif";
import poster3 from "@/assets/images/poster3.jfif";
import poster4 from "@/assets/images/poster4.jfif";

export const MOCK_PREVIEW: MoviePreviewProps[] = [
  {
    id: 1,
    title: "Потяг у 31 грудня",
    poster: poster1,
    releaseDate: "31 грудня",
    ageRating: "15+",
    isBlurred: false
    },
  {
    id: 1,
    title: "Потяг у 31 грудня",
    poster: poster2,
    releaseDate: "31 грудня",
    ageRating: "5+",
    isBlurred: false
  },
  {
    id: 1,
    title: "Потяг у 31 грудня",
    poster: poster3,
    releaseDate: "31 грудня",
    ageRating: "15+",
    isBlurred: false,
  },
  {
    id: 1,
    title: "Потяг у 31 грудня",
    poster: poster4,
    releaseDate: "31 грудня",
    ageRating: "0+",
    isBlurred: false
  },
  {
    id: 1,
    title: "Потяг у 31 грудня",
    poster: poster1,
    releaseDate: "31 грудня",
    ageRating: "5+",
    isBlurred: false
  }
];