import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducers from "./reducers";
const middleware = [thunk];
const intialState = {};

const store = createStore(
  rootReducers,
  intialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
