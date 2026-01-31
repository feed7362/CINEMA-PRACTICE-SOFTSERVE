import { BrowserRouter as Router } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AppRoutes from '@/routes/AppRouter';
import '@/App.css';

import bgEffectTopLeft from '@/assets/images/backgroundEffects/effect1.png';
import bgEffectCenterRight from '@/assets/images/backgroundEffects/effect2.png';

function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-[#020617] flex flex-col overflow-hidden font-['Inter']">
        
        <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
          <img
            src={bgEffectTopLeft}
            alt=""
            className="absolute top-[-10%] left-[-15%] w-[70%] max-w-225 opacity-80 mix-blend-screen"
          />

          <img
            src={bgEffectCenterRight}
            alt=""
            className="absolute top-[25%] right-[-10%] w-[85%] max-w-275 opacity-70 mix-blend-screen"
          />
        </div>

        <div className="relative z-10 flex flex-col min-h-screen">
          <Header />
          <main className="grow">
            <AppRoutes />
          </main>
          <Footer />
        </div>
        
      </div>
    </Router>
  );
}

export default App;