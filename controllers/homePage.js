const mongoose = require('mongoose');
const res_rent = require('../models/Residential_rent');
const com_rent = require('../models/Commercial_rent');
const land_dev = require('../models/Plot_dev');
const seller = require('../models/Signup');

exports.home_page = async(req,res) => {
    try {
        var property = [];
        property = property.concat(await res_rent.find().sort({_id:-1}).limit(1));
        property = property.concat(await com_rent.find().sort({_id:-1}).limit(1));
        property = property.concat(await land_dev.find().sort({_id:-1}).limit(1));
        const len = 3;
        var owner = [];
        for(var i=0; i<len; i++)
        {
            owner[i] = await seller.findOne({ _id: property[i].ownerId });
        }
        res.render('index', {property: property, len: len, owner: owner});
    }
    catch(error) {
        console.log(error);
        res.render('error', {error: 'Something went wrong'});
    }
}