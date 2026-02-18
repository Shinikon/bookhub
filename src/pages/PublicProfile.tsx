import { useParams } from 'react-router-dom';
import { useBooks } from '../hooks/useBooks';
import { BookCard } from '../components/BookCard';
import { Book } from '../types';

export const PublicProfile = () => {
  const { username } = useParams<{ username: string }>();
  const { books } = useBooks();


  const userBooks = books;

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-2xl font-bold mb-4">Библиотека пользователя @{username}</h1>
      
      {userBooks.length === 0 ? (
        <p className="text-gray-600">У пользователя пока нет книг.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {userBooks.map((book) => (
            <div key={book.id} className="border rounded-lg overflow-hidden shadow bg-white">
              {book.cover ? (
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => (e.currentTarget.src = '')}
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                  Нет обложки
                </div>
              )}
              <div className="p-4">
                <h3 className="font-bold text-sm line-clamp-1">{book.title}</h3>
                <p className="text-xs text-gray-600">by {book.author}</p>
                {book.userRating !== undefined && (
                  <p className="text-yellow-500 text-xs mt-1">⭐ {book.userRating}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};