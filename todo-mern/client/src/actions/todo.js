import {
  FETCH_TODO,
  ADD_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  NEXT_PAGE,
  PREVIOUS_PAGE,
  TODO_FAILED
} from "./types";
import axios from "axios";

export const loadTodo = (page = 1) => async dispatch => {
  try {
    let result = await axios.get("/api/todo/" + page);
    dispatch({
      type: FETCH_TODO,
      payload: result.data
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: TODO_FAILED,
      payload: error
    });
  }
};

export const addTodo = todo => async dispatch => {
  const newTodo = {
    text: todo.text
  };
  const body = JSON.stringify(newTodo);
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    let result = await axios.post("/api/todo", body, config);
    dispatch({
      type: ADD_TODO,
      payload: result.data
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: TODO_FAILED,
      payload: error
    });
  }
};

export const toggleTodo = todo => async dispatch => {
  const body = JSON.stringify(todo);
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    let result = await axios.patch("/api/todo", body, config);
    dispatch({
      type: TOGGLE_TODO,
      payload: result.data
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: TODO_FAILED,
      payload: error
    });
  }
};

export const deleteTodo = todo => async dispatch => {
  const body = JSON.stringify(todo);
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    let result = await axios.delete("/api/todo", body, config);
    dispatch({
      type: DELETE_TODO,
      payload: result.data
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: TODO_FAILED,
      payload: error
    });
  }
};
