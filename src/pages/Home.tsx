
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/library', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">BookHub</h1>
      <p className="mb-6 text-gray-700">Платформа для учета личной библиотеки</p>
      <div className="space-x-4">
        <Link
          to="/login"
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 inline-block"
        >
          Вход
        </Link>
        <Link
          to="/register"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 inline-block"
        >
          Регистрация
        </Link>
      </div>
    </div>
  );
};