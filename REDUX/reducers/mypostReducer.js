import { ADDPOST } from "../actions/mypostAction";

const initialState = {
  data: []
};
const post = (state = initialState, action) => {
  switch (action.type) {
    case ADDPOST:
      return {
        ...state,
        data: [...data, action.data]
      };

    default:
      return state;
  }
};

export default post;
