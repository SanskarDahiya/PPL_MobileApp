import { ZINDEX } from "../actions/zIndexAction";
const initialState = {
  value: -1
};
const zIndexFunction = (state = initialState, action) => {
  switch (action.type) {
    case ZINDEX:
      return {
        value: action.data
      };
    default:
      return state;
  }
};

export default zIndexFunction;
