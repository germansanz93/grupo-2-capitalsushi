module.exports = (req, res, next) => {
  res.locals.isAdmin = false;

  if(req.session.user && req.session.user.role_id == 1){
    res.locals.isAdmin = true;
    res.locals.user = req.session.user;
  } else {
    return res.redirect('/user/login');
  }

  next();
}