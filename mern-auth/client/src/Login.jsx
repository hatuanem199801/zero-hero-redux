import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "./actions/user";
import PropTypes from "prop-types";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };
  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleOnSubmit = e => {
    e.preventDefault();
    if (this.state.email && this.state.password) {
      this.props.login(this.state);
      this.setState({
        email: "",
        password: ""
      });
    }
  };
  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/home" />;
    }
    return (
      <div className="landing">
        <h1>Login</h1>
        <hr />
        <form onSubmit={this.handleOnSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              onChange={this.handleOnChange}
              value={this.state.email}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              onChange={this.handleOnChange}
              value={this.state.password}
              className="form-control"
              required
            />
          </div>
          <div className="form-group text-center">
            <button
              onClick={this.handleOnSubmit}
              type="submit"
              className="btn btn-sm btn-primary w-25"
            >
              Submit
            </button>
            <hr />
            <Link to="/">back to landing</Link>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  login: data => dispatch(login(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
