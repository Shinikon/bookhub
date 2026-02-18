
import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {

    return !!localStorage.getItem('bookhub_user');
  });

  const login = (email: string) => {
    localStorage.setItem('bookhub_user', JSON.stringify({ email }));
    setIsAuthenticated(true); 
  };

  const logout = () => {
    localStorage.removeItem('bookhub_user');
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout };
};