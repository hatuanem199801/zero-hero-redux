import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "./actions/user";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <h1>Home Page</h1>
        {this.props.isAuthenticated && (
          <div className="text-center">
            <h5>{this.props.user.fullName || ""}</h5>
            <h5>{this.props.user.email || ""}</h5>
            <h5>
              {new Date(this.props.user.date_create).toLocaleString() || ""}
            </h5>
          </div>
        )}
        <hr />
        <Link onClick={() => this.props.logout()} to="/login">
          Log out
        </Link>
      </div>
    );
  }
}

Landing.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
