var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const auth = require('./middlewares/auth');
const usuarioController = require('./routes/apiv1/usuarios');

// requerimos el archivo de conexión creado para conectar con la BD y el modelo de Anuncio
require('./lib/connectMongoose');
require('./models/Anuncio');
require('./models/Usuario');
require('./models/Tags');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//ficheros estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(function(req, res, next){
  console.log("Soy un middleware, y estoy evaluando la petición", req.originalUrl);
  next(); 
});

// Rutas de nuestra Api
app.use('/',               require('./routes/index'));
app.use('/apiv1/anuncios',  require('./routes/apiv1/anuncios'));
app.use('/apiv1/tags', require('./routes/apiv1/tags'));
app.post('/apiv1/registroUsuario', usuarioController.registroUsuario);
app.post('/apiv1/loginUsuario', usuarioController.loginUsuario);
app.get('/apiv1/private', auth, function(req, res){
  res.status(200).send({message: 'Tienes acceso a la API' });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);

  if(isAPI(req)){
    res.json({success: false, error: err.message});
    return;
  }
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.render('error');
});

function isAPI(req){
  return req.originalUrl.indexOf('/apiv') === 0;
}

module.exports = app;
