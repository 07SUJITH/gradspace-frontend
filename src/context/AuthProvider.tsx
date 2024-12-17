/**
 * This module sets up and exports the AuthContext and AuthProvider components.
 *
 * The AuthContext provides authentication state and functions to its consumers.
 *
 * The AuthProvider component manages the authentication state and provides
 * functions for logging in and refreshing the authentication token.
 *
 * The base URL for the Axios instances is determined based on the hostname:
 * - If the hostname is 'localhost', the base URL is set to the local development server.
 * - Otherwise, the base URL is set to the production server.
 *
 * Two Axios instances are created:
 * - `axiosInstance`: A general-purpose instance for making HTTP requests.
 * - `axiosPrivate`: An instance with additional headers and credentials for secure or authenticated requests.
 */

import { jwtDecode } from 'jwt-decode';
import React, { createContext, FC, ReactNode, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import axiosInstance from '../config/axiosInstance';

interface AuthContextType {
  auth: AuthState | null;
  setAuth: React.Dispatch<React.SetStateAction<AuthState | null>>;
  persist: boolean;
  setPersist: React.Dispatch<React.SetStateAction<boolean>>;
  login: (signinDetails: SigninDetails, from: string) => Promise<void>;
  refresh: () => Promise<string | undefined>;
}

interface AuthState {
  user: string;
  role: string[];
  access_token: string;
}

interface SigninDetails {
  username: string;
  password: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface ErrorResponse {
  response: {
    data: {
      details: string;
    };
  };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState | null>(null);
  const [persist, setPersist] = useState<boolean>(
    JSON.parse(localStorage.getItem('persist') || 'false'),
  );
  const navigate = useNavigate();

  const login = async (signinDetails: SigninDetails, from: string) => {
    try {
      const response = await axiosInstance.post('/auth/login/', signinDetails, {
        withCredentials: true,
      });
      const userData = jwtDecode<AuthState>(response.data.access_token);
      setAuth({
        user: userData.user,
        role: userData.role,
        access_token: response.data.access_token,
      });
      navigate(from, { replace: true });
      toast.success('Successfully Logged In.');
    } catch (error) {
      const err = error as ErrorResponse;
      if (err.response && err.response.data && err.response.data.details) {
        toast.error(err.response.data.details);
      } else {
        toast.error('Login failed.');
      }
    }
  };

  const refresh = async () => {
    if (!persist) return;
    try {
      const response = await axiosInstance.post('/auth/refresh/', null, {
        withCredentials: true,
      });
      const userData = jwtDecode<AuthState>(response.data.access_token);
      setAuth({
        user: userData.user,
        role: userData.role,
        access_token: response.data.access_token,
      });

      return response.data.access_token;
    } catch (error) {
      const err = error as ErrorResponse;
      if (err.response && err.response.data && err.response.data.details) {
        toast.error(err.response.data.details);
      } else {
        toast.error('Token refresh failed.');
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, persist, setPersist, login, refresh }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
