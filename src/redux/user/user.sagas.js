import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { getDoc } from "firebase/firestore";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  auth,
  createUserProfileDocument,
  googleProvider,
} from "../../firebase/firebase.utils";
import { signInFailure, signInSuccess } from "./user.actions";
import { UserActionTypes } from "./user.types";

function* signInWithGoogle() {
  const { user } = yield signInWithPopup(auth, googleProvider);
  yield getSnapshotFromUserauth(user);
}

function* signInWithEmail({ payload: { email, password } }) {
  const { user } = yield signInWithEmailAndPassword(auth, email, password);
  yield getSnapshotFromUserauth(user);
}

function* getSnapshotFromUserauth(authUser) {
  try {
    const userRef = yield call(createUserProfileDocument, authUser);
    const userSnapshot = yield getDoc(userRef);
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart(emailAndPassword) {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* userSagas() {
  yield all([call(onGoogleSignInStart), call(onEmailSignInStart)]);
}
