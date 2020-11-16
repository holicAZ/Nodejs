export const firstmiddle = (req, res, next) => {
  var isLogined = false;
  console.log(req.isAuthenticated());
  if(req.isAuthenticated()){
    isLogined = true;
  }
  else{
    isLogined = false;
  }
  req.isLogined = isLogined;
  console.log("middle");
  next();
};
