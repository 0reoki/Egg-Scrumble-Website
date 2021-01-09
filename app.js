const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser, viewProduct } = require('./middleware/middleware');
const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = "mongodb+srv://Admin:Admin@eggbook.y0biq.mongodb.net/eggbook_db?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
//app.get('/?=*', viewBook);
app.get('/book', viewProduct);
app.get('/', (req, res) => res.render('index', { title: 'Home' }));
app.get('/bookmarks', requireAuth, (req, res) => res.render('bookmarks', { title: 'Bookmarks' }));
app.get('/owned', requireAuth, (req, res) => res.render('owned', { title: 'Owned' }));
app.use(routes);