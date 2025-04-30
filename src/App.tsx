import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Layout from './components/layout/Layout';
import Search from './pages/search/Search';
import Favorites from './pages/favorites/Favorites';
import Cart from './pages/cart/Cart';
import Auth from './pages/auth/Auth';
import Catalog from './pages/catalog/Catalog';

import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="search" element={<Search />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="cart" element={<Cart />} />
          <Route path="auth" element={<Auth />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
