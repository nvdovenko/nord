import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import products from '../../data/products.json';

import '../../components/basic-button/basic-button.ts';
import './product.css'; // ⬅️ Make sure this line exists

type ProductType = {
  id: number;
  name: string;
  image: string;
  price: string;
  description?: string;
};

const ProductPage: React.FC = () => {
  const { id } = useParams();
  const productId = parseInt(id || '', 10);
  const [product, setProduct] = useState<ProductType | null>(null);

  useEffect(() => {
    const found = products.find((p) => p.id === productId);
    setProduct(found || null);
  }, [productId]);

  const handleAddToCart = () => {
    type CartItem = { id: number; quantity: number };
    const cart: CartItem[] = JSON.parse(
      localStorage.getItem('nord-cart') || '[]'
    );
    const updated: CartItem[] = [...cart];
    const index = updated.findIndex((item: CartItem) => item.id === productId);

    if (index >= 0) {
      updated[index].quantity += 1;
    } else {
      updated.push({ id: productId, quantity: 1 });
    }

    localStorage.setItem('nord-cart', JSON.stringify(updated));
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-page-page">
      <div className="product-page-body">
        <div className="product-page-images">
          <img
            src={product.image}
            alt={product.name}
            className="product-page-image"
          />
        </div>

        <div className="product-page-info">
          <div className="product-page-name">{product.name}</div>
          <p className="product-page-price">{product.price}</p>
          <p className="product-page-description">{product.description}</p>

          <basic-button label="BUY" onClick={handleAddToCart}></basic-button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
