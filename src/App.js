import React, { Component } from "react";
import "./App.css";
import HomePage from "./pages/home/homepage.component";
import { Routes, Route, Navigate } from "react-router-dom";
import ShopPage from "./pages/shop/shoppage.component";
import Header from "./components/header/header.component";
import Auth from "./pages/auth/auth.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { onSnapshot } from "firebase/firestore";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user.selector";
import CheckoutPage from "./pages/checkout/checkout.component";
import CollectionPage from "./pages/collection/collection.component";
import CollectionsOverview from "./components/collections-overview/collections-overview.component";
import WithSpinner from "./components/with-spinner/with-spinner.component";
import { selectIsCollectionFetching } from "./redux/shop/shop.selector";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class App extends Component {
  unSubscribeFromAuth = null;

  componentDidMount() {
    // shopCollectionsArray dispatch collections data to redux
    // const { setCurrentUser, shopCollectionsArray } = this.props;

    const { setCurrentUser } = this.props;
    this.unSubscribeFromAuth = onAuthStateChanged(
      auth,
      async (user) => {
        if (user) {
          // User is signed in
          const userDocRef = await createUserProfileDocument(user);

          // assign current user state the value of the resulting snapshop
          onSnapshot(userDocRef, (doc) => {
            setCurrentUser({
              id: doc.id,
              ...doc.data(),
            });
          });
        } else {
          // No user is signed in.
        }
        setCurrentUser(user);
        // createCollectionAndDocuments('collections', shopCollectionsArray.map(({title, items}) => ({title, items})))
      },
      (error) => {},
      (complete) => {
        // technically should never get called since auth state can always be changing indefinitely and may never complete
      }
    );
  }

  componentWillUnmount() {
    this.unSubscribeFromAuth();
  }

  logUserOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        this.setState({ currentUser: null });
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <Header logUserOut={this.logUserOut} />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />}>
            <Route
              index
              element={
                <CollectionsOverviewWithSpinner
                  isLoading={this.props.isCollectionFetching}
                />
              }
            />
            <Route
              exact
              path=":collectionId"
              element={
                <CollectionPageWithSpinner
                  isLoading={this.props.isCollectionFetching}
                />
              }
            />
          </Route>
          <Route exact path="/checkout" element={<CheckoutPage />} />
          <Route
            exact
            path="/auth"
            element={
              this.props.currentUser ? <Navigate replace to="/" /> : <Auth />
            }
          />
          {/* <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/recovery-password" element={<RecoveryPassword/>}/>
            <Route path="*" element={<NotFound/>}/> */}
        </Routes>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  isCollectionFetching: selectIsCollectionFetching,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
