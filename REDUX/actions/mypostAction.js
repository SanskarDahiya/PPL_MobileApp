export const ADDPOST = "ADDPOST";
export const ADDALLPOST = "ADDALLPOST";

export const addShowPost = data => {
  return {
    type: ADDPOST,
    data: data
  };
};
export const addAllPost = data => {
  return {
    type: ADDALLPOST,
    data: data
  };
};
