import { collection, onSnapshot } from "firebase/firestore";
import React, { Component } from "react";
import { Outlet } from "react-router-dom";
import { db, transformCollectionsSnapshotToMap } from "../../firebase/firebase.utils";

class ShopPage extends Component {
  unsubscribeFromSnapshot = null;
  componentDidMount() {
    const collectionRef = collection(db, "collections");

    // retrieve data onComponentMount or when collectionRef changes
    onSnapshot(collectionRef, async (collections) => {
      transformCollectionsSnapshotToMap(collections)
    });
  }
  render() {
    return (
      <div className="shop-page">
        <Outlet />
      </div>
    );
  }
}

export default ShopPage;
