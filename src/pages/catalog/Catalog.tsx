import React, { useState } from 'react';

import { HiOutlineHeart, HiHeart } from 'react-icons/hi';
import './catalog.css';

/* Temprorary soltion while waiting for the backend to be ready */
const products = [
  {
    id: 1,
    name: 'T-shirt for women',
    price: '$19.99',
    image: '/pictures/product1.jpg',
  },
  {
    id: 2,
    name: 'T-shirt for women',
    price: '$9.99',
    image: '/pictures/product2.jpg',
  },
  {
    id: 3,
    name: 'T-shirt for women',
    price: '$9.99',
    image: '/pictures/product3.jpg',
  },
  {
    id: 4,
    name: 'T-shirt for men',
    price: '$29.99',
    image: '/pictures/product4.jpg',
  },
  {
    id: 5,
    name: 'Womens T-shirt',
    price: '$19.99',
    image: '/pictures/product5.jpg',
  },
  {
    id: 6,
    name: 'Womens T-shirt',
    price: '$6.99',
    image: '/pictures/product6.jpg',
  },
  {
    id: 7,
    name: 'Mens T-shirt',
    price: '$9.99',
    image: '/pictures/product7.jpg',
  },
  {
    id: 8,
    name: 'Kids T-shirt',
    price: '$9.99',
    image: '/pictures/product8.jpg',
  },
];

const Catalog: React.FC = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  return (
    <div className="catalog">
      <div className="header-container">Catalog</div>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="image-container">
              <img src={product.image} alt={product.name} />
              <button
                className="favorite-btn"
                onClick={() => toggleFavorite(product.id)}
              >
                {favorites.includes(product.id) ? (
                  <HiHeart className="heart-icon active" />
                ) : (
                  <HiOutlineHeart className="heart-icon" />
                )}
              </button>
            </div>
            <div className="product-info">
              <p className="product-name">{product.name}</p>
              <p className="product-price">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
