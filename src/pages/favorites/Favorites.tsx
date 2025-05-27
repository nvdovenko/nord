import React, { useEffect, useState } from 'react';
import products from '../../data/products.json';
import ProductCard from '../../components/product-card/ProductCard';

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
          <ProductCard
            key={product.id}
            product={product}
            isFavorite={true}
            onToggleFavorite={removeFavorite}
            showAddToCart={true}
            onAddToCart={handleAddToCart}
            isFavoritesPage={true}
          />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
