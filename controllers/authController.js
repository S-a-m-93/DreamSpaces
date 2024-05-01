// Import necessary modules
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Signup = require('../models/Signup');

// Handle user login
// exports.login = async (req, res) => {
//     try {
//         const { l_email, l_password } = req.body;

//         // Validate email format
//         if (!validateEmail(l_email)) {
//             return res.render('error', { error: 'Invalid email format' });
//         }

//         const existingUser = await Signup.findOne({ email: l_email });
//         if (!existingUser) {
//             return res.render('error', { error: 'Email does not exist' });
//         }

//         // Compare hashed password with password entered by user
//         const match = await bcrypt.compare(l_password, existingUser.password);
//         if (!match) {
//             return res.render('error', { error: 'Wrong password' });
//         }

//         // Redirect to homepage upon successful login
//         res.render('index');
//     } catch (error) {
//         console.error(error);
//         res.render('error', { error: 'Something went wrong' });
//     }
// }

// Validate email format
function validateEmail(email) {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const domain = "gmail.com";
    const domainLength = domain.length;
    
    const atIndex = email.indexOf('@');
    const domainIndex = email.indexOf(domain);
    
    return atIndex !== -1 && atIndex < domainIndex && domainIndex === email.length - domainLength;
}
// Phone number validation function
function validatePhone(phone) {
    return phone.length === 10; 
}
// Handle user registration
exports.register = async (req, res) => {
    try {
        const { name, email, password, confirmpassword, phone } = req.body;

        // Check if email format is valid
        if (!validateEmail(email)) {
            return res.render('error', { error: 'Invalid email format' });
        }

        // Check if phone number length is valid
        if (!validatePhone(phone)) {
            return res.render('error', { error: 'Invalid phone number' });
        }

        // Check if email already exists
        const existingUser = await Signup.findOne({ email });
        if (existingUser) {
            return res.render('error', { error: 'Email already exists' });
        }

        // Check if phone number already exists
        const existingPhone = await Signup.findOne({ phone });
        if (existingPhone) {
            return res.render('error', { error: 'Phone number already exists' });
        }

        // Check if password and confirm password match
        if (password !== confirmpassword) {
            return res.render('error', { error: 'Passwords do not match' });
        }

        if(password.length < 6) {
            return res.render('error', {error: 'Passoword is too short. It must contain atleast 6 characters.'});
        }
        // Hash password before saving to database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user with hashed password
        const newUser = new Signup({
            name,
            email,
            password: hashedPassword,
            phone
        });
        await newUser.save();

        // Redirect to homepage upon successful registration
        res.redirect('/index');
    } catch (error) {
        console.error(error);
        res.render('error', { error: 'Something went wrong' });
    }
}
