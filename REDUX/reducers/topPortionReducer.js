const initialState = {
  value: false
};
const topPortion = (state = initialState, action) => {
  switch (action.type) {
    case "topPortion":
      return { ...state, value: action.data };

    default:
      return state;
  }
};

export default topPortion;
