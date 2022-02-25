import { all, call } from "redux-saga/effects";
import { fetchCollectionsStart } from "./shop/shop.sagas";

export default function* rootSaga() {
    // use "all" effect to run sagas concurrently
    yield all([
        call(fetchCollectionsStart)
    ])
}