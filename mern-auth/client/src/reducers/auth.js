import {
  LOAD_USER,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  LOG_OUT,
  AUTH_FAILED,
  LOGIN_FAILED,
  REGISTER_FAILED,
  SOME_ERROR
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token") || "",
  isAuthenticated: false,
  loading: true,
  user: {},
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOAD_USER:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true,
        loading: false
      };
    case REGISTER_FAILED:
    case LOGIN_FAILED:
    case AUTH_FAILED:
    case SOME_ERROR:
    case LOG_OUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: "",
        isAuthenticated: false,
        loading: true,
        error: payload,
        user: {}
      };
    default:
      return state;
  }
}
