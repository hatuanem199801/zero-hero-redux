import React, { Component } from "react";
import { loadTodo } from "../actions/todo";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Pagination extends Component {
  hanleOnPage = e => {
    const page = e.target.getAttribute("data-page");
    this.props.loadTodo(page);
  };
  render() {
    return (
      <nav aria-label="Page navigation ">
        <ul className="pagination pagination-sm">
          <li className="page-item">
            <a className="page-link" href="#!">
              {"<"}
            </a>
          </li>
          <li className="page-item">
            <a
              onClick={this.hanleOnPage}
              data-page="1"
              className="page-link"
              href="#!"
            >
              1
            </a>
          </li>
          <li className="page-item">
            <a
              onClick={this.hanleOnPage}
              data-page="2"
              className="page-link"
              href="#!"
            >
              2
            </a>
          </li>
          <li className="page-item">
            <a
              onClick={this.hanleOnPage}
              data-page="3"
              className="page-link"
              href="#!"
            >
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#!">
              {">"}
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

Pagination.propTypes = {
  loadTodo: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  loadTodo: page => dispatch(loadTodo(page))
});

export default connect(null, mapDispatchToProps)(Pagination);
