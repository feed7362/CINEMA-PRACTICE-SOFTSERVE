import React from 'react';
import DeleteIcon from '@/assets/icons/DeleteIcon';
import type { IDiscount } from '@/api/discountApi';

interface DiscountsTableProps {
	discounts: IDiscount[];
	onDelete: (id: number) => void;
	discountTypeLabels: Record<number, string>;
}

const DiscountsTable: React.FC<DiscountsTableProps> = ({ discounts, onDelete, discountTypeLabels }) => {


	const getStatus = (expiryDate: string) => {
		const now = new Date();
		const expiry = new Date(expiryDate);

		const isExpired = expiry < now;

		if (isExpired) {
			return {
				label: 'Недійсний',
				style: 'bg-red-500/10 text-red-400 border-red-500/20',
			};
		}

		return {
			label: 'Активний',
			style: 'bg-green-500/10 text-green-500 border-green-500/20',
		};
	};

	return (
		<div className="w-full overflow-x-auto rounded-xl border border-white/10 bg-[#020617]/50 backdrop-blur-sm shadow-xl">
			<table className="w-full text-left border-collapse">
				<thead>
					<tr className="bg-white/5 border-b border-white/10 text-gray-400 text-sm uppercase tracking-wider">
						<th className="p-4 font-semibold">Тип</th>
						<th className="p-4 font-semibold">Код</th>
						<th className="p-4 font-semibold">Знижка</th>
						<th className="p-4 font-semibold">Дійсний до</th>
						<th className="p-4 font-semibold">Статус</th>
						<th className="p-4 font-semibold text-right pr-6">Дії</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-white/5">
					{discounts.map((discount) => {
						const status = getStatus(discount.expiryDate);
						return (
							<tr key={discount.id} className="group hover:bg-white/5 transition-colors duration-200">
								<td className="p-4 text-gray-400 text-sm italic">
									{discountTypeLabels[discount.type] || 'Невідомо'}
								</td>
								<td className="p-4">
									<div className="font-mono font-bold text-blue-400 text-lg tracking-wider">
										{discount.code}
									</div>
								</td>
								<td className="p-4">
									<div className="font-bold text-white text-base">
										{discount.percentage}%
									</div>
								</td>
								<td className="p-4 text-gray-300">
									{new Date(discount.expiryDate).toLocaleDateString('uk-UA')}
								</td>
								<td className="p-4">
									<span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${status.style}`}>
										{status.label}
									</span>
								</td>
								<td className="p-4 text-right">
									<button
										onClick={() => onDelete(discount.id)}
										className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
									>
										<DeleteIcon />
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default DiscountsTable;