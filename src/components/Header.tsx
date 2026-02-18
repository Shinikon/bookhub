
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  console.log('isAuthenticated:', isAuthenticated); 

  return (
    <header className="bg-white shadow py-4 px-6 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-indigo-700">BookHub</Link>
      <nav className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <Link to="/library">Библиотека</Link>
            <Link to="/profile">Профиль</Link>
            <button onClick={logout}>Выход</button>
          </>
        ) : (
          <>
            <Link to="/login">Вход</Link>
            <Link to="/register">Регистрация</Link>
          </>
        )}
      </nav>
    </header>
  );
};