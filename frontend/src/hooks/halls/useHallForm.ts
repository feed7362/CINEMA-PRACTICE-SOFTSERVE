import { useState, useEffect, useRef } from 'react';
import { getFormatId } from '@/utils/formatters.ts';
import type { HallModalProps } from '@/types/hall';

const getInitialValues = (data: HallModalProps['initialData']) => {
	if (!data) {
		return {
			name: '',
			formatId: 0,
			rows: 10,
			seats: 12,
			premiumRows: [] as number[],
		};
	}

	const map = data.seatMap || [];
	const hasMapData = map.length > 0;

	const calculatedRows = hasMapData ? map.length : 10;
	const calculatedSeats = hasMapData && map[0] ? map[0].length : 12;

	const pRows = map
		.map((row, i) => (row.toLowerCase().includes('v') ? i + 1 : null))
		.filter((n): n is number => n !== null);

	return {
		name: data.name || '',
		formatId: getFormatId(data.format),
		rows: calculatedRows,
		seats: calculatedSeats,
		premiumRows: pRows,
	};
};

export const useHallForm = ({
	isOpen,
	initialData,
	onSave,
	onClose,
}: HallModalProps) => {
	const [formState, setFormState] = useState(() =>
		getInitialValues(initialData),
	);

	const isMounted = useRef(false);

	useEffect(() => {
		if (!isMounted.current) {
			isMounted.current = true;
			return;
		}

		if (isOpen) {
			setFormState(getInitialValues(initialData));
		}
	}, [isOpen, initialData]);

	const setName = (name: string) => {
		setFormState((prev) => ({ ...prev, name }));
	};

	const setFormatId = (formatId: number) => {
		setFormState((prev) => ({ ...prev, formatId }));
	};

	const setSeats = (seats: number) => {
		setFormState((prev) => ({ ...prev, seats }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSave(
			formState.name,
			formState.rows,
			formState.seats,
			formState.premiumRows,
			formState.formatId,
		);
		onClose();
	};

	const toggleRow = (rowNumber: number) => {
		setFormState((prev) => {
			const isPremium = prev.premiumRows.includes(rowNumber);
			const newPremiumRows = isPremium
				? prev.premiumRows.filter((r) => r !== rowNumber)
				: [...prev.premiumRows, rowNumber];
			return { ...prev, premiumRows: newPremiumRows };
		});
	};

	const handleRowsChange = (val: number) => {
		const newRows = Math.max(0, val);
		setFormState((prev) => ({
			...prev,
			rows: newRows,
			premiumRows: prev.premiumRows.filter((r) => r <= newRows),
		}));
	};

	const totalSeats = formState.rows * formState.seats;
	const premiumSeatsCount = formState.premiumRows.length * formState.seats;
	const standardSeatsCount = totalSeats - premiumSeatsCount;

	return {
		formState,
		setters: { setName, setFormatId, setSeats, handleRowsChange },
		actions: { handleSubmit, toggleRow },
		stats: { standardSeatsCount, premiumSeatsCount },
	};
};