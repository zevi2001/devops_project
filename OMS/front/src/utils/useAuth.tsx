import {useRef } from 'react';
import {jwtDecode} from 'jwt-decode';

interface AuthData {
  exp?: number;
}

export function useAuth() {
  const isAuthenticated = useRef(false);
    const token = localStorage.getItem('access_token');
    if (token) {
      const decodedToken = jwtDecode<AuthData>(token);
      if (decodedToken.exp && decodedToken.exp * 1000 > Date.now() + 900000) {
        // Expired time is more than 15 minutes in the future
        isAuthenticated.current = true
      } else {
        isAuthenticated.current = false
        localStorage.removeItem('access_token'); // Remove invalid token
      }
    } else {
      isAuthenticated.current = false
    }
  return isAuthenticated.current ;
}
