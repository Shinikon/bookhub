
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useBooks } from '../hooks/useBooks';
import { Book, BookStatus } from '../types';

export const Library = () => {
  const { books, updateBook } = useBooks();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<BookStatus | 'all'>('all');
  const [sort, setSort] = useState<'title' | 'author' | 'year' | 'rating'>('title');

  const filteredAndSorted = useMemo(() => {
    let result = books.filter(book => {
      const matchesSearch =
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' || book.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    result.sort((a, b) => {
      if (sort === 'title') return a.title.localeCompare(b.title);
      if (sort === 'author') return a.author.localeCompare(b.author);
      if (sort === 'year') return b.year - a.year;
      if (sort === 'rating') return (b.userRating || 0) - (a.userRating || 0);
      return 0;
    });

    return result;
  }, [books, search, statusFilter, sort]);

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Моя библиотека</h1>
        <Link
          to="/add-book"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          + Добавить книгу
        </Link>
      </div>


      <input
        type="text"
        placeholder="Поиск по названию или автору..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />


      <div className="mb-6 p-4 bg-gray-50 rounded-lg flex flex-wrap gap-4 items-center">
        <div>
          <label className="block text-sm font-medium mb-1">Статус</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="border rounded p-1"
          >
            <option value="all">Все</option>
            <option value="planned">В планах</option>
            <option value="reading">Читаю</option>
            <option value="read">Прочитано</option>
            <option value="abandoned">Брошено</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Сортировать по</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as any)}
            className="border rounded p-1"
          >
            <option value="title">Названию</option>
            <option value="author">Автору</option>
            <option value="year">Году (новые)</option>
            <option value="rating">Рейтингу</option>
          </select>
        </div>
      </div>

      {filteredAndSorted.length === 0 ? (
        <p className="text-gray-500">Нет книг.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredAndSorted.map(book => (
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
                <h3 className="font-bold text-lg line-clamp-1">{book.title}</h3>
                <p className="text-gray-600 text-sm mb-1">by {book.author}</p>
                <p className="text-gray-500 text-xs mb-2">{book.year}</p>


                <div className="mt-2">
                  <div className="text-xs text-gray-500 mb-1">Статус:</div>
                  <div className="flex flex-wrap gap-1">
                    {(['planned', 'reading', 'read', 'abandoned'] as BookStatus[]).map(status => (
                      <button
                        key={status}
                        onClick={() => updateBook(book.id, { status })}
                        className={`text-xs px-2 py-0.5 rounded ${
                          book.status === status
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                        }`}
                      >
                        {status === 'planned' && 'В планах'}
                        {status === 'reading' && 'Читаю'}
                        {status === 'read' && 'Прочитано'}
                        {status === 'abandoned' && 'Брошено'}
                      </button>
                    ))}
                  </div>
                </div>



{book.userRating !== undefined && (
  <div className="mt-1">
    {[1, 2, 3, 4, 5].map(star => (
      <span key={star} className="text-yellow-500">
        {star <= (book.userRating ?? 0) ? '★' : '☆'}
      </span>
    ))}
  </div>
)}


                <div className="mt-2">
                  <button
                    onClick={() => updateBook(book.id, { isFavorite: !book.isFavorite })}
                    className={`text-xs px-2 py-0.5 rounded ${
                      book.isFavorite
                        ? 'bg-pink-600 text-white'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                  >
                    {book.isFavorite ? 'Любимая' : 'В избранное'}
                  </button>
                </div>


                <Link
                  to={`/book/${book.id}`}
                  className="mt-3 block text-indigo-600 hover:underline text-sm"
                >
                  Подробнее →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};