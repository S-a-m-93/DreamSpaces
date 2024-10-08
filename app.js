const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const path = require("path");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const multer = require('multer');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const adminController = require('./controllers/adminController');
const adminDashboardController = require('./controllers/admin_dashboard');
const Signup = require('./models/Signup');
const admin_login = require('./models/admin_login');
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
const Logout = require('./controllers/Logout');
const HomeSearch = require('./controllers/Home_Search');
const userDetails = require('./controllers/UserDetails');
const Change_Password = require('./controllers/Change_Password');
const saveProperty = require('./controllers/save_property');
const reportPage = require('./controllers/report');
const homePage = require('./controllers/homePage');
const admin_logout = require('./controllers/admin_logout');
const admin_changepassword = require('./controllers/admin_changepassword');
const updateUserDetails = require('./controllers/updateMyDetails');
const DeleteAccount = require('./controllers/deleteAccount');
const contactController = require('./controllers/contactController');
const { profile } = require('console');
const app = express();
const port = 6011;

mongoose.connect('mongodb://localhost:27017/DreamSpaces');

//
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
//

app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

// Configure Passport with local strategy
passport.use('local_userLogin',new LocalStrategy({usernameField:"l_email",passwordField:"l_password"},
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

// For admin
// Configure Passport with local strategy
// Configure Passport with local strategy for admin login
passport.use('local_adminLogin', new LocalStrategy({ usernameField: "adminEmail", passwordField: "adminPassword" },
  async function (adminEmail, adminPassword, done) {
      // Find admin user by email
      const admin = await admin_login.findOne({ email: adminEmail });
      if (!admin) {
        // Admin user not found
        return done(null, false);
      }
      // Compare passwords
      const passwordMatch = await bcrypt.compare(adminPassword, admin.password);
      if (!passwordMatch) {
        // Incorrect password
        return done(null, false);
      }
      // Authentication successful, return admin user
      return done(null, admin);
  }
));

// passport.serializeUser(function(admin, done) {
//     // Serialize admin for the second strategy
//     done(null, admin.id);
// });

// // Deserialize user for the second strategy
// passport.deserializeUser(async function(id, done) {
//     const admin = await admin_login.findById(id);
//     done(null, admin);
// });

passport.use('google', new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
  async function(accessToken, refreshToken, profile, done) {
    try {
      const user = await Signup.findOne({ email: profile.emails[0].value });

      if (!user) {
        // Store the profile in session or req.flash for access during redirection
        return done(null, false, { message: 'User not found', profile: profile });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
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

// app.delete('/adminDashboard/users/:userId', admin_dashboard.deleteUser);
// // Routes for login and registration

const ds=multer.diskStorage({
    destination: "./public/uploads",
    filename:(req,file,cb)=>{

        cb(null, req.user._id+"_"+file.originalname);
    }
});

const upload = multer({storage: ds});

app.post('/login',function(req,res,next){ next();} ,passport.authenticate('local_userLogin', { successRedirect: '/index?message=Login+Successful', failureRedirect: '/login?message=Login+Unsuccessful' }));
app.post('/admin_login',function(req,res,next){ next();} ,passport.authenticate('local_adminLogin', { successRedirect: '/admin_dashboard?message=Login+Successful', failureRedirect: '/index?message=Login+Unsuccessful'}));
app.post('/register', authController.register);
app.post('/residential_rent', upload.array("image", 10), ResidentialRent.residentialRent);
app.post('/residential_sale', upload.array("image", 10), ResidentialSale.residentialSale);
app.post('/residential_flatmates', upload.array("image", 10), Residentialflatmates.residentialflatmates);
app.post('/Plot_sale', upload.array("image", 10), Plotsale.plotSale);
app.post('/Plot_dev', upload.array("image", 10), Plotdev.plotDev);
app.post('/Commercial_rent', upload.array("image", 10), Commercialrent.commercialRent);
app.post('/Commercial_sale', upload.array("image", 10), Commercialsale.commercialSale);
app.post('/property_listings', Property_Listings.property_listings);
app.post('/property_details', Property_Details.property_details);
app.post('/property_review', Reviews.review );
app.post('/logout', Logout.logout);
app.post('/home_search', isAuthenticated, HomeSearch.search);
app.post('/changePassword', Change_Password.changePassword);
app.post('/saveProperty', saveProperty.save_property);
app.post('/report', reportPage.reports);
app.post('/admin_logout', admin_logout.logout);
app.post('/admin_changepassword', admin_changepassword.changePassword);
app.post('/updateMyDetails', upload.array("image", 1), updateUserDetails.update);
app.post('/accountDelete', DeleteAccount.delete);
app.post('/deleteUser', adminDashboardController.deleteUser);
app.post('/changePermission', adminDashboardController.changePermission);
app.post('/contact', contactController.sendEmail);

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));
  
app.get('/auth/google/callback',
    function(req, res, next) {
        passport.authenticate('google', function(err, user, info) {
            if (err) { return next(err); }
            if (!user) {
              // Access the profile from `info` if available
              const profile = info && info.profile;
              
              // Redirect with profile information
              if (profile) {
                req.session.profile = profile;
                return res.redirect('/login');
              }
              return res.redirect('/login');
            }
      
            // If authentication succeeds, establish a session
            req.logIn(user, function(err) {
              if (err) { return next(err); }
              return res.redirect('/index?message=Login+Successful');  // Redirect to the dashboard or wherever you want
            });
        })(req, res, next);
    }
);
      

// Homepage route
app.get('/', homePage.home_page);
app.get('/property_listings', (req, res) => {
    res.render('property_listings', { property: '' });
});
app.get('/property_det_res_rent', (req, res) => {
    res.render('property_det_res_rent');
});
app.get('/property_det_res_sale', (req, res) => {
    res.render('property_det_res_sale');
});
app.get('/property_det_com_rent', (req, res) => {
    res.render('property_det_com_rent');
});
app.get('/property_det_com_sale', (req, res) => {
    res.render('property_det_com_sale');
});
app.get('/property_det_res_flatmates', (req, res) => {
    res.render('property_det_res_flatmates');
});
app.get('/property_det_plot_sale', (req, res) => {
    res.render('property_det_plot_sale');
});
app.get('/property_det_plot_dev', (req, res) => {
    res.render('property_det_plot_dev');
});
app.get('/index', homePage.home_page);
app.get('/admin_dashboard', adminDashboardController.renderAdminDashboard);
app.get('/post_your_property', isAuthenticated, (req, res) => {
    res.render('post_your_property');
});
app.get('/notification', isAuthenticated, (req, res) => {
    res.render('notification');
});
app.get('/message', (req, res) => {
    res.render('message');
});
app.get('/user_details', isAuthenticated, userDetails.user_details);
app.get('/admin_dashboard', isAuthenticated, (req, res) => {
    res.render('admin_dashboard');
});
app.get('/admin_login', (req, res) => {
    res.render('admin_login');
});
app.get('/login', (req, res) => {
    const profile = req.session.profile;
    req.session.profile = null;
    res.render('login_signup', {profile: profile});
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