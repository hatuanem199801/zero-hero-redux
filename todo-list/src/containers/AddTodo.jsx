import React from "react";
import { connect } from "react-redux";
import { addTodo } from "../actions";

const AddTodo = ({ dispatch }) => {
  let input;
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!input.value.trim()) {
            return;
          }
          dispatch(addTodo(input.value));
          input.value = "";
        }}
      >
        <div className="form-group">
          <input
            ref={node => (input = node)}
            type="text"
            name="text"
            id="text"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-dark btn-sm">
            Add todo
          </button>
        </div>
      </form>
    </div>
  );
};

export default connect()(AddTodo);
