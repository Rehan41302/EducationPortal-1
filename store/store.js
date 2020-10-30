import rootReducer from "./reducers";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";

let composeEnhancers = compose;

const store = createStore(
  rootReducer,
  // initialState,
  composeEnhancers(
    applyMiddleware(thunk) //Applying redux-thunk middleware
  )
);
export default store;
