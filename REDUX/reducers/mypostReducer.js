import { SETPOST, UPDATEPOST } from "../actions/mypostAction";

const initialState = {
  data: [],
};
const post = (state = initialState, action) => {
  switch (action.type) {
    case SETPOST:
      console.log("setting post", action.data.length);
      return {
        data: action.data,
      };
    case UPDATEPOST:
      let newdata = state.data.map((val) => {
        if (val._id === action.data._id) {
          return action.data;
        }
        return val;
      });
      return {
        ...state,
        data: newdata,
      };
    default:
      return state;
  }
};

export default post;
