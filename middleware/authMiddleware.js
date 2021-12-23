module.exports = (req, res, next) => {
  if(!req.session.user){
    console.log(req.session)
    return res.redirect('/usuario/ingresar');
  }
  next();
}