const mongoose = require('mongoose');
const res_rent = require('../models/Residential_rent');
const res_buy = require('../models/Residential_sale');
const res_flat = require('../models/Residential_flatmates');
const com_rent = require('../models/Commercial_rent');
const com_buy = require('../models/Commercial_sale');
const land_buy = require('../models/Plot_sale');
const land_dev = require('../models/Plot_dev');
const seller = require('../models/Signup');
const SavedProperties = require('../models/save_property');

exports.user_details = async(req,res)=>{
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

        const saved_properties = await SavedProperties.findOne({userId: req.user._id});
        var s_len;
        var s_property = [];
        var s_owner = [];
        if(saved_properties) {
            s_len = saved_properties.savedProperties.length;
            var s_property = [];
            var s_owner = [];
            if(s_len>0) {
                for(var i=0; i<s_len; i++)
                {
                    if(await res_rent.findOne({_id: saved_properties.savedProperties[i]})) {
                        s_property = s_property.concat(await res_rent.findOne({_id: saved_properties.savedProperties[i]}));
                    }
                    else if(await res_buy.findOne({_id: saved_properties.savedProperties[i]})) {
                        s_property = s_property.concat(await res_buy.findOne({_id: saved_properties.savedProperties[i]}));
                    }
                    else if(await res_flat.findOne({_id: saved_properties.savedProperties[i]})) {
                        s_property = s_property.concat(await res_flat.findOne({_id: saved_properties.savedProperties[i]}));
                    }
                    else if(await com_rent.findOne({_id: saved_properties.savedProperties[i]})) {
                        s_property = s_property.concat(await com_rent.findOne({_id: saved_properties.savedProperties[i]}));
                    }
                    else if(await com_buy.findOne({_id: saved_properties.savedProperties[i]})) {
                        s_property = s_property.concat(await com_buy.findOne({_id: saved_properties.savedProperties[i]}));
                    }
                    else if(await land_buy.findOne({_id: saved_properties.savedProperties[i]})) {
                        s_property = s_property.concat(await land_buy.findOne({_id: saved_properties.savedProperties[i]}));
                    }
                    else if(await land_dev.findOne({_id: saved_properties.savedProperties[i]})) {
                        s_property = s_property.concat(await land_dev.findOne({_id: saved_properties.savedProperties[i]}));
                    }
                    s_owner = s_owner.concat(await seller.findOne({_id: s_property[i].ownerId}));
                }
            }
        }
        res.render('user_details', { property: property, len: len, owner: owner, s_owner: s_owner, s_len: s_len, s_property: s_property, myDetails: owner });
    }
    catch(error){
        console.error(error);
        res.render('error', { error: 'Something went wrong' });
    }
}