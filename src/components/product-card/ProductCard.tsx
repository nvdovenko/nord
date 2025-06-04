import React from 'react';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import '../../components/basic-button/basic-button.ts';

import './product-card.css';

type Product = {
  id: number;
  name: string;
  price: string;
  image: string;
};

type ProductCardProps = {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  showAddToCart?: boolean;
  onAddToCart?: (id: number) => void;
  isFavoritesPage?: boolean;
  onClick?: () => void;
};

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isFavorite,
  onToggleFavorite,
  showAddToCart = false,
  onAddToCart,
  isFavoritesPage = false,
  onClick,
}) => {
  return (
    <div className={isFavoritesPage ? 'fav-product-card' : 'product-card'}>
      <div className="image-container">
        <img src={product.image} alt={product.name} onClick={onClick} />
        <button
          className="favorite-btn"
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering image click
            onToggleFavorite(product.id);
          }}
        >
          {isFavorite ? (
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

      {showAddToCart && onAddToCart && (
        <basic-button
          label="ADD TO CART"
          secondary
          onClick={(e: Event) => {
            e.stopPropagation(); // Prevent triggering image click
            onAddToCart(product.id);
          }}
        ></basic-button>
      )}
    </div>
  );
};

export default ProductCard;
