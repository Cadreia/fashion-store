import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { getDoc } from "firebase/firestore";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  auth,
  createUserProfileDocument,
  googleProvider,
} from "../../firebase/firebase.utils";
import {
  emailSignInFailure,
  emailSignInSuccess,
  googleSignInFailure,
  googleSignInSuccess,
} from "./user.actions";
import { UserActionTypes } from "./user.types";

function* signInWithGoogle() {
  try {
    const { user } = yield signInWithPopup(auth, googleProvider);
    const userRef = yield call(createUserProfileDocument, user);
    const userSnapshot = yield getDoc(userRef);
    yield put(
      googleSignInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
    );
  } catch (error) {
    yield put(googleSignInFailure(error));
  }
}

function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield signInWithEmailAndPassword(auth, email, password);
    const userRef = yield call(createUserProfileDocument, user);
    const userSnapshot = yield getDoc(userRef);
    yield put(
      emailSignInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
    );
  } catch (error) {
    yield put(emailSignInFailure(error));
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
