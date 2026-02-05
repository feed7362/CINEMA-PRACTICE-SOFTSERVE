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
import Admin from '@/pages/Admin';
import Forbidden from '@/pages/Forbidden';

import ProtectedRoute from '@/components/ProtectedRoute';

const AppRoutes: React.FC = () => {

    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/auth" element={<Auth/>} />
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
                <Route path="/admin" element={<Admin/>} />
            </Route>

            <Route path="/forbidden" element={<Forbidden />} />

            <Route path="*" element={<div className="text-white p-10 text-center">404 - Сторінку не знайдено</div>} />
        </Routes>
    );
};

export default AppRoutes;