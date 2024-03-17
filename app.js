const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require("path");
const authController = require('./controllers/authController');

const app = express();
const port = 6001;

mongoose.connect('mongodb://localhost:27017/DreamSpaces', { useNewUrlParser: true, useUnifiedTopology: true });


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Routes for login and registration
app.post('/login', authController.login);
app.post('/register', authController.register);

// Homepage route
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/property_listings', (req, res) => {
    res.render('property_listings');
});
app.get('/property_details', (req, res) => {
    res.render('property_details');
});
app.get('/index', (req, res) => {
    res.render('index');
});
app.get('/post_your_property', (req, res) => {
    res.render('post_your_property');
});
app.get('/notification', (req, res) => {
    res.render('notification');
});
app.get('/message', (req, res) => {
    res.render('message');
});
app.get('/user_details', (req, res) => {
    res.render('user_details');
});
app.get('/login_signup', (req, res) => {
    res.render('login_signup');
});
app.get('/commercial_rent', (req, res) => {
    res.render('commercial_rent');
});
app.get('/commercial_sale', (req, res) => {
    res.render('commercial_sale');
});

app.get('/residential_flatmates', (req, res) => {
    res.render('residential_flatmates');
});
app.get('/residential_rent', (req, res) => {
    res.render('residential_rent');
});
app.get('/residential_sale', (req, res) => {
    res.render('residential_sale');
});
app.get('/plot_dev', (req, res) => {
    res.render('plot_dev');
});
app.get('/plot_sale', (req, res) => {
    res.render('plot_sale');
});

// Error route
app.get('/error', (req, res) => {
    res.render('error', { error: 'Something went wrong!' });
});


app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
})