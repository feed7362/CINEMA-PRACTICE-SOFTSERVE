import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const ProtectedRoute: React.FC = () => {
	const { token, isAdmin } = useAuth();

	if (!token) {
		return <Navigate to="/login" replace />;
	}

	if (!isAdmin) {
		return <Navigate to="/forbidden" replace />;
	}

	return <Outlet />;
};

export default ProtectedRoute;