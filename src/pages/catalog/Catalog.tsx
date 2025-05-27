import { useEffect, useState } from 'react';
import products from '../../data/products.json';
import ProductCard from '../../components/product-card/ProductCard';

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
          <ProductCard
            key={product.id}
            product={product}
            isFavorite={favorites.includes(product.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default Catalog;
