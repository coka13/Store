import React from 'react';
import "./Cart.css";
import { useSelector } from 'react-redux';
import { Nav } from '../../components/Nav/Nav';
import { ProductCard } from '../../components/ProductCard/ProductCard';

const Cart = () => {
  const cart = useSelector(state => state.cart.cart);
  console.log(cart);

  return (
    <>
    <Nav></Nav>
    <section className="products">
        {cart.map((product,index) => (
          <>
          
          <ProductCard product={product} key={index} />
          </>
        ))}
      </section>
    </>
  );
};

export default Cart;
