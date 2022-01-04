import React from "react";
import { Link } from "react-router-dom";
import CollectionItem from "../collection-item/collection-item.component";

import "./collection-preview.styles.scss";

const CollectionPreview = ({ title, items }) => {
  const routeTitle = title.toLowerCase()
  const displayTitle = title.toUpperCase()
  return <div className="collection-preview">
    <h1 className="title"><Link to={`/shop/${routeTitle}`}>{displayTitle}</Link></h1>
    <div className="preview">
      {items
        // can preferably create a seperate collection selector that already filters the required number of items
        // before passing to collection-overview and then collection-preview component
        .filter((item, idx) => idx < 4)
        .map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
    </div>
  </div>
};

export default CollectionPreview;
