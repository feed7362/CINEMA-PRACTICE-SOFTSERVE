import React from 'react';
import BackgroundEffects from '@/components/ui/BackgroundEffects';
import DeleteModal from '@/components/ui/DeleteModal';
import MoviesTable from '@/components/editmovie/MoviesTable.tsx';
import FullScreenLoader from '@/components/loader/FullScreenLoader';
import { useMoviesList } from '@/hooks/movies/useMoviesList';

const EditMoviesList: React.FC = () => {
	const {
		movies,
		isLoading, 
		searchTerm,
		setSearchTerm,
		isDeleteModalOpen,
		askToDelete,
		confirmDelete,
		cancelDelete,
	} = useMoviesList();

	if (isLoading) {
		return <FullScreenLoader />; 
	}

	return (
		<div className="min-h-screen bg-main-dark text-white relative overflow-hidden flex flex-col font-sans">
			<BackgroundEffects />

			<DeleteModal 
				isOpen={isDeleteModalOpen}
				title="Видалити фільм?"
				message="Ви впевнені, що хочете видалити цей фільм? Цю дію неможливо скасувати."
				onConfirm={confirmDelete}
				onCancel={cancelDelete}
			/>

			<div className="grow flex flex-col items-center relative z-10 px-4 py-10">
				<div className="w-full max-w-6xl">
                
					<div className="flex flex-col md:flex-row items-center gap-6 mb-8">
						<h1 className="text-3xl font-bold text-white shrink-0">Фільми</h1>
						<div className="w-full relative">
							<input 
								type="text" 
								placeholder="Пошук за назвою..." 
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full bg-white text-black rounded-full px-6 py-3 outline-none focus:ring-4 focus:ring-blue-500/30 text-lg transition-shadow"
							/>
						</div>
					</div>

					<MoviesTable 
						movies={movies} 
						onDelete={askToDelete} 
					/>
                
					{movies.length === 0 && !isLoading && (
						<div className="text-center text-gray-400 mt-10">
							Фільмів не знайдено
						</div>
					)}

				</div>
			</div>
		</div>
	);
};

export default EditMoviesList;