import React, { useEffect, useState } from 'react';
import products from '../../data/products.json';
import './cart.css';
import '../../components/basic-button/basic-button.ts';
import '../../components/quantity-selector/quantity-selector.ts';

type CartItem = {
  id: number;
  quantity: number;
};

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('nord-cart') || '[]');
    setCartItems(storedCart);
  }, []);

  const updateCart = (updated: CartItem[]) => {
    setCartItems(updated);
    localStorage.setItem('nord-cart', JSON.stringify(updated));
  };

  const changeQuantity = (id: number, delta: number) => {
    const updatedCart = cartItems
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + delta } : item
      )
      .filter((item) => item.quantity > 0); // Remove items with quantity <= 0

    updateCart(updatedCart);
  };

  const cartProducts = cartItems
    .map((cartItem) => {
      const product = products.find((p) => p.id === cartItem.id);
      if (!product) return null;
      return {
        ...product,
        quantity: cartItem.quantity,
        totalPrice:
          parseFloat(product.price.replace('$', '')) * cartItem.quantity,
      };
    })
    .filter(Boolean) as ((typeof products)[0] & {
    quantity: number;
    totalPrice: number;
  })[];

  if (cartProducts.length === 0) {
    return <p className="empty-cart">Your cart is empty.</p>;
  }

  return (
    <div className="cart-container">
      <h2 className="cart-header">SHOPPING CART</h2>
      <div className="cart-list">
        {cartProducts.map((product) => (
          <div key={product.id} className="cart-item">
            <img
              src={product.image}
              alt={product.name}
              className="cart-image"
            />
            <div className="cart-details">
              <p className="cart-name">{product.name}</p>
              <p className="cart-price">${product.totalPrice.toFixed(2)}</p>

              <quantity-selector
                value={product.quantity}
                onQuantityChange={(e: CustomEvent) =>
                  changeQuantity(
                    product.id,
                    (e as CustomEvent).detail.value - product.quantity
                  )
                }
                onQuantityZero={() =>
                  changeQuantity(product.id, -product.quantity)
                }
              ></quantity-selector>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="total-price">
          TOTAL PRICE: $
          {cartProducts.reduce((sum, p) => sum + p.totalPrice, 0).toFixed(2)}
        </div>
        <basic-button label="BUY NOW"> </basic-button>
      </div>
    </div>
  );
};

export default Cart;
