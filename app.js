//Mongoose connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/video');
const session = require('express-session');
const MongoStore = require("connect-mongo")(session);

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();

//handlebars middlewares
const hbs = require('express-handlebars');
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'main', layoutsDir: __dirname + '/views/layout/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//body & cookie parser middlewares
app.use(cookieParser());
app.use( bodyParser.json() );      
app.use(bodyParser.urlencoded({
  extended: true
})); 

//static
app.use(express.static('public'));

//session use
app.use(session({
  secret: "basic-auth-secret",
  cookie: { maxAge: 600000 },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60
  })
}));

//load routes
var routesCreate = require('./routes/movieCreate');
var routesSearch = require('./routes/movieSearch');
var routesLogin = require('./routes/login');
var routesRegister = require('./routes/register');
var routesLogout = require('./routes/logout');
var routesCreateCeleb = require('./routes/celebCreate');
var routesSearchCeleb = require('./routes/celebSearch');

// Implement the routes
app.use("/add-movie", routesCreate);
app.use("/find-movie", routesSearch);
app.use("/login", routesLogin);
app.use("/register", routesRegister);
app.use("/logout", routesLogout);
app.use("/add-celebrities", routesCreateCeleb);
app.use("/find-celebrities", routesSearchCeleb);


app.listen(4000);