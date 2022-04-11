import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import logo from "../../assets/store.png";
import { selectCartHidden } from "../../redux/cart/cart.selector";
import { signOutStart } from "../../redux/user/user.actions";
import { selectCurrentUser } from "../../redux/user/user.selector";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import CartIcon from "../cart-icon/cart-icon.component";
import {
  HeaderContainer,
  LogoContainer,
  LogoImage,
  OptionLink,
  OptionsContainer,
} from "./header.styles";
// import { ReactComponent as Logo } from "../../assets/crown.svg";

const Header = () => {
  const currentUser = useSelector(selectCurrentUser);
  const hidden = useSelector(selectCartHidden);
  const dispatch = useDispatch();
  return (
    <HeaderContainer>
      <LogoContainer to="/">
        {/* <Logo className="logo" /> */}
        <LogoImage src={logo} alt="logo"></LogoImage>
      </LogoContainer>
      <OptionsContainer>
        <OptionLink to="/shop">SHOP</OptionLink>
        <OptionLink to="/shop">CONTACT</OptionLink>
        <CartIcon />
        {currentUser ? (
          <OptionLink as="div" onClick={() => dispatch(signOutStart())}>
            SIGN OUT
          </OptionLink> // as={Link}
        ) : (
          <OptionLink to="/auth">SIGN IN</OptionLink>
        )}
      </OptionsContainer>
      {!hidden && <CartDropdown />}
    </HeaderContainer>
  );
};

export default Header;
