import React from 'react';
import type { LabelProps } from '@/types/forms';

const Label: React.FC<LabelProps> = ({ text, htmlFor, className = '' }) => (
	<label htmlFor={htmlFor} className={`font-['Inter'] block text-white/60 text-xl mb-2 ml-1 ${className}`}>
		{text}
	</label>
);

export default Label;