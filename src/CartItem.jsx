import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping, cartItems, setCartItems }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  let total;

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    total = 0;
    cart.forEach(item => {
        total += item.cost * item.quantity;
    });
    return total;
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  const handelCheckoutShopping = (e) => {
    alert("Functionality to be added for future reference");
  }

  const handleIncrement = (item) => {
    const itemToIncrease = {...item, quantity:item.quantity+1};
    dispatch(updateQuantity(itemToIncrease));
  };

  const handleDecrement = (item) => {
    if(item.quantity > 1){
      const itemToDecrease = {...item, quantity:item.quantity-1};
      dispatch(updateQuantity(itemToDecrease));
    } else if(item.quantity === 1){
        handleRemove(item);
    }
  };

  const removeFromCart = (item) => {
    const updatedCart = { ...cartItems };
    delete updatedCart[item.name];
    setCartItems(updatedCart);
  }; 

  const handleRemove = (item) => {
    dispatch(removeItem(item));
    removeFromCart(item);
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    let subTotal;
    subTotal = item.cost * item.quantity;
    return subTotal;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">${item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={handelCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


