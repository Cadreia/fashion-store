import React, { Component } from "react";
import "./App.css";
import HomePage from "./pages/home/homepage.component";
import { Routes, Route, Navigate } from "react-router-dom";
import ShopPage from "./pages/shop/shoppage.component";
import Header from "./components/header/header.component";
import Auth from "./pages/auth/auth.component";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user.selector";
import CheckoutPage from "./pages/checkout/checkout.component";
import { selectIsCollectionLoaded } from "./redux/shop/shop.selector";
import CollectionsOverviewContainer from "./components/collections-overview/collections-overview.container";
import CollectionPageContainer from "./pages/collection/collection.container";
import { checkUserSession } from "./redux/user/user.actions";

class App extends Component {
  unSubscribeFromAuth = null;

  componentDidMount() {
    const { checkUserSession } = this.props;
    checkUserSession();
  }

  componentWillUnmount() {
    this.unSubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />}>
            <Route index element={<CollectionsOverviewContainer />} />
            <Route
              exact
              path=":collectionId"
              element={<CollectionPageContainer />}
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
  isCollectionsLoaded: selectIsCollectionLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
