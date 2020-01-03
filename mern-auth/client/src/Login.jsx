import React, { Component } from "react";

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
      console.log(this.state);
    }
  };
  render() {
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
          <div className="form-group">
            <button
              onClick={this.handleOnSubmit}
              type="submit"
              className="btn btn-lg btn-primary"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
