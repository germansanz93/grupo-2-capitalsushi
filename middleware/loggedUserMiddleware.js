module.exports = (req, res, next) => {
  res.locals.isLogged = false;

  if(req.session.user){
    console.log(req.session.user)
    res.locals.isLogged = true;
    res.locals.user = req.session.user;
  }

  next();
}