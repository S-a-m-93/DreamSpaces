const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); 
const adminUser = require('../models/admin_login');

exports.changePassword = async(req,res) => {
    try {
        const {currentPassword, newPassword, confirmPassword} = req.body;
        console.log('Hi');
        console.log(req.admin);
        console.log(req.admin._id);
        const client = await adminUser.findOne({_id: req.admin._id});
        const match = await bcrypt.compare(currentPassword, client.password);
        if(match) {
            if(newPassword === confirmPassword) {
                const hashedPassword = await bcrypt.hash(newPassword, 10);
                await adminUser.updateOne({_id: client._id}, {$set:{password: hashedPassword}});
            }
            else {
                res.render('error', { error: 'New Password and Confirm New Pssword did not match' });
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