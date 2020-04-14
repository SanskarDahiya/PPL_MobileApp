export const UserLoggedOut = "USER_";
export const UserLoggedIn = "USER_PROFILE";
export const UserSearching = "USER_Search";

export const userLoggedOutAction = () => {
  return {
    type: UserLoggedOut,
  };
};
export const userSearchingAction = () => {
  return {
    type: UserSearching,
  };
};

export const userLoggedInAction = (data) => {
  console.log(data, "<><> <><> <><> <><> LOGIN_REDUCER");

  return {
    type: UserLoggedIn,
    data,
  };
};
