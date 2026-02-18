import { Book, BookStatus } from '../types';
import { Link } from 'react-router-dom';

type Props = {
  book: Book;
  onStatusChange: (id: number, status: BookStatus) => void;
};

const statusConfig: Record<BookStatus, { label: string; color: string }> = {
  read: { label: '✅ Прочитано', color: 'bg-green-100 text-green-800' },
  reading: { label: '📖 Читаю', color: 'bg-yellow-100 text-yellow-800' },
  planned: { label: '📌 В планах', color: 'bg-blue-100 text-blue-800' },
  abandoned: { label: '❌ Брошено', color: 'bg-red-100 text-red-800' }
};

export const BookCard = ({ book, onStatusChange }: Props) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow bg-white">
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
        <h3 className="font-bold text-lg line-clamp-1">{book.title}</h3>
        <p className="text-gray-600 text-sm mb-1">by {book.author}</p>
        <p className="text-gray-500 text-xs mb-2">{book.year}</p>
        <div className="flex items-center justify-between mt-2">
          <span className={`text-xs px-2 py-1 rounded-full ${statusConfig[book.status].color}`}>
            {statusConfig[book.status].label}
          </span>
          {book.userRating !== undefined && (
            <span className="text-yellow-500">⭐ {book.userRating}</span>
          )}
        </div>
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => onStatusChange(book.id, 'read')}
            className="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
          >
            Прочитано
          </button>
          <button
            onClick={() => onStatusChange(book.id, 'reading')}
            className="text-xs bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
          >
            Читаю
          </button>
        </div>
        <Link to={`/book/${book.id}`} className="mt-3 block text-indigo-600 hover:underline text-sm">
          Подробнее →
        </Link>
      </div>
    </div>
  );
};