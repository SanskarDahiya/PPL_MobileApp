import post from "./reducers/mypostReducer";
import postFilter from "./reducers/PostFilterReducer";
import zIndexFunction from "./reducers/zIndexReducer";
import { combineReducers, createStore } from "redux";

const reducers = combineReducers({
  post,
  zIndex: zIndexFunction,
  postFilter
});
export default createStore(reducers);
