import React, { Component } from "react";
import { connect } from "react-redux";
import { Outlet } from "react-router-dom";
import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions";

class ShopPage extends Component {

  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync()
  }
  render() {
    return (
      <div className="shop-page">
        <Outlet />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStartAsync: () =>
    dispatch(fetchCollectionsStartAsync()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
