
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooks } from '../hooks/useBooks';

export const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [isbn, setIsbn] = useState('');
  const [cover, setCover] = useState('');
  const navigate = useNavigate();
  const { addBook } = useBooks();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return;

    const genreList = genre
      .split(',')
      .map(g => g.trim())
      .filter(g => g) || ['Без жанра'];

    addBook({
      title,
      author,
      description: description || undefined,
      genre: genreList,
      year: Number(year) || new Date().getFullYear(),
      isbn: isbn || undefined,
      cover: cover || undefined,
      status: 'planned',
    });

    navigate('/library');
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Добавить книгу</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Название *"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Автор *"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Описание"
          className="w-full p-2 border rounded"
          rows={3}
        />
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          placeholder="Жанры (через запятую)"
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Год издания"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          placeholder="ISBN"
          className="w-full p-2 border rounded"
        />
        <input
          type="url"
          value={cover}
          onChange={(e) => setCover(e.target.value)}
          placeholder="Ссылка на обложку"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Добавить книгу
        </button>
      </form>
    </div>
  );
};