
import { useState, useEffect } from 'react';
import { Book, BookStatus } from '../types';

const BOOKS_KEY = 'bookhub_books';

const generateInitialBooks = (): Book[] => {
  const now = new Date().toISOString();
  return [
    {
      id: 1,
      title: "Преступление и наказание",
      author: "Фёдор Достоевский",
      description: "Роман о моральных страданиях и духовном возрождении Родиона Раскольникова.",
      genre: ["Классика", "Психологический роман"],
      year: 1866,
      cover: "https://avatars.mds.yandex.net/get-mpic/5426148/img_id3824017904095478322.jpeg/orig",
      status: "read",
      isFavorite: true,
      userRating: 5,
      userReview: "Гениальное произведение о совести и искуплении.",
      addedAt: now
    },
    {
      id: 2,
      title: "Война и мир",
      author: "Лев Толстой",
      description: "Эпопея о жизни русского общества в эпоху наполеоновских войн.",
      genre: ["Классика", "Исторический роман"],
      year: 1869,
      cover: "https://avatars.mds.yandex.net/i?id=1e496da5d17c6c4b2e03d1fc41ef91d0_l-4937827-images-thumbs&n=13",
      status: "reading",
      addedAt: now
    },
    {
      id: 3,
      title: "Мастер и Маргарита",
      author: "Михаил Булгаков",
      description: "Философский роман о добре и зле, любви и творчестве.",
      genre: ["Советская литература", "Фантастика"],
      year: 1967,
      cover: "https://avatars.mds.yandex.net/i?id=302288a9ce15d804ae345932baa4be8ef496f9c2-12395903-images-thumbs&n=13",
      status: "read",
      isFavorite: true,
      userRating: 5,
      addedAt: now
    },
    {
      id: 4,
      title: "Евгений Онегин",
      author: "Александр Пушкин",
      description: "Роман в стихах о жизни русского дворянства начала XIX века.",
      genre: ["Поэзия", "Классика"],
      year: 1833,
      cover: "https://avatars.mds.yandex.net/i?id=362d31b8859686b4150511b9f05bcaee_l-16333513-images-thumbs&n=13",
      status: "planned",
      addedAt: now
    },
    {
      id: 5,
      title: "Отцы и дети",
      author: "Иван Тургенев",
      description: "Роман о конфликте поколений и нигилизме.",
      genre: ["Классика", "Социальный роман"],
      year: 1862,
      cover: "https://avatars.mds.yandex.net/i?id=25896d39963b1439a41d31453320dd49f5724f03-4886237-images-thumbs&n=13",
      status: "planned",
      addedAt: now
    },
    {
      id: 6,
      title: "Герой нашего времени",
      author: "Михаил Лермонтов",
      description: "Первый психологический роман в русской литературе.",
      genre: ["Классика", "Психологический роман"],
      year: 1840,
      cover: "https://avatars.mds.yandex.net/i?id=12e91aa8a6653cce8502706bb973e8211a9387ee-4120546-images-thumbs&n=13",
      status: "read",
      userRating: 4,
      addedAt: now
    },
    {
      id: 7,
      title: "Тихий Дон",
      author: "Михаил Шолохов",
      description: "Эпопея о жизни донских казаков во время Первой мировой и Гражданской войн.",
      genre: ["Советская литература", "Исторический роман"],
      year: 1940,
      cover: "https://avatars.mds.yandex.net/i?id=d4afb228e96090472cd5cfee52d1494b_sr-9863167-images-thumbs&n=13",
      status: "abandoned",
      addedAt: now
    },
    {
      id: 8,
      title: "Обломов",
      author: "Иван Гончаров",
      description: "Роман о лени, мечтах и упущенном времени.",
      genre: ["Классика", "Социальный роман"],
      year: 1859,
      cover: "https://avatars.mds.yandex.net/i?id=4448772288acece005240b707aef3458358a235e-5858058-images-thumbs&n=13",
      status: "planned",
      addedAt: now
    },
    {
      id: 9,
      title: "Доктор Живаго",
      author: "Борис Пастернак",
      description: "Роман о судьбе врача и поэта в эпоху революции и гражданской войны.",
      genre: ["Советская литература", "Исторический роман"],
      year: 1957,
      cover: "https://avatars.mds.yandex.net/i?id=9ed5eead1f836ef12ca787fc5f2f1e80f4ecd662-5248760-images-thumbs&n=13",
      status: "reading",
      addedAt: now
    },
    {
      id: 10,
      title: "Один день Ивана Денисовича",
      author: "Александр Солженицын",
      description: "Рассказ о жизни заключённого в сталинском лагере.",
      genre: ["Советская литература", "Повесть"],
      year: 1962,
      cover: "https://avatars.mds.yandex.net/i?id=271e50042f80ea19c580bb381ae5d90a11615db2-2806623-images-thumbs&n=13",
      status: "read",
      userRating: 5,
      addedAt: now
    },
    {
      id: 11,
      title: "Записки юного врача",
      author: "Михаил Булгаков",
      description: "Цикл рассказов о первых шагах молодого врача в провинции.",
      genre: ["Советская литература", "Рассказы"],
      year: 1926,
      cover: "https://avatars.mds.yandex.net/i?id=8dad40d400885b946e8021cd01f96514aabe0636-5485758-images-thumbs&n=13",
      status: "planned",
      addedAt: now
    },
    {
      id: 12,
      title: "Мёртвые души",
      author: "Николай Гоголь",
      description: "Сатирический роман о чиновниках и помещиках России.",
      genre: ["Классика", "Сатира"],
      year: 1842,
      cover: "https://avatars.mds.yandex.net/i?id=9646a62dbc7f600e36b3151e6b851e74360919b2-5257484-images-thumbs&n=13",
      status: "read",
      isFavorite: false,
      userRating: 4,
      addedAt: now
    },
    {
      id: 13,
      title: "Чевенгур",
      author: "Андрей Платонов",
      description: "Философский роман о поисках коммунизма в российской глубинке.",
      genre: ["Советская литература", "Философский роман"],
      year: 1928,
      cover: "https://avatars.mds.yandex.net/i?id=34889748d57f550498b470dc9dc0b9e5af96d14d-4076833-images-thumbs&n=13",
      status: "planned",
      addedAt: now
    },
    {
      id: 14,
      title: "Жизнь и судьба",
      author: "Василий Гроссман",
      description: "Эпическое произведение о Великой Отечественной войне.",
      genre: ["Советская литература", "Исторический роман"],
      year: 1980,
      cover: "https://avatars.mds.yandex.net/i?id=5e1cb0361a24c229fbc86bedae71d3d3838ca29e-9867663-images-thumbs&n=13",
      status: "reading",
      addedAt: now
    },
    {
      id: 15,
      title: "Собачье сердце",
      author: "Михаил Булгаков",
      description: "Сатирическая повесть о попытке превратить человека в человека.",
      genre: ["Советская литература", "Сатира"],
      year: 1925,
      cover: "https://avatars.mds.yandex.net/i?id=fed5e8980201dd3a29c7ba731435bf928fbcee13-5114590-images-thumbs&n=13",
      status: "read",
      isFavorite: true,
      userRating: 5,
      userReview: "Остроумно и актуально до сих пор!",
      addedAt: now
    }
  ];
};

const getBooks = (): Book[] => {
  const saved = localStorage.getItem(BOOKS_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      return [];
    }
  }

  // Если данных нет — инициализируем
  const initialBooks = generateInitialBooks();
  localStorage.setItem(BOOKS_KEY, JSON.stringify(initialBooks));
  return initialBooks;
};

const saveBooks = (books: Book[]) => {
  localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
};

export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    setBooks(getBooks());
  }, []);

  const addBook = (book: Omit<Book, 'id' | 'addedAt'>) => {
    const newBook: Book = {
      ...book,
      id: Date.now(),
      addedAt: new Date().toISOString(),
    };
    const updated = [...books, newBook];
    setBooks(updated);
    saveBooks(updated);
  };

  const updateBook = (id: number, updates: Partial<Book>) => {
    const updated = books.map(book =>
      book.id === id ? { ...book, ...updates } : book
    );
    setBooks(updated);
    saveBooks(updated);
  };

  const deleteBook = (id: number) => {
    const updated = books.filter(book => book.id !== id);
    setBooks(updated);
    saveBooks(updated);
  };

  return { books, addBook, updateBook, deleteBook };
};