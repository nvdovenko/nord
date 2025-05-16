import React, { useEffect, useState } from 'react';
import { HiHeart } from 'react-icons/hi';
import products from '../../../public/data/products.json';

import './favorites.css';

type CartItem = {
  id: number;
  quantity: number;
};

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem('nord-favorites') || '[]'
    );
    setFavorites(storedFavorites);
  }, []);

  const removeFavorite = (id: number) => {
    const updatedFavorites = favorites.filter((favId) => favId !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('nord-favorites', JSON.stringify(updatedFavorites));
  };

  const handleAddToCart = (id: number) => {
    const storedCart: CartItem[] = JSON.parse(
      localStorage.getItem('nord-cart') || '[]'
    );
    const existingItem = storedCart.find((item) => item.id === id);

    let updatedCart;
    if (existingItem) {
      updatedCart = storedCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...storedCart, { id, quantity: 1 }];
    }

    localStorage.setItem('nord-cart', JSON.stringify(updatedCart));
  };

  const favoriteProducts = products.filter((product) =>
    favorites.includes(product.id)
  );

  if (favoriteProducts.length === 0) {
    return <p>No favorite items yet.</p>;
  }

  return (
    <div className="catalog">
      <div className="header-container">FAVORITES</div>
      <div className="product-grid">
        {favoriteProducts.map((product) => (
          <div key={product.id} className="fav-product-card">
            <div className="image-container">
              <img src={product.image} alt={product.name} />
              <button
                className="favorite-btn"
                onClick={() => removeFavorite(product.id)}
              >
                <HiHeart className="heart-icon active" />
              </button>
            </div>
            <div className="product-info">
              <p className="product-name">{product.name}</p>
              <p className="product-price">{product.price}</p>
            </div>
            <button
              className="buy-button"
              onClick={() => handleAddToCart(product.id)}
            >
              ADD TO CART
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
