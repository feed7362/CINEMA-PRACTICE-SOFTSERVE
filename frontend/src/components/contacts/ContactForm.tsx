import React, { useState } from 'react';
import Input from '@/components/ui/Input';
import BaseButton from '@/components/ui/BaseButton';
import { contactApi, type CreateContactDto } from '@/api/contactApi';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<CreateContactDto>({
    name: '',
    email: '',
    message: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage(null);

    try {
      await contactApi.sendMessage(formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error: any) {
      setStatus('error');
      setErrorMessage(error?.response?.data?.title || 'Щось пішло не так. Спробуйте пізніше.');
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md">
      <h2 className="text-2xl font-bold mb-6">Напишіть нам</h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Input
          type="text"
          name="name"
          label="Ваше ім'я"
          placeholder="Іван Іванов"
          value={formData.name}
          onChange={handleChange}
          required
        />
        
        <Input
          type="email"
          name="email"
          label="Email"
          placeholder="example@mail.com"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-300">Повідомлення</label>
          <textarea
            name="message"
            rows={4}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#0753E0] focus:ring-1 focus:ring-[#0753E0] transition-all resize-none"
            placeholder="Ваше питання або пропозиція..."
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>

        {status === 'success' && (
          <div className="p-3 bg-green-500/20 border border-green-500/50 rounded-xl text-green-200 text-sm text-center">
            Повідомлення успішно відправлено!
          </div>
        )}

        {status === 'error' && (
          <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm text-center">
            {errorMessage}
          </div>
        )}

        <BaseButton 
          type="submit" 
          disabled={status === 'loading'}
          className="mt-2 w-full py-3 bg-[#0753E0] hover:bg-[#0642b5] text-white font-bold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Відправка...' : 'Відправити повідомлення'}
        </BaseButton>
      </form>
    </div>
  );
};

export default ContactForm;