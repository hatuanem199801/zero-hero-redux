import {
  LOAD_USER,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  LOG_OUT,
  AUTH_FAILED,
  LOGIN_FAILED,
  REGISTER_FAILED,
  SOME_ERROR
} from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    let result = await axios.get("/api/auth");
    dispatch({
      type: LOAD_USER,
      payload: result.data
    });
  } catch (error) {
    dispatch({
      type: AUTH_FAILED,
      payload: error
    });
  }
};

export const login = formData => async dispatch => {
  try {
    let result = await axios.post("/api/auth", JSON.stringify(formData), {
      headers: {
        "Content-Type": "application/json"
      }
    });
    dispatch({
      type: LOGIN_SUCCESS,
      payload: result.data
    });
    dispatch(loadUser());
  } catch (error) {
    console.error(error);
    dispatch({
      type: LOGIN_FAILED,
      payload: error
    });
  }
};

export const logout = () => dispatch => {
  try {
    dispatch({
      type: LOG_OUT
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: SOME_ERROR,
      payload: error
    });
  }
};

export const register = formData => async dispatch => {
  try {
    let result = await axios.post("/api/user", JSON.stringify(formData), {
      headers: {
        "Content-Type": "application/json"
      }
    });
    dispatch({
      type: REGISTER_SUCCESS,
      payload: result.data
    });
    dispatch(loadUser());
  } catch (error) {
    console.error(error);
    dispatch({
      type: REGISTER_FAILED,
      payload: error
    });
  }
};
