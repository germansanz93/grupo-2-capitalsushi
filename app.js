//modulos de terceros
const express = require('express');
const path = require('path');
const morgan = require('morgan');

//modulos propios
const mainRouter =require('./routes/mainRouter');
const userRouter = require('./routes/userRouter');

//configs
const app = express();
const PORT = 5000;
const publicPath = path.join(__dirname, '/public');
app.use(express.static(publicPath));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(morgan('dev'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//rutas
app.use('/', mainRouter)
app.use('/user', userRouter)

//server escuchando
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`)
})