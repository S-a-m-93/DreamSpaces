const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const endUser = require('../models/Signup');
const res_rent = require('../models/Residential_rent');
const res_buy = require('../models/Residential_sale');
const res_flat = require('../models/Residential_flatmates');
const com_rent = require('../models/Commercial_rent');
const com_buy = require('../models/Commercial_sale');
const land_buy = require('../models/Plot_sale');
const land_dev = require('../models/Plot_dev');
const seller = require('../models/Signup');

exports.delete = async(req,res) => {
    try {
        const {PasswordCurrent, PasswordNew2} = req.body;
        const client = await endUser.findOne({_id: req.user._id});
        const match = await bcrypt.compare(PasswordCurrent, client.password);
        if(match) {
            if(PasswordCurrent === PasswordNew2) {
                await res_rent.deleteMany({ownerId: client._id});
                await res_buy.deleteMany({ownerId: client._id});
                await res_flat.deleteMany({ownerId: client._id});
                await com_buy.deleteMany({ownerId: client._id});
                await com_rent.deleteMany({ownerId: client._id});
                await land_buy.deleteMany({ownerId: client._id});
                await land_dev.deleteMany({ownerId: client._id});
                await endUser.deleteOne({_id: client._id});
                res.redirect('/index');
            }
            else {
                res.render('error', { error: 'Current Password and Verify Pssword did not match' });
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