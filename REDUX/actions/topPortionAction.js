export const toogleTopPorton = val => {
  let data = false;
  if (val === "post" || val === "category") data = val;
  return { type: "topPortion", data };
};
