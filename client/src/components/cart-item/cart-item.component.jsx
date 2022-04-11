import React from 'react'
import { CartItemContainer, ImageContainer, ItemDetailsContainer, NameContainer } from './cart-item.styles'

const CartItem = ({item: { imageUrl, price, quantity }}) => {
    return (
        <CartItemContainer>
            <ImageContainer src={imageUrl} alt="item"></ImageContainer>
            <ItemDetailsContainer>
                <NameContainer></NameContainer>
                <span>{ quantity } x { price } CFA</span>
            </ItemDetailsContainer>
        </CartItemContainer>
    )
}

export default CartItem
