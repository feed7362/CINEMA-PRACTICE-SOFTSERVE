import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { movieApi } from '@/api/movieApi';
import type { CreateMovie } from '@/types/admin';
import { toast } from 'react-hot-toast';

export const useMovieForm = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const isEditMode = !!id;

    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false);

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

    const cleanIds = (val: any) => {
        if (Array.isArray(val)) return val.map(Number);
        if (typeof val === 'string') return val.split(',').map(s => Number(s.trim())).filter(n => !isNaN(n));
        return [];
    };

    useEffect(() => {
        if (isEditMode && id) {
            const loadData = async () => {
                setIsFetching(true);
                try {
                    const data = await movieApi.getMovieById(id);
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
                    toast.error("Не вдалося завантажити дані фільму");
                    navigate('/admin');
                } finally {
                    setIsFetching(false);
                }
            };
            loadData();
        }
    }, [isEditMode, id, navigate, methods]);

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        try {
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
            toast.success(isEditMode ? 'Зміни збережено' : 'Фільм додано');
            setTimeout(() => navigate('/admin/editMoviesList'), 1500);
        } catch (err: any) {
            console.error("Submission Error:", err);
            toast.error("Помилка збереження. Перевірте дані.");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        methods,
        isLoading,
        isFetching,
        isEditMode,
        onSubmit: methods.handleSubmit(onSubmit),
        navigate
    };
};