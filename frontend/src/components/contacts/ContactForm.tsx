import React, { useState } from 'react';
import { Send } from 'lucide-react';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Дякуємо! Ваше повідомлення надіслано.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-3xl p-8 lg:p-10 shadow-2xl h-fit">
      <h2 className="text-3xl font-bold mb-2">Напишіть нам</h2>
      <p className="text-zinc-400 mb-8">Маєте запитання або пропозиції? Заповніть форму нижче.</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-white/80 ml-1">Ваше ім'я</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Введіть ім'я"
            required
            className="w-full bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#0753E0] focus:ring-1 focus:ring-[#0753E0] transition-all"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-white/80 ml-1">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@mail.com"
            required
            className="w-full bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#0753E0] focus:ring-1 focus:ring-[#0753E0] transition-all"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium text-white/80 ml-1">Повідомлення</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Текст вашого повідомлення..."
            rows={5}
            required
            className="w-full bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#0753E0] focus:ring-1 focus:ring-[#0753E0] transition-all resize-none"
          />
        </div>

        <button 
          type="submit"
          className="mt-4 w-full bg-[#0753E0] hover:bg-[#0540b0] text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg shadow-blue-900/20 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Надіслати повідомлення</span>
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default ContactForm;