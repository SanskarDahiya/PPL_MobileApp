import post from "./reducers/mypostReducer";
import postFilter from "./reducers/PostFilterReducer";
import zIndexFunction from "./reducers/zIndexReducer";
import { combineReducers, createStore } from "redux";
import loginAuthReducer from "./reducers/loginSignupReducer";

const reducers = combineReducers({
  post,
  postFilter,
  loginAuthReducer,
  zIndex: zIndexFunction,
});
export default createStore(reducers);
