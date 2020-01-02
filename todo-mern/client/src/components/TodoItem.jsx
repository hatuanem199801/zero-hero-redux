import React from "react";

const TodoItem = ({ todo, onDelete, onToggle }) => {
  const classToggle =
    todo.isDelete || todo.isDelete ? "outline-dark" : "primary";

  const handleOnCofirmDelete = () => {
    const result = window.confirm("Are you sure delete this todo ?");
    if (result) {
      onDelete(todo);
    }
  };
  return (
    <div className="todo">
      <div className="todo-title">
        <h5>{todo.text}</h5>
        <p>{new Date(todo.date_created).toLocaleString()}</p>
        <button
          className={`btn btn-sm btn-${classToggle} mr-2`}
          onClick={() => onToggle(todo)}
        >
          {todo.isDelete ? "completed" : "not completed"}
        </button>
        <button
          onClick={handleOnCofirmDelete}
          className="btn btn-sm btn-outline-danger"
        >
          delete
        </button>
      </div>
      <hr />
    </div>
  );
};
export default TodoItem;
