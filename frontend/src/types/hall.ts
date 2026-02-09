export interface Hall {
	id: number;
	name: string;
	format: string;
	capacity: number;
	seatMap?: string[];
}

export interface HallModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (name: string, rows: number, seatsPerRow: number, premiumRows: number[], formatId: number) => void;
	initialData: Hall | null;
}