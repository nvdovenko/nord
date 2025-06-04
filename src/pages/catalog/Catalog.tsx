import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import products from '../../data/products.json';
import ProductCard from '../../components/product-card/ProductCard';

const Catalog: React.FC = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const navigate = useNavigate();

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

  const handleOpenProduct = (id: number) => {
    navigate(`/product/${id}`);
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
            onClick={() => handleOpenProduct(product.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Catalog;
