import React, { useState, useEffect } from 'react';
import ContactForm from '@/components/contacts/ContactForm';
import ContactInfo from '@/components/contacts/ContactInfo';
import ContactMap from '@/components/contacts/ContactMap';
import FullScreenLoader from '@/components/loader/FullScreenLoader';

const Contacts: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <FullScreenLoader />;
  
  return (
    <div className="min-h-screen bg-[#020617] text-white font-['Inter'] relative overflow-hidden pt-10 pb-20">
      
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#0753E0] rounded-full blur-[150px] opacity-20 pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0753E0] rounded-full blur-[150px] opacity-20 pointer-events-none translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          <div className="flex flex-col gap-10">
            <ContactInfo />
            <ContactMap />
          </div>

          <div>
            <ContactForm />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contacts;