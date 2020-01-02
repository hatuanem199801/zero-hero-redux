import React, { Component, Fragment } from "react";
import Navbar from "../containers/Navbar";
class Layout extends Component {
  render() {
    return (
      <Fragment>
        <Navbar />
        <div className="container mt-4">{this.props.children}</div>
      </Fragment>
    );
  }
}

export default Layout;
