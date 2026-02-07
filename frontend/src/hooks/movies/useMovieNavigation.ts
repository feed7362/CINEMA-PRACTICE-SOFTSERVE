import {useNavigate} from "react-router-dom";

export const useMovieNavigation = (movieId: number) => {
    const navigate = useNavigate();

    const goToMovieDetails = () => {
        navigate(`/movie/${movieId}`);
    };

    const goToBooking = (sessionId : number) => {
        navigate(`/booking/${sessionId}`);
    };

    return {goToMovieDetails, goToBooking};
};