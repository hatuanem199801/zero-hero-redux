# Todo List Preview Source Code

### Libray used in this project

```json
    "bootstrap": "^4.4.1",
    "react": "^16.12.0",
    "react-dom": "^16.12.0",
    "react-redux": "^7.1.3",
    "react-router-dom": "^5.1.2",
    "react-scripts": "3.3.0",
    "redux": "^4.0.5",
    "redux-devtools-extension": "^2.13.8",
    "redux-thunk": "^2.3.0"
```
### Project structure

```bash
> src
    actions
        index.js
        types.js
    components
        Footer.jsx
        Link.jsx
        Todo.jsx
        TodoList.jsx
    containers
        AddTodo.jsx
        FilterLink.jsx
        VisibleTodoList.jsx
    reducers
        index.js
        todos.js
        visibilityFilter.js
    App.css
    App.js
    index.js
```

### Create actions type
> actions/types.js

```js
export const ADD_TODO = "ADD_TODO";
export const SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER";
export const TOGGLE_TODO = "TOGGLE_TODO";
export const SHOW_ALL = "SHOW_ALL";
export const SHOW_COMPLETED = "SHOW_COMPLETED";
export const SHOW_ACTIVE = "SHOW_ACTIVE";
```

> actions/index.js

```js
import {
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_ACTIVE,
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER
} from "./types";

//declare simple id todo is 0
let nextTodoId = 0;

//func add todo with simple data is text:string
export const addTodo = text => ({
  type: ADD_TODO,
  id: nextTodoId++,
  text
});

//func filter todo with type filter const in types.js
export const setVisibilityFilter = filter => ({
  type: SET_VISIBILITY_FILTER,
  filter
});

//func change status todo with id todo
export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  id
});

//export funcs for filter todos
export const VisibilityFilters = {
  SHOW_ALL: SHOW_ALL,
  SHOW_COMPLETED: SHOW_COMPLETED,
  SHOW_ACTIVE: SHOW_ACTIVE
};
```

### Create reducers
> reducers/todos.js

```js
import { ADD_TODO, TOGGLE_TODO } from "../actions/types";

//default state is empty array
const todos = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
        //add new todo into first element in array
      return [
        {
          id: action.id,
          text: action.text,
          completed: false
        },
        ...state
      ];
      //change status todo
    case TOGGLE_TODO:
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
      //default is called state
    default:
      return state;
  }
};
export default todos;
```
> reducers/visibilityFilter.js
```js
import { VisibilityFilters } from "../actions";
import { SET_VISIBILITY_FILTER } from "../actions/types";

//default state is show_all constant
const visibilityFilter = (state = VisibilityFilters.SHOW_ALL, action) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
};

export default visibilityFilter;
```

> reducers/index.js

```js
import { combineReducers } from "redux";
import todos from "./todos";
import visibilityFilter from "./visibilityFilter";

export default combineReducers({
  todos,
  visibilityFilter
});

```

### Components

> components/Link.jsx

```js
import React from "react";
import PropTypes from "prop-types";

const Link = ({ active, children, onClick }) => (
  <button onClick={onClick} disabled={active} className="badge badge-pill ml-1">
    {children}
  </button>
);

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Link;
```

> components/Todo.jsx

```js
import React from "react";
import PropTypes from "prop-types";

const Todo = ({ onClick, completed, text }) => (
  <li
    onClick={onClick}
    style={{ textDecoration: completed ? "line-through" : "none" }}
    className={`list-group-item list-group-item-${
      completed ? "success" : "warning"
    }`}
  >
    {text}
  </li>
);

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
};

export default Todo;
```
> components/TodoList.jsx

```js
import React from "react";
import PropTypes from "prop-types";
import Todo from "./Todo";

const TodoList = ({ todos, toggleTodo }) => (
  <ul className="list-group">
    {todos.map(todo => (
      <Todo key={todo.TodoList} onClick={() => toggleTodo(todo.id)} {...todo} />
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  toggleTodo: PropTypes.func.isRequired
};

export default TodoList;

```
> components/Footer.jsx

```js
import React from "react";
import FilterLink from "../containers/FilterLink";
import { VisibilityFilters } from "../actions";

const Footer = () => (
  <div className="mt-2">
    <span>Show :</span>
    <FilterLink filter={VisibilityFilters.SHOW_ALL}>All</FilterLink>
    <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>Active</FilterLink>
    <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>Completed</FilterLink>
  </div>
);

export default Footer;
```

### Containers

> containers/AddTodo.jsx
```js
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
```
> containers/FilterLink.jsx
```js
import { connect } from "react-redux";
import { setVisibilityFilter } from "../actions";
import Link from "../components/Link";

const mapStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => dispatch(setVisibilityFilter(ownProps.filter))
});

export default connect(mapStateToProps, mapDispatchToProps)(Link);
```

> containers/VisibleTodoList.jsx

```js
import { connect } from "react-redux";
import { toggleTodo } from "../actions";
import TodoList from "../components/TodoList";
import { VisibilityFilters } from "../actions";

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos;
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(todo => todo.completed);
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(todo => !todo.completed);
    default:
      throw new Error("Unknow filter : " + filter);
  }
};

const mapStateToProps = state => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter)
});

const mapDispatchToProps = dispatch => ({
  toggleTodo: id => dispatch(toggleTodo(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
```

### Finally

> App.js

```js
import React, { Fragment } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AddTodo from "./containers/AddTodo";
import VisibleTodoList from "./containers/VisibleTodoList";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="container">
      <h1>Todo Redux</h1>
      <AddTodo />
      <VisibleTodoList />
      <Footer />
    </div>
  );
}

export default App;
```

> index.js

```js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const initialState = {};
const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

```