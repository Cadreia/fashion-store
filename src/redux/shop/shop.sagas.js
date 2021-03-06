import { ShopActionTypes } from "./shop.types";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { collection, getDocs } from "firebase/firestore";
import {
  db,
  transformCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";
import {
  fetchCollectionsFailure,
  fetchCollectionsSuccess,
} from "./shop.actions";

function* fetchCollectionsAsync() {
  try {
    const collectionRef = collection(db, "collections");
    const snapshot = yield getDocs(collectionRef);

    // const collectionsMap = transformCollectionsSnapshotToMap(snapshot);
    const collectionsMap = yield call(
      transformCollectionsSnapshotToMap,
      snapshot
    );

    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
}

function* fetchCollectionsStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}

export function* shopSagas() {
  yield all([
    call(fetchCollectionsStart)
  ])
}
