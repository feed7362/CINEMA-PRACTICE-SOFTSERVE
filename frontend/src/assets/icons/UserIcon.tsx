import React from 'react';

const UserIcon: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
	<svg 
		className={className} 
		fill="none" 
		stroke="currentColor" 
		viewBox="0 2 24 24"
	>
		<path 
			strokeLinecap="round" 
			strokeLinejoin="round" 
			strokeWidth="2" 
			d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
		/>
	</svg>
);

export default UserIcon;