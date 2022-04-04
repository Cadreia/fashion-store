import { all, call } from "redux-saga/effects";
import { cartSagas } from "./cart/cart.sagas";
import { shopSagas } from "./shop/shop.sagas";
import { userSagas } from "./user/user.sagas";

export default function* rootSaga() {
    // use "all" effect to run sagas concurrently
    yield all([
        call(shopSagas), call(userSagas), call(cartSagas)
    ])
}