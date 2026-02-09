import React, { useState, useEffect } from 'react';
import { discountApi, type IDiscountType } from '@/api/discountApi';
import {AlertCircle} from "lucide-react";

const CreateDiscountModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onCreated: () => void;
    discountTypeLabels: Record<number, string>;
}> = ({ isOpen, onClose, onCreated, discountTypeLabels }) => {
    const [types, setTypes] = useState<IDiscountType[]>([]);
    const [formData, setFormData] = useState({
        code: '',
        percentage: 0,
        expiryDate: '',
        type: 0
    });

    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);


    useEffect(() => {
        if (isOpen) {
            discountApi.getDiscountTypes().then(data => {
                setTypes(data);
                if (data.length > 0) setFormData(prev => ({ ...prev, type: data[0].value }));
            });
        }
    }, [isOpen]);

    if (!isOpen) return null;
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        const formattedDate = formData.expiryDate
            ? new Date(formData.expiryDate).toISOString()
            : null;

        try {
            await discountApi.createDiscount({
                ...formData,
                code: formData.code.trim(),
                expiryDate: formattedDate
            });
            onCreated();
            onClose();
        } catch (err: any) {
            setError(err || "Помилка сервера. Перевірте консоль розробника.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="bg-[#0f172a] border border-white/10 rounded-3xl p-8 w-full max-w-lg">
                <h2 className="text-2xl font-bold text-white mb-6">Створити знижку</h2>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                        <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
                        <span className="text-red-200 text-sm leading-relaxed">{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Категорія</label>
                        <select
                            value={formData.type}
                            onChange={(e) => setFormData({...formData, type: Number(e.target.value)})}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {types.map(t => (
                                <option key={t.value} value={t.value} className="bg-[#0f172a]">{discountTypeLabels[t.value]}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Код</label>
                        <input
                            type="text" required
                            value={formData.code}
                            placeholder={"Наприклад WELCOME25"}
                            onChange={(e) => setFormData({...formData, code: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white uppercase"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Знижка (%)</label>
                        <input
                            type="number" required min="1" max="100"
                            value={formData.percentage}
                            onChange={(e) => setFormData({...formData, percentage: Number(e.target.value)})}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Дійсний до</label>
                        <input
                            type="date" required
                            value={formData.expiryDate}
                            onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white [color-scheme:dark]"
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button type="button" onClick={onClose} className="w-full py-3 rounded-xl bg-white/5 text-white">Скасувати</button>
                        <button disabled={isSubmitting} type="submit" className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold">Створити</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateDiscountModal;