import React from 'react';
import { FormProvider } from 'react-hook-form';
import BackgroundEffects from '@/components/ui/BackgroundEffects';
import MovieFormFields from '@/components/forms/MovieFormFields';
import FullScreenLoader from '@/components/loader/FullScreenLoader';
import { useMovieForm } from '@/hooks/useMovieForm';
import LoaderIcon from '@/assets/icons/LoaderIcon';

const AddMovie: React.FC = () => {
	const { 
		methods, 
		isLoading, 
		isFetching, 
		isEditMode, 
		onSubmit, 
		navigate, 
	} = useMovieForm();

	if (isFetching) return <FullScreenLoader />;

	return (
		<div className="min-h-screen bg-main-dark text-white relative overflow-hidden flex flex-col font-sans">
			<BackgroundEffects />

			<div className="grow flex items-center justify-center relative z-10 px-4 py-10">
				<div className="w-full max-w-6xl bg-[#002D6E]/90 border border-blue-400/20 rounded-2xl p-8 md:p-12 shadow-2xl backdrop-blur-sm">
                    
					<h2 className="text-3xl font-bold mb-8 text-center">
						{isEditMode ? `Редагування: ${methods.getValues('titleUkr') || 'Фільм'}` : 'Додавання нового фільму'}
					</h2>

					<FormProvider {...methods}>
						<form onSubmit={onSubmit}>
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
									disabled={isLoading}
									className="w-full md:w-auto px-12 py-3 bg-[#0041C4] hover:bg-[#0035A0] disabled:bg-gray-600 text-white rounded-lg font-bold shadow-lg transition-all active:scale-95 cursor-pointer flex items-center justify-center min-w-180px"
								>
									{isLoading ? (
										<LoaderIcon size={24} className="animate-spin" />
									) : (
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