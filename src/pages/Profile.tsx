
import { useState, useMemo } from 'react';
import { useBooks } from '../hooks/useBooks';
import { Book, BookStatus } from '../types';

export const Profile = () => {
  const { books } = useBooks();
  const [activeTab, setActiveTab] = useState<'all' | BookStatus | 'favorites'>('all');


  const filteredBooks = useMemo(() => {
    if (activeTab === 'all') return books;
    if (activeTab === 'favorites') return books.filter(b => b.isFavorite);
    return books.filter(b => b.status === activeTab);
  }, [books, activeTab]);


  const stats = {
    total: books.length,
    read: books.filter(b => b.status === 'read').length,
    reading: books.filter(b => b.status === 'reading').length,
    planned: books.filter(b => b.status === 'planned').length,
    abandoned: books.filter(b => b.status === 'abandoned').length,
    favorites: books.filter(b => b.isFavorite).length,
  };

  const avgRating = stats.total > 0
    ? (books.reduce((sum, b) => sum + (b.userRating || 0), 0) / stats.total).toFixed(1)
    : '0.0';

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Мой профиль</h1>


      <div className="bg-white p-4 rounded shadow mb-6">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 text-center text-sm">
          <div>
            <div className="font-bold">{stats.total}</div>
            <div>Всего</div>
          </div>
          <div>
            <div className="font-bold text-green-600">{stats.read}</div>
            <div>Прочитано</div>
          </div>
          <div>
            <div className="font-bold text-yellow-600">{stats.reading}</div>
            <div>Читаю</div>
          </div>
          <div>
            <div className="font-bold text-blue-600">{stats.planned}</div>
            <div>В планах</div>
          </div>
          <div>
            <div className="font-bold text-red-600">{stats.abandoned}</div>
            <div>Брошено</div>
          </div>
          <div>
            <div className="font-bold text-pink-600">{stats.favorites}</div>
            <div>Любимые</div>
          </div>
        </div>
        <div className="mt-2 text-center text-sm">
          Средний рейтинг: <span className="font-bold text-yellow-500">{avgRating}</span>
        </div>
      </div>


      <div className="flex flex-wrap gap-2 mb-4 border-b">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3 py-1 rounded-t ${activeTab === 'all' ? 'bg-white border-t border-l border-r font-medium' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Все книги
        </button>
        <button
          onClick={() => setActiveTab('read')}
          className={`px-3 py-1 rounded-t ${activeTab === 'read' ? 'bg-white border-t border-l border-r font-medium' : 'text-gray-500 hover:text-gray-700'}`}
        >
          ✅ Прочитано
        </button>
        <button
          onClick={() => setActiveTab('reading')}
          className={`px-3 py-1 rounded-t ${activeTab === 'reading' ? 'bg-white border-t border-l border-r font-medium' : 'text-gray-500 hover:text-gray-700'}`}
        >
          📖 Читаю
        </button>
        <button
          onClick={() => setActiveTab('planned')}
          className={`px-3 py-1 rounded-t ${activeTab === 'planned' ? 'bg-white border-t border-l border-r font-medium' : 'text-gray-500 hover:text-gray-700'}`}
        >
          📌 В планах
        </button>
        <button
          onClick={() => setActiveTab('abandoned')}
          className={`px-3 py-1 rounded-t ${activeTab === 'abandoned' ? 'bg-white border-t border-l border-r font-medium' : 'text-gray-500 hover:text-gray-700'}`}
        >
          ❌ Брошено
        </button>
        <button
          onClick={() => setActiveTab('favorites')}
          className={`px-3 py-1 rounded-t ${activeTab === 'favorites' ? 'bg-white border-t border-l border-r font-medium' : 'text-gray-500 hover:text-gray-700'}`}
        >
          ❤️ Любимые
        </button>
      </div>


      {filteredBooks.length === 0 ? (
        <p className="text-gray-500">
          {activeTab === 'all' && 'У вас пока нет книг.'}
          {activeTab === 'read' && 'Нет прочитанных книг.'}
          {activeTab === 'reading' && 'Ничего не читаете.'}
          {activeTab === 'planned' && 'Нет книг в планах.'}
          {activeTab === 'abandoned' && 'Нет брошенных книг.'}
          {activeTab === 'favorites' && 'Нет любимых книг.'}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBooks.map(book => (
            <div key={book.id} className="border rounded p-4 bg-white">
              <div className="flex items-start gap-3">
                {book.cover ? (
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-16 h-20 object-cover rounded"
                    onError={(e) => (e.currentTarget.src = '')}
                  />
                ) : (
                  <div className="w-16 h-20 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                    Нет обложки
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="font-medium line-clamp-1">{book.title}</h3>
                  <p className="text-gray-600 text-sm">by {book.author}</p>
                  <p className="text-gray-500 text-xs">{book.year}</p>


                  <div className="mt-1">
                    <span className={`text-xs px-1.5 py-0.5 rounded ${
                      book.status === 'read' ? 'bg-green-100 text-green-800' :
                      book.status === 'reading' ? 'bg-yellow-100 text-yellow-800' :
                      book.status === 'planned' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {book.status === 'read' ? '✅ Прочитано' :
                       book.status === 'reading' ? '📖 Читаю' :
                       book.status === 'planned' ? '📌 В планах' : '❌ Брошено'}
                    </span>
                  </div>


                  {book.userRating !== undefined && (
                    <div className="mt-1">
                      {[1,2,3,4,5].map(star => (
                        <span key={star} className="text-yellow-500 text-sm">
                          {star <= (book.userRating ?? 0) ? '★' : '☆'}
                        </span>
                      ))}
                    </div>
                  )}


                  {book.isFavorite && (
                    <div className="mt-1">
                      <span className="text-pink-500 text-xs">❤️ Любимая</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};