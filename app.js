const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require("path");

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/DreamSpaces',{
    
});


const signup = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    phone:Number,
});

const Signup = mongoose.model("Signup",signup);

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Homepage route
app.get('/', (req, res) => {
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


function ValidatePhone(num) {
    if(num.toString().length == 10)
    {
        return true;
    }
    else
    {
        return false;
    }
}

function ValidateEmail(input) {

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const mail = "gmail.com";
    const num = input.length - 10;
  
    if (input.match(validRegex) && input.indexOf(mail) === num)
    {
      return true;
    }
    else
    {
      return false;
    }
}

app.post("/login", async (req,res)=>{
    try{
        const val = {
            email: req.body.l_email,
            password: req.body.l_password
        };

        const existingEmail = await Signup.findOne({email:val.email});
        const matchpassword = (existingEmail.password === val.password);

        if(existingEmail && matchpassword)
        {
            res.render("/index");
        }
        else if(!existingEmail)
        {
            res.send('Email does not exist!');
        }
        else if(!matchpassword)
        {
            res.send('Wrong Password');
        }
        else
        {
            res.render("error");
        }
    }catch (error){
        console.log(error);
        res.render("error");
    }
})

app.post("/register", async (req,res)=>{
    try{
        const val = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            confirmpassword: req.body.confirmpassword,
            phone: req.body.number
        };

        const existingEmail = await Signup.findOne({email:val.email});
        const existingName = await Signup.findOne({name:val.name});
        const existingPhone = await Signup.findOne({phone:val.phone});
        const validEmail = ValidateEmail(val.email);
        const validPhone = ValidatePhone(val.phone);
        
        if(!existingPhone && !existingName && !existingEmail && validEmail && validPhone && (val.password == val.confirmpassword)){
            const signupData = new Signup({
                name: val.name,
                email: val.email,
                password: val.password,
                phone: val.phone
            });
            await signupData.save();
            res.redirect("/");
        }
        else if(existingPhone) {
            res.render('phone_error', { error: 'Phone number already exists' });
        }
        else if(existingName) {
            res.render('name_error', { error: 'Name already exists' });
        }
        else if(existingEmail) {
            res.render('email_error', { error: 'Email already exists' });
        }
        else if(!validEmail) {
            res.render('invalidemail_error', { error: 'Invalid email format' });
        }
        else if(!validPhone) {
            res.render('invalidphone_error', { error: 'Invalid phone number' });
        }
        else {
            res.render('password_error', { error: 'Passwords do not match' });
        }        
            
    }catch (error){
        console.log(error);
        res.render("error");
    }
})

app.get('/error', (req, res) => {
    res.render('error');
});

app.get("/phone_error",(req,res)=>{
    res.render("/phone_error");
})

app.get("/name_error",(req,res)=>{
    res.render( "/name_error");
})

app.get("/email_error",(req,res)=>{
    res.render("/email_error");
})

app.get("/invalidemail_error",(req,res)=>{
    res.render( "/invalidemail_error");
})

app.get("/invalidphone_error",(req,res)=>{
    res.render("/invalidphone_error");
})

app.get("/password_error",(req,res)=>{
    res.render("/password_error");
})



app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
})