import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCartItems } from "../../redux/cart/cart.selector";
import CartItem from "../cart-item/cart-item.component";
import CustomButton from "../custom-button/custom-button.component";
import { useNavigate } from "react-router-dom";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { CartDropdownContainer, CartItemsContainer, EmptyMessageContainer } from "./cart-dropdown.styles";

const CartDropdown = ({ cartItems, dispatch }) => {
  let navigate = useNavigate();
  return (
    <CartDropdownContainer>
      {cartItems.length ? (
        <div>
          <CartItemsContainer>
            {cartItems.map((cartItem) => (
              <CartItem key={cartItem.id} item={cartItem}></CartItem>
            ))}
          </CartItemsContainer>
          <CustomButton
            onClick={() => {
              navigate("/checkout");
              dispatch(toggleCartHidden());
            }}
          >
            GO TO CHECKOUT
          </CustomButton>
        </div>
      ) : (
        <EmptyMessageContainer>Cart is Empty</EmptyMessageContainer>
      )}
    </CartDropdownContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
});

export default connect(mapStateToProps)(CartDropdown);
