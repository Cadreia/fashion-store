import { collection, onSnapshot } from "firebase/firestore";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Outlet } from "react-router-dom";
import {
  db,
  transformCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";
import { updateCollections } from "../../redux/shop/shop.actions";

class ShopPage extends Component {
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = collection(db, "collections");

    // retrieve data onComponentMount or when collectionRef changes
    this.unsubscribeFromSnapshot = onSnapshot(
      collectionRef,
      async (collections) => {
        const collectionsMap = transformCollectionsSnapshotToMap(collections);
        updateCollections(collectionsMap);
      }
    );
  }
  render() {
    return (
      <div className="shop-page">
        <Outlet />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateCollections: (collectionsMap) =>
    dispatch(updateCollections(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
