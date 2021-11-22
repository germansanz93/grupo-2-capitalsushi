//modulos de terceros
const express = require('express');
const path = require('path');

//modulos propios
const mainRouter =require('./routes/mainRouter');

//configs
const app = express();
const PORT = 5000;
const publicPath = path.join(__dirname, '/public');
app.use(express.static(publicPath));
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//rutas
app.use('/', mainRouter)

//server escuchando
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`)
})