export const firstmiddle = (req, res, next) => {
  var isLogined;
  console.log("middle console test");
  console.log(req.isAuthenticated());
  if(req.isAuthenticated()){
    isLogined = true;
  }
  else{
    isLogined = false;
  } 
  next();
};
