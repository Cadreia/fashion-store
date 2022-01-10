import React from "react";
import { Link } from "react-router-dom";
import CollectionItem from "../collection-item/collection-item.component";
import { CollectionPreviewContainer, PreviewContainer, TitleContainer } from "./collection-preview.styles";

const CollectionPreview = ({ title, items }) => {
  const routeTitle = title.toLowerCase()
  const displayTitle = title.toUpperCase()
  return <CollectionPreviewContainer>
    <TitleContainer><Link to={`/shop/${routeTitle}`}>{displayTitle}</Link></TitleContainer>
    <PreviewContainer>
      {items
        // can preferably create a seperate collection selector that already filters the required number of items
        // before passing to collection-overview and then collection-preview component
        .filter((item, idx) => idx < 4)
        .map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
    </PreviewContainer>
  </CollectionPreviewContainer>
};

export default CollectionPreview;
