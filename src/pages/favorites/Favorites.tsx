import React, { useEffect, useState } from 'react';
import { HiHeart } from 'react-icons/hi';
import products from '../../../public/data/products.json';

import './favorites.css';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    );
    setFavorites(storedFavorites);
  }, []);

  const removeFavorite = (id: number) => {
    const updatedFavorites = favorites.filter((favId) => favId !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
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
            <button className="buy-button">ADD TO CART</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
