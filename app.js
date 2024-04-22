const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const path = require("path");
//
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
//

const Signup = require('./models/Signup');
const authController = require('./controllers/authController');
const ResidentialRent = require('./controllers/Residential_rent');
const ResidentialSale = require('./controllers/Residential_sale');
const Residentialflatmates = require('./controllers/Residential_flatmates');
const Plotsale = require('./controllers/Plot_sale');
const Plotdev = require('./controllers/Plot_dev');
const Commercialrent = require('./controllers/Commercial_rent');
const Commercialsale = require('./controllers/Commercial_sale');
const Property_Listings = require('./controllers/Property_Listings');
const Property_Details = require('./controllers/Property_Details');
const Reviews = require('./controllers/Reviews');

const app = express();
const port = 6011;

mongoose.connect('mongodb://localhost:27017/DreamSpaces');

//
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
//

app.use(passport.initialize());
app.use(passport.session());

// Configure Passport with local strategy
passport.use('local',new LocalStrategy({usernameField:"l_email",passwordField:"l_password"},
  async function (l_email, l_password, done,err) {
    // Find user by username and verify password
    const user = await Signup.findOne({ email: l_email });
      //if (err) { return done(err); }
      if (!user) { return done(null, false); }
      const match = await bcrypt.compare(l_password, user.password);
      if (!match) { return done(null, false); }
      return done(null, user);
  }
));

// Serialize user into session
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async function(id, done) {
    const user =  await Signup.findOne({_id: id});
    done(null, user);

});


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Routes for login and registration
app.post('/login',function(req,res,next){ next();} ,passport.authenticate('local', { successRedirect: '/index', failureRedirect: '/login' }));
app.post('/register', authController.register);
app.post('/residential_rent', ResidentialRent.residentialRent);
app.post('/residential_sale', ResidentialSale.residentialSale);
app.post('/residential_flatmates', Residentialflatmates.residentialflatmates);
app.post('/Plot_sale', Plotsale.plotSale);
app.post('/Plot_dev', Plotdev.plotDev);
app.post('/Commercial_rent', Commercialrent.commercialRent);
app.post('/Commercial_sale',Commercialsale.commercialSale);
app.post('/property_listings', Property_Listings.property_listings);
app.post('/property_details', Property_Details.property_details);
app.post('/property_review', Reviews.review );


// Homepage route
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/property_listings', (req, res) => {
    res.render('property_listings', { property: '' });
});
app.get('/property_details', (req, res) => {
    res.render('property_details');
});
app.get('/index', (req, res) => {
    res.render('index');
});
app.get('/in_dex', isAuthenticated, (req, res) => {
    res.render('property_listings', { property: '' });
})
app.get('/post_your_property', isAuthenticated, (req, res) => {
    res.render('post_your_property');
});
app.get('/notification', isAuthenticated, (req, res) => {
    res.render('notification');
});
app.get('/message', (req, res) => {
    res.render('message');
});
app.get('/user_details', isAuthenticated, (req, res) => {
    res.render('user_details');
});
app.get('/login', (req, res) => {
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

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
}

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
})