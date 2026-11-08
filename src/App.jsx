import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import CartToast from './components/CartToast';
import FooterUI from './components/Footer';
import NavbarUI from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import ProductDetail from './pages/ProductDetail';
import Products from './pages/Products';
import Profile from './pages/Profile';
import Register from './pages/Register';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="d-flex flex-column min-vh-100">
            <NavbarUI />
            <main className="container my-4 flex-grow-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/productos" element={<Products />} />
                <Route path="/producto/:id" element={<ProductDetail />} />
                <Route path="/carrito" element={<Cart />} />
                <Route path="/contacto" element={<Contact />} />
                <Route path="/registro" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/perfil" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <FooterUI />
            <CartToast />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
