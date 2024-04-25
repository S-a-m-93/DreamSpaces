const mongoose = require('mongoose');
const res_rent = require('../models/Residential_rent');
const res_buy = require('../models/Residential_sale');
const res_flat = require('../models/Residential_flatmates');
const com_rent = require('../models/Commercial_rent');
const com_buy = require('../models/Commercial_sale');
const land_buy = require('../models/Plot_sale');
const land_dev = require('../models/Plot_dev');
const seller = require('../models/Signup');

exports.posted_properties = async(req,res)=>{
    try{
        var property = [];
        property = property.concat(await res_rent.find({ownerId: req.user._id}));
        property = property.concat(await res_buy.find({ownerId: req.user._id}));
        property = property.concat(await res_flat.find({ownerId: req.user._id}));
        property = property.concat(await com_rent.find({ownerId: req.user._id}));
        property = property.concat(await com_buy.find({ownerId: req.user._id}));
        property = property.concat(await land_buy.find({ownerId: req.user._id}));
        property = property.concat(await land_dev.find({ownerId: req.user._id}));
        const owner = await seller.findOne({ _id: req.user._id });
        const len = property.length;
        res.render('user_details', { property: property, len: len, owner: owner });
    }
    catch(error){
        console.error(error);
        res.render('error', { error: 'Something went wrong' });
    }
}