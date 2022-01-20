import { collection, getDocs } from "firebase/firestore";
import {
  db,
  transformCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";
import { ShopActionTypes } from "./shop.types";

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap
});

export const fetchCollectionsFailure = (errorMessage) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage
});

export const fetchCollectionsStartAsync = () => {
  return (dispatch) => {
    dispatch(fetchCollectionsStart());

    const collectionRef = collection(db, "collections");
    getDocs(collectionRef)
      .then((collections) => {
        const collectionsMap = transformCollectionsSnapshotToMap(collections);
        dispatch(fetchCollectionsSuccess(collectionsMap));
      })
      .catch((error) => dispatch(fetchCollectionsFailure(error.message())));
  };
};
