const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const clients = require('../models/Signup');

exports.logout = async(req,res) => {
    try {
        const { inputPasswordCurrent } = req.body;
        const clientId = req.user._id.toString();
        const client = await clients.findOne({ _id: clientId });

        const match = await bcrypt.compare(inputPasswordCurrent, client.password);
        if (match) {
            req.logout(function(err) {
                if (err) {
                    console.error(err);
                    res.render('error', { error: 'Something went wrong during logout' });
                } else {
                    res.redirect('/');
                }
            });
        }
        else {
            return res.render('error', { error: 'Wrong password' });
        }
        
    } catch (error) {
        console.error(error);
        res.render('error', { error: 'Something went wrong' });
    }
}