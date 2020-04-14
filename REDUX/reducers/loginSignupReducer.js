import {
  UserSearching,
  UserLoggedIn,
  UserLoggedOut,
} from "../actions/loginSingupAction";

const initialState = {
  isSearching: true,
};

const loginAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case UserSearching:
      return {
        isSearching: true,
      };

    case UserLoggedIn:
      return {
        isSearching: false,
        isAllowed: true,
        userData: action.data,
      };

    case UserLoggedOut:
      return {
        isSearching: false,
        isAllowed: false,
        userData: {},
      };

    default:
      return state;
  }
};

export default loginAuthReducer;
