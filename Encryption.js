const hash = require("hash.js");

export const getHash = data => {
  return hash
    .sha256()
    .update(data)
    .digest("hex");
};

export const compareHash = (data, hash_) => {
  return (
    hash_ ===
    hash
      .sha256()
      .update(data)
      .digest("hex")
  );
};
