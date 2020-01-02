import {
  FETCH_TODO,
  ADD_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  NEXT_PAGE,
  PREVIOUS_PAGE,
  TODO_FAILED
} from "../actions/types";

const initialState = {
  todos: [],
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_TODO:
      return {
        ...state,
        todos: payload
      };
    case ADD_TODO:
      return {
        ...state,
        todos: [payload, ...state.todos]
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo._id !== payload._id)
      };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo._id === payload._id) {
            todo.isDelete = !todo.isDelete;
          }
          return todo;
        })
      };
    case TODO_FAILED:
      return {
        ...state,
        todos: [],
        error: payload
      };
    default:
      return state;
  }
}
