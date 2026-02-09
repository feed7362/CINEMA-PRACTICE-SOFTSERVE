import React from 'react';
import ContactInfo from '@/components/contacts/ContactInfo';
import ContactMap from '@/components/contacts/ContactMap';
import ContactForm from '@/components/contacts/ContactForm';

const ContactsDemo: React.FC = () => {
	return (
		<div className="space-y-12 pb-20 text-white">
      
			<div>
				<h1 className="text-3xl font-bold mb-2">Contacts (Контакти)</h1>
				<p className="text-gray-400">
					Компоненти для сторінки "Контакти": інформаційний блок, карта та форма зворотнього зв'язку.
				</p>
			</div>

			<section className="bg-[#051329]/60 backdrop-blur-md border border-white/10 rounded-2xl p-8">
				<h2 className="text-xl font-bold mb-6 text-[#0753E0] border-b border-white/10 pb-2">
					Contact Info & Map
				</h2>
				<p className="text-sm text-gray-400 mb-6">
					Відображення статичних даних та карти.
				</p>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
					<div className="bg-[#020617] p-6 rounded-xl border border-white/5">
						<h3 className="text-sm font-bold text-gray-500 uppercase mb-4">Component: ContactInfo</h3>
						<ContactInfo />
					</div>

					<div className="bg-[#020617] p-6 rounded-xl border border-white/5">
						<h3 className="text-sm font-bold text-gray-500 uppercase mb-4">Component: ContactMap</h3>
						<ContactMap />
						<p className="text-xs text-gray-500 mt-2">
							* Примітка: URL карти у компоненті має бути валідним Google Maps Embed URL.
						</p>
					</div>
				</div>
			</section>

			<section className="bg-[#051329]/60 backdrop-blur-md border border-white/10 rounded-2xl p-8">
				<h2 className="text-xl font-bold mb-6 text-[#0753E0] border-b border-white/10 pb-2">
					Contact Form
				</h2>
				<p className="text-sm text-gray-400 mb-6">
					Форма відправки повідомлення. Ви можете протестувати валідацію та емуляцію запиту до API.
				</p>

				<div className="max-w-xl mx-auto">
					<ContactForm />
				</div>
			</section>

		</div>
	);
};

export default ContactsDemo;