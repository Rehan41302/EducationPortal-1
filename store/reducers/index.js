import { combineReducers } from "redux";
import authReducer from "./authReducer";
import tutorReducer from "./tutorReducer";

export default combineReducers({
  authReducer,
  tutorReducer,
});
