import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { selectCartCountItems } from "../../redux/cart/cart.selector";
import {
  CartIconContainer,
  ItemCountContainer,
  ShoppingIconContainer,
} from "./cart-icon.styles";
import "./cart-icon.styles.scss";

const CartIcon = () => {
  const itemCount = useSelector(selectCartCountItems);
  const dispatch = useDispatch();
  return (
    <CartIconContainer onClick={() => dispatch(toggleCartHidden())}>
      <ShoppingIconContainer />
      <ItemCountContainer>{itemCount}</ItemCountContainer>
    </CartIconContainer>
  );
};

export default CartIcon;
