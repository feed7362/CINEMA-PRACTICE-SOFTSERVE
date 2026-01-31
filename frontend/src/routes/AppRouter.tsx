import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import Admin from '@/pages/Admin';
import Auth from '@/pages/Auth';
import Booking from '@/pages/Booking';
import MovieDetails from '@/pages/MovieDetails';
import MovieSchedule from '@/pages/MovieSchedule';
import Profile from '@/pages/Profile';
import Shares from '@/pages/Shares';
import SignUp from '@/pages/SignUp';
import SoonMovies from '@/pages/SoonMovies';
import Example from '@/pages/Example';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/schedule" element={<MovieSchedule />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/shares" element={<Shares />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/soon" element={<SoonMovies />} />
        <Route path="/example" element={<Example />} />
      <Route path="*" element={<div className="text-white p-10">Сторінку не знайдено</div>} />
    </Routes>
  );
};

export default AppRoutes;