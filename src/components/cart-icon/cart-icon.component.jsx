import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { toggleCartHidden } from '../../redux/cart/cart.actions'
import { selectCartCountItems } from '../../redux/cart/cart.selector'
import { CartIconContainer, ItemCountContainer, ShoppingIconContainer } from './cart-icon.styles'
import './cart-icon.styles.scss'

const CartIcon = ({ toggleCartHidden, itemCount }) => {
    return (
        <CartIconContainer onClick={toggleCartHidden}>
            <ShoppingIconContainer />
            <ItemCountContainer>{ itemCount }</ItemCountContainer>
        </CartIconContainer>
    )
}

const mapDispatchToProps = (dispatch) => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
})

const mapStateToProps = createStructuredSelector({
    itemCount: selectCartCountItems
})

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon)
