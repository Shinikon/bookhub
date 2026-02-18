
import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Library } from './pages/Library';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { AddBook } from './pages/AddBook';
import { BookDetail } from './pages/BookDetail';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow">
<Routes>
  <Route path="/register" element={<Register />} />
  <Route path="/login" element={<Login />} />
  
  <Route element={<ProtectedRoute />}>
    <Route path="/library" element={<Library />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/book/:id" element={<BookDetail />} />
    <Route path="/add-book" element={<AddBook />} />
  </Route>

  <Route path="/" element={<Navigate to="/register" replace />} />
</Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;