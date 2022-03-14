import { all, call } from "redux-saga/effects";
import { fetchCollectionsStart } from "./shop/shop.sagas";
import { userSagas } from "./user/user.sagas";

export default function* rootSaga() {
    // use "all" effect to run sagas concurrently
    yield all([
        call(fetchCollectionsStart), call(userSagas)
    ])
}