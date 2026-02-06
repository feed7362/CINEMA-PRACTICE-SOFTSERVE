import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import BackgroundEffects from '@/components/ui/BackgroundEffects';
import MovieFormFields from '@/components/forms/MovieFormFields';
import FullScreenLoader from '@/components/loader/FullScreenLoader';
import { movieApi } from '@/api/movieApi';
import type { CreateMovie } from '@/types/movie';

const AddMovie: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const isEditMode = !!id;

    const [loading, setLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const methods = useForm<CreateMovie>({
        defaultValues: {
            studioId: 0,
            titleOrg: '',
            titleUkr: '',
            description: '',
            duration: 0,
            releaseDate: new Date().toISOString().slice(0, 16),
            finishDate: new Date().toISOString().slice(0, 16),
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

    useEffect(() => {
        if (isEditMode && id) {
            loadMovieData(id);
        }
    }, [isEditMode, id]);

    const loadMovieData = async (movieId: string) => {
        setIsFetching(true);
        try {
            const data = await movieApi.getMovieById(movieId);
            
            if (data) {
                const rawData = data as any;
                const formData: any = {
                    ...rawData,
                    releaseDate: new Date(rawData.releaseDate || Date.now()).toISOString().slice(0, 16),
                    finishDate: new Date(rawData.finishDate || Date.now()).toISOString().slice(0, 16),
                    genreIds: rawData.genreIds ? rawData.genreIds.join(', ') : '',
                    actorIds: rawData.actorIds ? rawData.actorIds.join(', ') : '',
                    studioId: Number(rawData.studioId) || 0,
                };

                methods.reset(formData);
            }
        } catch (err) {
            console.error("Failed to load movie", err);
            alert("Не вдалося завантажити дані фільму");
            navigate('/admin');
        } finally {
            setIsFetching(false);
        }
    };

    const onSubmit = async (data: any) => {
        setLoading(true);
        try {
            const cleanIds = (val: any) => {
                if (Array.isArray(val)) return val.map(Number);
                if (typeof val === 'string') return val.split(',').map(s => Number(s.trim())).filter(n => !isNaN(n));
                return [];
            };

            const payload = {
                id: Number(id),
                studioId: Number(data.studioId),
                titleOrg: data.titleOrg,
                titleUkr: data.titleUkr,
                description: data.description,
                duration: Number(data.duration),
                releaseDate: new Date(data.releaseDate).toISOString(),
                finishDate: new Date(data.finishDate).toISOString(),
                ageRating: Number(data.ageRating),
                imdbRating: Number(data.imdbRating),
                director: data.director,
                country: data.country,
                subtitles: data.subtitles === "Так" || data.subtitles === true, 
                imageUrl: data.imageUrl,
                trailerUrl: data.trailerUrl,
                genreIds: cleanIds(data.genreIds),
                actorIds: cleanIds(data.actorIds)
            };

            await movieApi.updateMovie(payload);
            setIsSuccess(true);
            setTimeout(() => navigate('/admin/editMoviesList'), 1500);

        } catch (err: any) {
            console.error("Error 500 Details:", err.response?.data);
            setError("Сервер відхилив дані. Перевірте формат.");
        } finally {
            setLoading(false);
        }
    };

    if (isFetching) return <FullScreenLoader />;

    return (
        <div className="min-h-screen bg-main-dark text-white relative overflow-hidden flex flex-col font-sans">
            <BackgroundEffects />

            {isSuccess && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-[#002D6E] border border-green-400/30 p-8 rounded-2xl shadow-2xl text-center">
                        <h3 className="text-2xl font-bold text-white mb-2">Успіх!</h3>
                        <p className="text-blue-200">
                            {isEditMode ? 'Зміни збережено.' : 'Фільм додано.'}
                        </p>
                    </div>
                </div>
            )}

            <div className="grow flex items-center justify-center relative z-10 px-4 py-10">
                <div className="w-full max-w-6xl bg-[#002D6E]/90 border border-blue-400/20 rounded-2xl p-8 md:p-12 shadow-2xl backdrop-blur-sm">
                    
                    <h2 className="text-3xl font-bold mb-8 text-center">
                        {isEditMode ? `Редагування: ${methods.getValues('titleUkr') || 'Фільм'}` : 'Додавання нового фільму'}
                    </h2>

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-200 text-center">
                            {error}
                        </div>
                    )}

                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(onSubmit)}>
                            <div className="w-full">
                                <MovieFormFields />
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
                                    type="submit" 
                                    disabled={loading || isSuccess}
                                    className="w-full md:w-auto px-12 py-3 bg-[#0041C4] hover:bg-[#0035A0] disabled:bg-gray-600 text-white rounded-lg font-bold shadow-lg transition-all active:scale-95 cursor-pointer flex items-center justify-center"
                                >
                                    {loading ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" /> : (
                                        isEditMode ? 'Зберегти зміни' : 'Підтвердити'
                                    )}
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