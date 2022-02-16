import React, { Component } from "react";
import { connect } from "react-redux";
import { Outlet } from "react-router-dom";
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";

class ShopPage extends Component {

  componentDidMount() {
    const { fetchCollectionsStart } = this.props;
    fetchCollectionsStart()
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
  fetchCollectionsStart: () =>
    dispatch(fetchCollectionsStart()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
