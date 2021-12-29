import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCartItems } from "../../redux/cart/cart.selector";
import CartItem from "../cart-item/cart-item.component";
import CustomButton from "../custom-button/custom-button.component";
import "./cart-dropdown.styles.scss";

const CartDropdown = ({ cartItems }) => {
  let cartIsEmpty = cartItems.length > 0 ? false : true;
  console.log(cartItems.length);
  return (
    <div className="cart-dropdown">
      {cartIsEmpty ? (
        <p>Your Cart is Empty</p>
      ) : (
        <div>
          <div className="cart-items">
            {cartItems.map((cartItem) => (
              <CartItem key={cartItem.id} item={cartItem}></CartItem>
            ))}
          </div>
          <CustomButton>GO TO CHECKOUT</CustomButton>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({ 
  cartItems: selectCartItems 
});

export default connect(mapStateToProps)(CartDropdown);
