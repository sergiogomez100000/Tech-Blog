const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers/');
const helpers = require('./utils/helpers');

//sequelize and session
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//initialize server
const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

//set up session
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};


//set handlebars as render engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));

//use routes
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
