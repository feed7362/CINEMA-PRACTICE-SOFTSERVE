import React from 'react';

interface InfoRowProps {
	label: string;
	value?: string | number;
	className?: string;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value, className = '' }) => {
	return (
		<div className={`flex text-lg mb-2 ${className}`}>
			<span className="text-white/60 w-40 font-light shrink-0">{label}:</span>
			<span className="text-white font-medium wrap-break-word">{value}</span>
		</div>
	);
};

export default InfoRow;