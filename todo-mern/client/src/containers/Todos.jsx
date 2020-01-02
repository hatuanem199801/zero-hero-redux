import React, { Component } from "react";
import Pagination from "../components/Pagination";
import TodoItem from "../components/TodoItem";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { toggleTodo, deleteTodo } from "../actions/todo";

class Todos extends Component {
  handleOnDelete = todo => {
    this.props.deleteTodo(todo);
  };

  handleOnToggle = todo => {
    this.props.toggleTodo(todo);
  };

  render() {
    const todoLoading =
      this.props.todos.length > 0 ? (
        this.props.todos.map(todo => (
          <TodoItem
            onDelete={this.handleOnDelete}
            onToggle={this.handleOnToggle}
            key={todo._id}
            todo={todo}
          />
        ))
      ) : (
        <p>Loading ...</p>
      );
    return (
      <div className="main">
        <div className="todos">
          {this.props.todos.length !== 0 ? (
            todoLoading
          ) : (
            <p>Nothing in your todo</p>
          )}
        </div>
        <div className="page mt-2">
          <Pagination />
        </div>
      </div>
    );
  }
}

Todos.propTypes = {
  todos: PropTypes.array.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  todos: state.todo.todos
});

const mapDispatchToProps = dispatch => ({
  toggleTodo: todo => dispatch(toggleTodo(todo)),
  deleteTodo: todo => dispatch(deleteTodo(todo))
});

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
