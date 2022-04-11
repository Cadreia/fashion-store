import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CollectionItem from "../../components/collection-item/collection-item.component";
import { selectCollection } from "../../redux/shop/shop.selector";
import { CollectionContainer, CollectionItemsContainer, CollectionTitleContainer } from "./collection.styles";

const CollectionPage = () => {
  const { collectionId } = useParams();

  // Optionally use this to get collection from store instead of mapStateToProps
  const collection = useSelector(selectCollection(collectionId));
  const { title, items } = collection;
  return (
    <CollectionContainer>
      <CollectionTitleContainer>{title}</CollectionTitleContainer>
      <CollectionItemsContainer>
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </CollectionItemsContainer>
    </CollectionContainer>
  );
};

export default CollectionPage;
