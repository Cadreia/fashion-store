import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import logo from "../../assets/store.png";
import { selectCartHidden } from "../../redux/cart/cart.selector";
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

const Header = ({ currentUser, hidden, logUserOut }) => {
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
          <OptionLink as="div" onClick={logUserOut}>
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

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

export default connect(mapStateToProps)(Header);
