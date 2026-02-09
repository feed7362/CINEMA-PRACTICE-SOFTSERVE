import React from 'react';

interface FileUploadProps {
	label: string;
	id: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ label, id }) => {
	return (
		<div className="flex flex-col gap-2">
			<label htmlFor={id} className="text-white font-medium ml-1 cursor-pointer">
				{label}
			</label>
			<div className="w-full h-full min-h-12 bg-white rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors border border-gray-300 relative overflow-hidden group">
				<span className="text-gray-500 text-sm group-hover:scale-105 transition-transform">
					Оберіть файл
				</span>
				<input id={id} type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
			</div>
		</div>
	);
};

export default FileUpload;