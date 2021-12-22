module.exports = (req, res, next) => {
  console.log('guest M')
  if(req.session && req.session.user){
    return res.redirect('/home');
  }
  next();
}