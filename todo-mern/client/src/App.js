import React, { useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./containers/Layout";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Todos from "./containers/Todos";
import { Provider } from "react-redux";
import store from "./store";
import { loadTodo } from "./actions/todo";

function App() {
  useEffect(() => {
    store.dispatch(loadTodo());
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Todos />
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
