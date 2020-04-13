export const SETPOST = "ADDPOST";
export const UPDATEPOST = "UPDATEPOST";

export const setAllPost = (data) => {
  return {
    type: SETPOST,
    data: data,
  };
};
export const updatePostAtIndex = (data) => {
  return {
    type: UPDATEPOST,
    data: data,
  };
};
