import { ShopActionTypes } from "./shop.types";

export const updateCollections = (collectionsMap) => ({
    type: ShopActionTypes.UPDATE_COLLECTIONS,
    payload: collectionsMap
})

export const updateLoading = (loadingState) => ({
    type: ShopActionTypes.UPDATE_LOADING,
    payload: loadingState
})