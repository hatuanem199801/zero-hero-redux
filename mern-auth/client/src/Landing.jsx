import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Landing extends Component {
  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="landing">
        <h1>Landing Page</h1>
        <hr />
        <Link className="btn btn-primary rounded-pill w-25 mb-2" to="/login">
          Login
        </Link>
        <Link className="btn btn-primary rounded-pill w-25" to="/register">
          Register
        </Link>
      </div>
    );
  }
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
