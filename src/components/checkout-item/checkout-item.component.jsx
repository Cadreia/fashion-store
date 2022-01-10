import React from 'react'
import { connect } from 'react-redux'
import { addItem, clearItem, removeItem } from '../../redux/cart/cart.actions'
import { CheckoutItemContainer, ImageContainer, QuantityContainer, RemoveButtonContainer, TextContainer } from './checkout-item.styles'

const CheckoutItem = ({ cartItem, addItem, removeItem, clearItem }) => {
    const  { name, imageUrl, quantity, price } = cartItem
    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt="item" />
            </ImageContainer>
            <TextContainer>{ name }</TextContainer>
            <QuantityContainer>
                <div onClick={() => removeItem(cartItem)}>&#10096;</div>
                <span>{ quantity }</span>
                <div onClick={() => addItem(cartItem)}>&#10097;</div>
            </QuantityContainer>
            <TextContainer>{ price }</TextContainer>
            <RemoveButtonContainer onClick={() => clearItem(cartItem)}>&#10006;</RemoveButtonContainer> {/* UTF-8 wingdings */}
        </CheckoutItemContainer>
    )
}

const mapDispatchToProps = (dispatch) => ({
    addItem: item => dispatch(addItem(item)),
    removeItem: item => dispatch(removeItem(item)),
    clearItem: item => dispatch(clearItem(item))
})

export default connect(null, mapDispatchToProps)(CheckoutItem)
