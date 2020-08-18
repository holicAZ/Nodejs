export const firstmiddle = (req, res, next) => {
  console.log("middle");
  next();
};
