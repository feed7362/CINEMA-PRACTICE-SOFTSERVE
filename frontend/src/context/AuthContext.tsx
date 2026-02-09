import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { isAdmin as checkIsAdmin } from '@/utils/authUtils';

interface AuthContextType {
	token: string | null;
	isAdmin: boolean;
	login: (token: string) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
	const [isAdmin, setIsAdmin] = useState<boolean>(false);

	useEffect(() => {
		if (token) {
			setIsAdmin(checkIsAdmin()); 
		} else {
			setIsAdmin(false);
		}
	}, [token]);

	const login = (newToken: string) => {
		localStorage.setItem('token', newToken);
		setToken(newToken);
	};

	const logout = () => {
		localStorage.removeItem('token');
		setToken(null);
	};

	return (
		<AuthContext.Provider value={{ token, isAdmin, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};