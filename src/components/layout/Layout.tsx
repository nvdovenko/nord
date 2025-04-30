import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import {
  HiOutlineMenu,
  HiOutlineSearch,
  HiOutlineHeart,
  HiOutlineShoppingCart,
  HiOutlineUser,
} from 'react-icons/hi';

const Layout: React.FC = () => {
  return (
    <div className="layout">
      <header>
        <nav className="nav">
          <div className="nav-left">
            <Link to="/catalog" className="icon-link" title="Catalog">
              <HiOutlineMenu className="icon" />
            </Link>
          </div>
          <div className="nav-left">
            <Link to="/" className="logo">
              NORD
            </Link>
          </div>
          <div className="nav-right">
            <Link to="/search" className="icon-link">
              <HiOutlineSearch className="icon" title="Search" />
            </Link>
            <Link to="/favorites" className="icon-link">
              <HiOutlineHeart className="icon" title="Favorites" />
            </Link>
            <Link to="/cart" className="icon-link">
              <HiOutlineShoppingCart className="icon" title="Cart" />
            </Link>
            <Link to="/auth" className="icon-link">
              <HiOutlineUser className="icon" title="Log in" />
            </Link>
          </div>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <p>&copy; {new Date().getFullYear()} NORD</p>
      </footer>
    </div>
  );
};

export default Layout;
