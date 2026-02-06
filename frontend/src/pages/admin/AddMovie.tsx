import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import BackgroundEffects from '@/components/ui/BackgroundEffects';
import MovieGeneralInfo from '@/components/forms/MovieGeneralInfo';
import MovieDetailsInfo from '@/components/forms/MovieDetailsInfo';
import FullScreenLoader from '@/components/loader/FullScreenLoader';
import { movieApi } from '@/api/movieApi';
import type { CreateMovie } from '@/types/movie';

const AddMovie: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const methods = useForm<CreateMovie>({
        defaultValues: {
            studioId: 0,
            titleOrg: '',
            titleUkr: '',
            description: '',
            duration: 0,
            releaseDate: new Date().toISOString(),
            finishDate: new Date().toISOString(),
            ageRating: 0,
            imdbRating: 0,
            director: '',
            country: '',
            subtitles: false,
            imageUrl: '',
            trailerUrl: '',
            genreIds: [],
            actorIds: []
        }
    });

    const onSubmit = async (data: CreateMovie) => {
        setLoading(true);
        setError(null);
        try {
            let formattedGenreIds: number[] = [];
            if (typeof data.genreIds === 'string') {
                formattedGenreIds = (data.genreIds as string)
                    .split(',')
                    .map((s) => Number(s.trim()))
                    .filter((n) => !isNaN(n) && n > 0);
            } else if (Array.isArray(data.genreIds)) {
                formattedGenreIds = data.genreIds;
            }

            let formattedActorIds: number[] = [];
            if (typeof data.actorIds === 'string') {
                formattedActorIds = (data.actorIds as string)
                    .split(',')
                    .map((s) => Number(s.trim()))
                    .filter((n) => !isNaN(n) && n > 0);
            } else if (Array.isArray(data.actorIds)) {
                formattedActorIds = data.actorIds;
            }

            const payload = {
                ...data,
                duration: Number(data.duration),
                ageRating: Number(data.ageRating),
                imdbRating: Number(data.imdbRating),
                studioId: Number(data.studioId) || 1,
                
                releaseDate: new Date(data.releaseDate).toISOString(),
                finishDate: new Date(data.finishDate).toISOString(),

                genreIds: formattedGenreIds,
                actorIds: formattedActorIds
            };

            console.log("Відправляємо дані:", payload);

            await movieApi.createMovie(payload);
            
            alert('Фільм успішно додано!');
            navigate('/admin');
        } catch (err: any) {
            console.error("Помилка створення фільму:", err);
            const serverMessage = err.response?.data?.title || err.response?.data?.detail || err.message;
            setError(typeof serverMessage === 'string' ? serverMessage : 'Помилка сервера.');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <FullScreenLoader />;

    return (
        <div className="min-h-screen bg-main-dark text-white relative overflow-hidden flex flex-col font-sans">
            <BackgroundEffects />
            <div className="grow flex items-center justify-center relative z-10 px-4 py-10">
                <div className="w-full max-w-6xl bg-[#002D6E]/90 border border-blue-400/20 rounded-2xl p-8 md:p-12 shadow-2xl backdrop-blur-sm">
                    <h2 className="text-3xl font-bold mb-8 text-center">Додавання нового фільму</h2>

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-200 text-center">
                            {error}
                        </div>
                    )}

                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(onSubmit)}>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6">
                                <MovieGeneralInfo />
                                <MovieDetailsInfo />
                            </div>

                            <div className="flex justify-end mt-8 pt-6 border-t border-blue-400/30 gap-4">
                                <button
                                    type="button"
                                    onClick={() => navigate('/admin')}
                                    className="px-8 py-3 bg-transparent border border-white/20 hover:bg-white/10 text-white rounded-lg transition-colors"
                                >
                                    Скасувати
                                </button>
                                
                                <button 
                                    id="btn-save-movie"
                                    type="submit" 
                                    disabled={loading}
                                    className="w-full md:w-auto px-12 py-3 bg-[#0041C4] hover:bg-[#0035A0] disabled:bg-gray-600 text-white rounded-lg font-bold shadow-lg shadow-blue-900/50 transition-all active:scale-95 cursor-pointer flex items-center justify-center"
                                >
                                    {loading ? <FullScreenLoader /> : 'Підтвердити'}
                                </button>
                            </div>
                        </form>
                    </FormProvider>
                </div>
            </div>
        </div>
    );
};

export default AddMovie;