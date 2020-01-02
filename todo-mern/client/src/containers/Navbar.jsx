import React, { Component } from "react";
import { connect } from "react-redux";
import { addTodo } from "../actions/todo";
import PropTypes from "prop-types";

class Navbar extends Component {
  state = {
    text: ""
  };

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleOnSubmit = e => {
    e.preventDefault();
    if (this.state.text.trim() !== "") {
      this.props.addTodo(this.state);
      this.setState({
        text: ""
      });
    }
  };

  render() {
    return (
      <nav className="navbar shadow">
        <div className="container">
          <h1 className="navbar-brand">Todo Mern</h1>
          <form
            onSubmit={this.handleOnSubmit}
            className="d-flex align-items-baseline"
          >
            <input
              type="text"
              name="text"
              id="text"
              className="form-control rounded-pill"
              onChange={this.handleOnChange}
              value={this.state.text}
            />
            <button type="submit" className="btn btn-dark btn-sm rounded-pill">
              add
            </button>
          </form>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  addTodo: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  addTodo: todo => dispatch(addTodo(todo))
});

export default connect(null, mapDispatchToProps)(Navbar);
