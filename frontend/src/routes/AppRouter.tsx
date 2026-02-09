import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '@/pages/Home';
import Auth from '@/pages/Auth';
import MovieDetails from '@/pages/MovieDetails';
import MovieSchedule from '@/pages/MovieSchedule';
import Profile from '@/pages/Profile';
import Shares from '@/pages/Shares';
import SignUp from '@/pages/SignUp';
import SoonMovies from '@/pages/SoonMovies';
import Contacts from '@/pages/Contacts';
import Booking from "@/pages/Booking";
import Checkout from "@/pages/Checkout";
import TicketSuccess from "@/pages/TicketSuccess";
import AdminPanel from '@/pages/admin/AdminPanel';
import Forbidden from '@/pages/Forbidden';
import AddMovie from '@/pages/admin/AddMovie';
import EditMoviesList from '@/pages/admin/EditMoviesList';
import Sessions from '@/pages/admin/Sessions';
import Statistics from '@/pages/admin/Statistics';
import Halls from '@/pages/Halls';

import ProtectedRoute from '@/components/ProtectedRoute';
import EditDiscountsList from "@/pages/admin/EditDiscountsList.tsx";

const AppRoutes: React.FC = () => {

    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Auth/>} />
            <Route path="/signup" element={<SignUp/>} />
            
            <Route path="/movie/:id" element={<MovieDetails/>} />
            <Route path="/schedule" element={<MovieSchedule/>} />
            <Route path="/soon" element={<SoonMovies/>} />
            <Route path="/shares" element={<Shares/>} />
            <Route path="/contacts" element={<Contacts/>} />
            
            <Route path="/booking/:sessionId" element={<Booking/>} />
            <Route path="/checkout" element={<Checkout/>} />
            <Route path="/tickets/success" element={<TicketSuccess/>} />

            <Route path="/profile" element={<Profile/>} />

            <Route element={<ProtectedRoute />}>
                <Route path="/admin" element={<AdminPanel/>} />
                <Route path="/admin/statistic" element={<Statistics/>} />
                <Route path="/admin/addMovie" element={<AddMovie/>} />
                <Route path="/admin/editMovie/:id" element={<AddMovie />} />
                <Route path="/admin/editMoviesList" element={<EditMoviesList/>} />
                <Route path="/admin/sessions" element={<Sessions/>} />
                <Route path="/admin/halls" element={<Halls/>} />
                <Route path="/admin/discounts" element={<EditDiscountsList/>} />
            </Route>

            <Route path="/forbidden" element={<Forbidden />} />

            <Route path="*" element={<div className="text-white p-10 text-center">404 - Сторінку не знайдено</div>} />
        </Routes>
    );
};

export default AppRoutes;