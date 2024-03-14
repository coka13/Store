import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, setItem } from '../../store/slices/cartSlice';
import './ProductCard.css';
import {useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import IconButton from '@mui/material/IconButton';
import { Typography } from '@mui/material';



export const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(state => state.cart.cart.find(item => item._id === product._id));
  const navigate=useNavigate()

  const incrementCount = () => {
    dispatch(setItem(product));
  };

  const decrementCount = () => {
    if (cartItem&&cartItem.quantity > 0) {
      dispatch(removeItem(product));
    }
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.title} onClick= {()=>navigate(`/items/${product._id}`)} />
      </div>
      <div className="product-info">
        <h5>{product.title}</h5>
        <h6>{product.price}$</h6>
        <div className="buttons">
      <IconButton color='primary' aria-label="Add" onClick={incrementCount}>
        <AddIcon />
      </IconButton>
      <Typography > {!cartItem?.quantity ? 0 : cartItem?.quantity }</Typography>
      <IconButton color='primary' aria-label="Remove" onClick={decrementCount}>
        <RemoveIcon />
      </IconButton>
        </div>
      </div>
    </div>
  );
};
