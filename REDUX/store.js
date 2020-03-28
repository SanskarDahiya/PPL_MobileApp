import post from "./reducers/mypostReducer";
import topPortion from "./reducers/topPortionReducer";
import zIndexFunction from "./reducers/zIndexReducer";
import { combineReducers, createStore } from "redux";

const reducers = combineReducers({
  post,
  zIndex: zIndexFunction,
  topPortion
});
export default createStore(reducers);
