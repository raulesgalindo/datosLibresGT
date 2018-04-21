var indexRouter = require('./routes/index'),
    mongoRouter = require('./routes/mongo'),
    colaboradoresRouter = require('./routes/colaboradores'),
    cookieParser = require('cookie-parser'),
    createError = require('http-errors'),
    bodyParser = require('body-parser'),
    express = require('express'),
    logger = require('morgan'),
    path = require('path'),
    app = express();


// view engine setup

app.engine('pug', require('pug').__express)
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "pug");


app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname + '/public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/db', mongoRouter);
app.use('/colaboradores', colaboradoresRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next();
});

// error handler
app.use(function (err, req, res, next) {
// set locals, only providing error in development
res.locals.message = err.message;
res.locals.error = req.app.get('env') === 'development' ? err : {};

// render the error page
//res.status(err.status || 500);
//res.render('error');
console.log(err);

});


module.exports = app;
