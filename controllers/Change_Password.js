const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const endUser = require('../models/Signup');

exports.changePassword = async(req,res) => {
    try {
        const {inputPasswordCurrent, inputPasswordNew, inputPasswordNew2} = req.body;
        const client = await endUser.findOne({_id: req.user._id});
        const match = await bcrypt.compare(inputPasswordCurrent, client.password);
        if(match) {
            if(inputPasswordNew === inputPasswordNew2) {
                const hashedPassword = await bcrypt.hash(inputPasswordNew, 10);
                await endUser.updateOne({_id: client._id}, {$set:{password: hashedPassword}});
            }
            else {
                res.render('error', { error: 'New Password and Verify Pssword did not match' });
            }
        }
        else {
            res.render('error', { error: 'Current Passowrd is wrong' });
        }
    } catch (error) {
        console.error(error);
        res.render('error', { error: 'Something went wrong' });
    }
}