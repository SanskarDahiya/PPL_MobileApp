const initialState = {
  filter: {
    filter: "createdDate",
    offset: 0,
  },
};
const postFilter = (state = initialState, action) => {
  switch (action.type) {
    case "postfilter":
      return { ...state, filter: action.data };
    default:
      return state;
  }
};

export default postFilter;
