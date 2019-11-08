import { createStore, applyMiddleware, compose } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import combinedReducers from "../reducers/combinedReducers";
import { AppActions } from "../types/actions";

export type AppState = ReturnType<typeof combinedReducers>;

const store = createStore(
  combinedReducers,
  compose(
    applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
  )
);

export default store;
