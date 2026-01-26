import { useNavigate } from "react-router-dom";

export const useMovieNavigation = (movieId: number) => {
  const navigate = useNavigate();

  const goToMovieDetails = () => {
    navigate(`/movie/${movieId}`);
  };

  const goToBooking = (e: React.MouseEvent, time: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/booking/${movieId}?time=${time}`);
  };

  return { goToMovieDetails, goToBooking };
};