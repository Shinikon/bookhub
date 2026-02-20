
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBooks } from '../hooks/useBooks';
import { Book, BookStatus } from '../types';

export const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { books, updateBook } = useBooks();

  const bookId = Number(id);
  const book = books.find(b => b.id === bookId);

  const [userRating, setUserRating] = useState(book?.userRating || 0);
  const [userReview, setUserReview] = useState(book?.userReview || '');
  const [status, setStatus] = useState<BookStatus>(book?.status || 'planned');
  const [isFavorite, setIsFavorite] = useState(!!book?.isFavorite);


  useEffect(() => {
    if (book) {
      setUserRating(book.userRating || 0);
      setUserReview(book.userReview || '');
      setStatus(book.status);
      setIsFavorite(!!book.isFavorite);
    }
  }, [book]);

  if (!book) {
    return (
      <div className="container mx-auto p-4">
        <p>Книга не найдена</p>
        <button
          onClick={() => navigate('/library')}
          className="text-indigo-600 hover:underline mt-2"
        >
          ← Вернуться в библиотеку
        </button>
      </div>
    );
  }

  const handleSave = () => {
    updateBook(bookId, {
      userRating: userRating || undefined,
      userReview: userReview || undefined,
      status,
      isFavorite,
    });
    navigate('/library');
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-indigo-600 hover:underline flex items-center"
      >
        ← Назад
      </button>

      <div className="flex flex-col md:flex-row gap-8">

        {book.cover ? (
          <img
            src={book.cover}
            alt={book.title}
            className="w-full md:w-64 h-80 object-cover rounded shadow"
            onError={(e) => (e.currentTarget.src = '')}
          />
        ) : (
          <div className="w-full md:w-64 h-80 bg-gray-200 flex items-center justify-center text-gray-500">
            Нет обложки
          </div>
        )}


        <div className="flex-1">
          <h1 className="text-3xl font-bold">{book.title}</h1>
          <p className="text-xl text-gray-700">by {book.author}</p>
          <p className="text-gray-600 mt-2">{book.year} г.</p>


          {book.genre.length > 0 && (
            <div className="mt-2">
              <span className="text-sm text-gray-500">Жанры: </span>
              {book.genre.map((g, i) => (
                <span key={i} className="inline-block bg-gray-100 px-2 py-0.5 rounded mr-1">
                  {g}
                </span>
              ))}
            </div>
          )}


          <div className="mt-4">
            <h2 className="font-bold text-lg mb-2">Описание</h2>
            <p className="whitespace-pre-line">{book.description || 'Нет описания'}</p>
          </div>


          <div className="mt-6 p-4 bg-gray-50 rounded">
            <h2 className="font-bold text-lg mb-3">Мои данные</h2>


            <div className="mb-3">
              <label className="block mb-1 font-medium">Статус</label>
              <div className="flex flex-wrap gap-2">
                {(['planned', 'reading', 'read', 'abandoned'] as BookStatus[]).map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStatus(s)}
                    className={`px-3 py-1 rounded text-sm ${
                      status === s
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                  >
                    {s === 'planned' && 'В планах'}
                    {s === 'reading' && 'Читаю'}
                    {s === 'read' && 'Прочитано'}
                    {s === 'abandoned' && 'Брошено'}
                  </button>
                ))}
              </div>
            </div>


            <div className="mb-3">
              <button
                type="button"
                onClick={() => setIsFavorite(!isFavorite)}
                className={`px-3 py-1 rounded text-sm ${
                  isFavorite
                    ? 'bg-pink-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {isFavorite ? 'В избранном' : 'Добавить в избранное'}
              </button>
            </div>


            <div className="mb-3">
              <label className="block mb-1 font-medium">Ваша оценка</label>
              <div className="flex">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setUserRating(star)}
                    className="text-2xl focus:outline-none"
                    aria-label={`Оценить на ${star} звёзд`}
                  >
                    {star <= userRating ? '★' : '☆'}
                  </button>
                ))}
              </div>
              {userRating > 0 && (
                <p className="text-yellow-500 mt-1">Ваша оценка: {userRating} из 5</p>
              )}
            </div>


            <div className="mb-3">
              <label className="block mb-1 font-medium">Ваш отзыв</label>
              <textarea
                value={userReview}
                onChange={(e) => setUserReview(e.target.value)}
                placeholder="Напишите ваш отзыв..."
                className="w-full p-2 border rounded min-h-[100px]"
              />
            </div>


            <button
              onClick={handleSave}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Сохранить изменения
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};