//modulos de terceros
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const {secret} = require('./config/config');
const cors = require('cors');
const methodOverride = require("method-override");

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

//modulos propios
const productRouter = require('./routes/productRouter');
const mainRouter =require('./routes/mainRouter');
const userRouter = require('./routes/userRouter');
const orderRouter = require('./routes/orderRouter');
const apiRouter = require('./routes/apiRouter');
const loggedUserMiddleware = require('./middleware/loggedUserMiddleware');

//configs
const app = express();
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(session({
  secret,
  resave: false,
  saveUninitialized: false
}))
app.use(loggedUserMiddleware);
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//rutas
app.use('/user', userRouter)
app.use('/product', productRouter)
app.use('/order', orderRouter)
app.use('/api', apiRouter)
app.use('/', mainRouter)


//server escuchando
port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server running at port ${port}`)
})