import React, { useState, useEffect } from 'react';
import BackgroundEffects from '@/components/ui/BackgroundEffects';
import DeleteModal from '@/components/ui/DeleteModal';
import FullScreenLoader from '@/components/loader/FullScreenLoader';
import DiscountsTable from '@/components/admin/DiscountsTable';
import { discountApi, type IDiscount } from '@/api/discountApi';
import CreateDiscountModal from "@/components/admin/CreateDiscountModal.tsx";

const EditDiscountsList: React.FC = () => {
    const [discounts, setDiscounts] = useState<IDiscount[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const typeLabels: Record<number, string> = {
        0: 'Звичайна',
        1: 'Студентська',
        2: 'Військова',
        3: 'Промокод'
    };

    const fetchDiscounts = async () => {
        setIsLoading(true);
        const data = await discountApi.getAllDiscounts();
        setDiscounts(data);
        setIsLoading(false);
    };

    useEffect(() => { fetchDiscounts(); }, []);

    const askToDelete = (id: number) => {
        setSelectedId(id);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (selectedId) {
            await discountApi.deleteDiscount(selectedId);
            setIsDeleteModalOpen(false);
            fetchDiscounts();
        }
    };

    const filteredDiscounts = discounts.filter(d =>
        d.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) return <FullScreenLoader />;

    return (
        <div className="min-h-screen bg-main-dark text-white relative overflow-hidden flex flex-col font-sans">
            <BackgroundEffects />

            <DeleteModal
                isOpen={isDeleteModalOpen}
                title="Видалити промокод?"
                message="Ви впевнені, що хочете видалити цей промокод? Він більше не зможе бути використаний клієнтами."
                onConfirm={confirmDelete}
                onCancel={() => setIsDeleteModalOpen(false)}
            />

            <div className="grow flex flex-col items-center relative z-10 px-4 py-10">
                <div className="w-full max-w-6xl">

                    <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                        <h1 className="text-3xl font-bold text-white shrink-0">Промокоди</h1>
                        <div className="w-full relative">
                            <input
                                type="text"
                                placeholder="Пошук за кодом (напр. SUMMER2024)..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-white text-black rounded-full px-6 py-3 outline-none focus:ring-4 focus:ring-blue-500/30 text-lg transition-shadow"
                            />
                        </div>
                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-full font-bold transition-all shrink-0 active:scale-95"
                        >
                            + Створити
                        </button>
                    </div>

                    <DiscountsTable
                        discounts={filteredDiscounts}
                        onDelete={(id) => askToDelete(id as number)}
                        discountTypeLabels={typeLabels}
                    />

                    {filteredDiscounts.length === 0 && !isLoading && (
                        <div className="text-center text-gray-400 mt-10">
                            Промокодів не знайдено
                        </div>
                    )}
                </div>
            </div>

            <CreateDiscountModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreated={fetchDiscounts}
                discountTypeLabels={typeLabels}
            />
        </div>
    );
};

export default EditDiscountsList;