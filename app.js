const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./config/connectDB');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const methodOverride = require('method-override');

const app = express();

// Passport Config
require('./config/passport')(passport);

// Connect to MongoDB
connectDB();

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }),
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Flash middleware
app.use(flash());

// Global variables middleware
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use(methodOverride('_method'));
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

// Listening PORT
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server started on port http://localhost:${PORT}`),
);
