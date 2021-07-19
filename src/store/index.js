import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import addUserReducer from "./reducers/userReducer";
import thunk from 'redux-thunk';
import { addFilmsReducer } from "./reducers/filmsReducer";
import { chengePaginationReducer } from "./reducers/paginationReduser";
import { chengeFilterReducer } from "./reducers/filterReducer";

const rootReducer = combineReducers({
  users: addUserReducer,
  films: addFilmsReducer,
  buttons: chengePaginationReducer,
  filter: chengeFilterReducer,
});

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(
      thunk
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

export default store;