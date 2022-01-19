import { initializeApp } from "firebase/app";
import {
  writeBatch,
  doc,
  getDoc,
  setDoc,
  collection,
  getFirestore,
} from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const config = {
  apiKey: "AIzaSyAoIpJODD_sNFWjtRVFL4zf1ujf7NpIxjQ",
  authDomain: "ladda-store.firebaseapp.com",
  projectId: "ladda-store",
  storageBucket: "ladda-store.appspot.com",
  messagingSenderId: "980174304099",
  appId: "1:980174304099:web:bc2fb18d33200c89e69956",
  measurementId: "G-R3WSPNCT67",
};

initializeApp(config);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  login_hint: "user@example.com",
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // The signed-in user info.
      // const user = result.user;
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // The email of the user's account used.
      // const email = error.email;
      // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

// store specific properties from firebase user object in firestore
export const db = getFirestore();
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  const userDocSnap = await getDoc(userDocRef);

  console.log(userDocSnap);

  if (userDocSnap.exists()) {
    // log data to console
    console.log("Document data:", userDocSnap.data());
  } else {
    // create a new user document object
    console.log("User doen't exist. Will create.");
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      // Add a new document in collection "users"
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {}
  }
  return userDocRef;
};

export const createCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const shopCollectionRef = collection(db, collectionKey);
  // const shopCollectionSnap = await getDocs(shopCollectionRef)
  // shopCollectionSnap.forEach((doc) => {
  //   console.log(doc.id, " => ", doc.data());
  // });

  // Make a batch request
  const batch = writeBatch(db);
  objectsToAdd.forEach((obj) => {
    console.log(obj.title);
    // let firestore generate random id for docRef
    const newDocRef = doc(shopCollectionRef);
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const transformCollectionsSnapshotToMap = (collections) => {
  const collectionsArray = []
  collections.forEach(doc => {
    const {title, items} = doc.data()
    collectionsArray.push({
      id: doc.id,
      routeName: encodeURI(title.toLowerCase()),
      title,
      items
    })
  });

  // convert collectionsArray structure to object with key:value pairs
  // key is collection title, value is entire collection  
  return collectionsArray.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection
    return accumulator
  }, {})
};
