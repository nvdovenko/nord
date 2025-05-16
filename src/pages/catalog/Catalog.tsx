import { useEffect, useState } from 'react';

import { HiOutlineHeart, HiHeart } from 'react-icons/hi';
import products from '../../../public/data/products.json';

import './catalog.css';

const Catalog: React.FC = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem('nord-favorites') || '[]'
    );
    setFavorites(storedFavorites);
  }, []);

  const toggleFavorite = (id: number) => {
    let updatedFavorites;
    if (favorites.includes(id)) {
      updatedFavorites = favorites.filter((favId) => favId !== id);
    } else {
      updatedFavorites = [...favorites, id];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('nord-favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="catalog">
      <div className="header-container">CATALOG</div>
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
