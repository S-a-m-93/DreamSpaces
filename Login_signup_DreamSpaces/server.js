const express=require("express")
const mongoose=require("mongoose");
const path = require("path");
const bodyParser=require("body-parser");

const app=express();

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

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded ({extended:true}));
app.use(bodyParser.json());

app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/index.html");
})

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
            res.redirect("/");
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
            res.redirect("error");
        }
    }catch (error){
        console.log(error);
        res.redirect("error");
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
            res.redirect("phone_error");
        }
        else if(existingName) {
            res.redirect("name_error");
        }
        else if(existingEmail) {
            res.redirect("email_error");
        }
        else if(!validEmail) {
            res.redirect("invalidemail_error");
        }
        else if(!validPhone){
            res.redirect("invalidphone_error");
        }
        else{
            res.redirect("password_error");
        }
            
    }catch (error){
        console.log(error);
        res.redirect("error");
    }
})

app.get("/error",(req,res)=>{
    res.sendFile(__dirname + "/error.html");
})

app.get("/phone_error",(req,res)=>{
    res.sendFile(__dirname + "/phone_error.html");
})

app.get("/name_error",(req,res)=>{
    res.sendFile(__dirname + "/name_error.html");
})

app.get("/email_error",(req,res)=>{
    res.sendFile(__dirname + "/email_error.html");
})

app.get("/invalidemail_error",(req,res)=>{
    res.sendFile(__dirname + "/invalidemail_error.html");
})

app.get("/invalidphone_error",(req,res)=>{
    res.sendFile(__dirname + "/invalidphone_error.html");
})

app.get("/password_error",(req,res)=>{
    res.sendFile(__dirname + "/password_error.html");
})



app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
})