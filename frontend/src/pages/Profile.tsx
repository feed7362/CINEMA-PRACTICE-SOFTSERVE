import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '@/components/ui/Input';
import BaseButton from '@/components/ui/BaseButton';
import EditButton from '@/components/ui/EditProfileButton';

import { MOCK_MOVIES } from '@/constants/mockMovies';

const Profile: React.FC = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+380 (00) 000 00 00',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const activeMovie = MOCK_MOVIES.length > 0 ? MOCK_MOVIES[0] : null;
  const activeSessionTime = activeMovie?.sessions?.[0] || 'Час не визначено';

  const handleEditToggle = () => {
    if (isEditing) {
      const nameInput = document.getElementById('edit-name') as HTMLInputElement;
      const emailInput = document.getElementById('edit-email') as HTMLInputElement;
      const phoneInput = document.getElementById('edit-phone') as HTMLInputElement;

      setUser({
        name: nameInput?.value || user.name,
        email: emailInput?.value || user.email,
        phone: phoneInput?.value || user.phone,
      });
    }

    setIsEditing(!isEditing);
  };

  const handleRefund = () => {
    setShowConfirm(false);
    console.log('Ticket refunded');
  };

  const handleLogout = () => {
    console.log('User logged out');
    navigate('/signup');
  };

  return (
    <div className="text-white p-10">
      <div className="max-w-6xl mx-auto space-y-12">

        <div className="bg-linear-to-r from-blue-900/80 to-blue-800/80 rounded-3xl p-8 flex flex-col md:flex-row justify-between gap-6">

          <div className="flex gap-6">
            <div className="w-20 h-20 rounded-full bg-blue-700 flex items-center justify-center text-3xl font-bold">
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>

            <div className="space-y-3 w-full">
              {isEditing ? (
                <>
                  <Input id="edit-name" label="Імʼя" placeholder={user.name} />
                  <Input id="edit-email" type="email" label="Email" placeholder={user.email} />
                  <Input id="edit-phone" label="Телефон" placeholder={user.phone} />
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <p className="text-zinc-300 text-sm">Email: {user.email}</p>
                  <p className="text-zinc-300 text-sm">Тел: {user.phone}</p>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3 self-start">
            <EditButton
              className="px-6 py-3 rounded-xl font-semibold w-full"
              onClick={handleEditToggle}
            >
              {isEditing ? 'Закрити редагування' : 'Редагувати'}
            </EditButton>
            
            {!isEditing && (
              <BaseButton
                className="px-6 py-3 rounded-xl font-semibold bg-white/10 hover:bg-white/20 text-red-400 border border-white/10 transition-colors"
                onClick={handleLogout}
              >
                Вийти з акаунту
              </BaseButton>
            )}
          </div>
        </div>

        <div className="bg-linear-to-r from-blue-900/80 to-blue-800/80 rounded-3xl p-8 space-y-6">
          <h3 className="text-3xl font-bold">Активні квитки</h3>

          {activeMovie ? (
            <div className="bg-black/30 rounded-2xl p-6 flex justify-between items-center gap-6">
              <div className="flex gap-6 items-center">
                <img
                  src={activeMovie.poster}
                  alt={activeMovie.title}
                  className="w-20 rounded-xl"
                />

                <div className="space-y-2">
                  <h4 className="text-xl font-bold">
                    {activeMovie.title}
                  </h4>

                  <p className="text-zinc-300 text-sm">
                    Сеанс: {activeSessionTime} · Вік: {activeMovie.ageRating}+
                  </p>

                  <span className="inline-block bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    ACTIVE
                  </span>
                </div>
              </div>

              <BaseButton
                className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 font-semibold"
                onClick={() => setShowConfirm(true)}
              >
                Повернути
              </BaseButton>
            </div>
          ) : (
            <div className="text-zinc-400 text-center py-10">
              У вас немає активних квитків
            </div>
          )}
        </div>

      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#0f172a] rounded-2xl p-8 w-full max-w-md space-y-6">
            <h3 className="text-2xl font-bold text-center">
              Підтвердити повернення?
            </h3>

            <p className="text-zinc-400 text-center">
              Ви впевнені, що хочете повернути квиток?
            </p>

            <div className="flex gap-4">
              <BaseButton
                className="w-full py-3 rounded-xl bg-zinc-600"
                onClick={() => setShowConfirm(false)}
              >
                Скасувати
              </BaseButton>

              <BaseButton
                className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700"
                onClick={handleRefund}
              >
                Підтвердити
              </BaseButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;