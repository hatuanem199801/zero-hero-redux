import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { register } from "./actions/user";
import PropTypes from "prop-types";

class Register extends Component {
  state = {
    email: "",
    password: "",
    confirmPassword: "",
    fullName: ""
  };
  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleOnSubmit = e => {
    e.preventDefault();
    if (
      this.state.email &&
      this.state.password &&
      this.state.confirmPassword &&
      this.state.password.trim().toLocaleLowerCase() ===
        this.state.confirmPassword.trim().toLocaleLowerCase()
    ) {
      this.props.register(this.state);
      this.setState({
        email: "",
        password: "",
        confirmPassword: "",
        fullName: ""
      });
    }
  };
  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/home" />;
    }
    return (
      <div className="landing">
        <h1>Register</h1>
        <hr />
        <form onSubmit={this.handleOnSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">fullName</label>
            <input
              type="text"
              name="fullName"
              onChange={this.handleOnChange}
              value={this.state.fullName}
              className="form-control"
              required
            />
          </div>
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
          <div className="form-group">
            <label htmlFor="confirmPassword">confirmPassword</label>
            <input
              type="password"
              name="confirmPassword"
              onChange={this.handleOnChange}
              value={this.state.confirmPassword}
              className="form-control"
            />
          </div>
          <div className="form-group text-center">
            <button
              onClick={this.handleOnSubmit}
              type="submit"
              className="btn btn-lg btn-primary"
            >
              Submit
            </button>
            <Link to="/">back to landing</Link>
          </div>
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  register: data => dispatch(register(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
