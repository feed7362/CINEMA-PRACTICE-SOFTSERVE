import React, { useState, useEffect, useRef } from 'react';
import AdminInput from '../admin/AdminInput';
import AdminSelect from '../admin/AdminSelect';

export interface Option {
	value: string | number;
	label: string;
}

export interface SessionFormData {
	movieId: string;
	hallId: string;
	time: string;
	date: string;
}

interface SessionModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (data: SessionFormData) => void;
	initialData?: SessionFormData | null;
	movieOptions: Option[];
	hallOptions: Option[];
	error: string | null;
}

const getInitialValues = (data?: SessionFormData | null): SessionFormData => {
	if (data) {
		return {
			movieId: data.movieId,
			hallId: data.hallId,
			time: data.time,
			date: data.date,
		};
	}
	return {
		movieId: '',
		hallId: '',
		time: '',
		date: '',
	};
};

const SessionModal: React.FC<SessionModalProps> = ({
	isOpen,
	onClose,
	onSave,
	initialData,
	movieOptions,
	hallOptions,
	error,
}) => {
	const [formData, setFormData] = useState<SessionFormData>(() => getInitialValues(initialData));
	const isMounted = useRef(false);

	useEffect(() => {
		if (!isMounted.current) {
			isMounted.current = true;
			return;
		}

		if (isOpen) {
			setFormData(getInitialValues(initialData));
		}
	}, [initialData, isOpen]);

	if (!isOpen) return null;

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSave(formData);
	};

	const handleChange = (field: keyof SessionFormData, value: string) => {
		setFormData(prev => ({ ...prev, [field]: value }));
	};

	return (
		<div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
			<div className="bg-[#002D6E] border border-blue-400/30 rounded-2xl p-8 w-full max-w-md shadow-2xl relative">

				<button
					onClick={onClose}
					className="absolute top-4 right-4 text-blue-200 hover:text-white transition-colors"
				>
					<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
							d="M6 18L18 6M6 6l12 12"></path>
					</svg>
				</button>

				<h3 className="text-2xl font-bold text-white mb-6 text-center">
					{initialData ? 'Редагувати сеанс' : 'Створити сеанс'}
				</h3>

				{error && (
					<div className="mb-6 bg-red-500/10 border border-red-500/50 rounded-lg p-3 flex items-start gap-3 animate-pulse">
						<svg className="w-5 h-5 text-red-400 shrink-0 mt-0.5" fill="none" stroke="currentColor"
							viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
						</svg>
						<div className="flex flex-col">
							<span className="text-sm font-bold text-red-400">Помилка збереження</span>
							<span className="text-sm text-red-200 mt-0.5 leading-tight">{error}</span>
						</div>
					</div>
				)}

				<form onSubmit={handleSubmit} className="flex flex-col gap-5">

					<AdminSelect
						id="session-movie"
						label="Фільм"
						options={[{ value: '', label: 'Оберіть фільм' }, ...movieOptions]}
						value={formData.movieId}
						onChange={(e) => handleChange('movieId', e.target.value)}
						required
					/>

					<AdminSelect
						id="session-hall"
						label="Зал"
						options={[{ value: '', label: 'Оберіть зал' }, ...hallOptions]}
						value={formData.hallId}
						onChange={(e) => handleChange('hallId', e.target.value)}
						required
					/>

					<div className="grid grid-cols-2 gap-4">
						<AdminInput
							id="session-time"
							label="Час"
							type="time"
							value={formData.time}
							onChange={(e) => handleChange('time', e.target.value)}
							required
						/>
						<AdminInput
							id="session-date"
							label="Дата"
							type="date"
							value={formData.date}
							onChange={(e) => handleChange('date', e.target.value)}
							required
						/>
					</div>

					<button
						type="submit"
						className="w-full py-3 mt-4 bg-[#0041C4] hover:bg-[#0035A0] text-white font-bold rounded-lg shadow-lg shadow-blue-900/50 transition-all active:scale-95"
					>
						{initialData ? 'Зберегти зміни' : 'Створити сеанс'}
					</button>
				</form>

			</div>
		</div>
	);
};

export default SessionModal;