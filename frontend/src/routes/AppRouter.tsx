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
import Contacts from '@/pages/Contacts';
import AddMovie from '@/pages/AddMovie'; 
import EditMoviesList from '@/pages/EditMoviesList';
import Halls from '@/pages/Halls';
import Sessions from '@/pages/Sessions';
import Statistics from '@/pages/Statistics';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/add-movie" element={<AddMovie />} />
        <Route path="/admin/edit-movies" element={<EditMoviesList />} />
        <Route path="/admin/halls" element={<Halls />} />
        <Route path="/admin/sessions" element={<Sessions />} />
        <Route path="/admin/stats" element={<Statistics />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/schedule" element={<MovieSchedule />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/shares" element={<Shares />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/soon" element={<SoonMovies />} />
        <Route path="/example" element={<Example />} />
        <Route path="/contacts" element={<Contacts />} />
        
      <Route path="*" element={<div className="text-white p-10">Сторінку не знайдено</div>} />
    </Routes>
  );
};

export default AppRoutes;