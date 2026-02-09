import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAdmin, getUserRole } from '@/utils/authUtils';

const ProtectedRoute: React.FC = () => {
	const role = getUserRole();
	const userIsAdmin = isAdmin();

	if (!role) {
		return <Navigate to="/login" replace />;
	}

	if (!userIsAdmin) {
		return <Navigate to="/forbidden" replace />;
	}

	return <Outlet />;
};

export default ProtectedRoute;