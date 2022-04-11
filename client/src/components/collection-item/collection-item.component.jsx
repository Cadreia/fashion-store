import React from "react";
import { connect } from "react-redux";
import { addItem } from "../../redux/cart/cart.actions";
import { AddButton, CollectionFooterContainer, CollectionItemContainer, ImageContainer } from "./collection-item.styles";

const CollectionItem = ({ item, addItem }) => {
  const { name, price, imageUrl } = item
  return (
    <CollectionItemContainer>
      <ImageContainer className="image" imageUrl={imageUrl} />
      <CollectionFooterContainer>
        <span className="name">{name}</span>
        <span className="price">{price} CFA</span>
      </CollectionFooterContainer>
      <AddButton className="custom-button" onClick={() => addItem(item)}>Add to Cart</AddButton>
    </CollectionItemContainer>
  );
};

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item))
})

export default connect(null, mapDispatchToProps)(CollectionItem);
