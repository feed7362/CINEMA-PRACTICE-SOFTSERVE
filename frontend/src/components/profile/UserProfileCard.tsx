import React, {useState} from 'react';
import Input from '@/components/ui/Input';
import EditButton from '@/components/profile/EditProfileButton';

interface UserData {
    name: string;
    email: string;
}

interface UserProfileCardProps {
    user: UserData;
    onUpdate: (updatedUser: UserData) => void;
    onLogout: () => void;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({user, onUpdate, onLogout}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(user);

    const handleSave = () => {
        onUpdate(formData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setFormData(user);
        setIsEditing(false);
    };

    return (
        <div
            className="bg-linear-to-r from-blue-900/80 to-blue-800/80 rounded-3xl p-8 flex flex-col md:flex-row justify-between gap-6">
            <div className="flex gap-6 w-full">
                <div
                    className="w-20 h-20 rounded-full bg-blue-700 flex items-center justify-center text-3xl font-bold shrink-0 text-white shadow-lg border border-white/10">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>

                <div className="space-y-3 w-full max-w-md text-white">
                    {isEditing ? (
                        <>
                            <Input
                                id="edit-name"
                                label="Імʼя"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                            <Input
                                id="edit-email"
                                type="email"
                                label="Email"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                        </>
                    ) : (
                        <div className="flex flex-col justify-center h-full">
                            <h2 className="text-2xl font-bold">{user.name}</h2>
                            <p className="text-zinc-300 text-sm">Email: {user.email}</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-3 min-w-35 justify-center">
                {isEditing ? (
                    <>
                        <EditButton onClick={handleSave}
                                    className="px-6 py-3 w-full bg-green-600 hover:bg-green-700 border-none">
                            Зберегти
                        </EditButton>
                        <button
                            onClick={handleCancel}
                            className="text-sm text-zinc-400 hover:text-white transition-colors text-center py-2"
                        >
                            Скасувати
                        </button>
                    </>
                ) : (
                    <>
                        <EditButton onClick={() => setIsEditing(true)} className="px-6 py-3 w-full">
                            Редагувати
                        </EditButton>

                        <button
                            onClick={onLogout}
                            className="px-6 py-3 w-full rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white transition-all text-sm font-bold"
                        >
                            Вийти
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default UserProfileCard;