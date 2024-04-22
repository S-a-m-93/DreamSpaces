const mongoose = require('mongoose');
const res_rent = require('../models/Residential_rent');
const res_buy = require('../models/Residential_sale');
const res_flat = require('../models/Residential_flatmates');
const com_rent = require('../models/Commercial_rent');
const com_buy = require('../models/Commercial_sale');
const land_buy = require('../models/Plot_sale');
const land_dev = require('../models/Plot_dev');
const seller = require('../models/Signup');

exports.search = async(req,res) => {
    try {
        const {property_type, ad_type, city} = req.body;

        if(property_type === 'residential' && ad_type === 'rent') {
            const property = await res_rent.find({ city: city, });
            const len = property.length;
            var owner = [];
            for(var i=0; i<len; i++)
            {
                owner[i] = await seller.findOne({ _id: property[i].ownerId });
            }

            if(property){
                res.render('property_listings', { property: property, len: len, owner: owner });
            }
            else {
                res.render('property_listings', { property: '' });
            }
        }
        else if(property_type === 'residential' && ad_type === 'buy') {
            const property = await res_buy.find({ city: city, });
            const len = property.length;
            var owner = [];
            for(var i=0; i<len; i++)
            {
                owner[i] = await seller.findOne({ _id: property[i].ownerId });
            }

            if(property){
                res.render('property_listings', { property: property, len: len, owner: owner });
            }
            else {
                res.render('property_listings', { property: '' });
            }
        }
        else if(property_type === 'residential' && ad_type === 'flatmates') {
            const property = await res_flat.find({ city: city, });
            const len = property.length;
            var owner = [];
            for(var i=0; i<len; i++)
            {
                owner[i] = await seller.findOne({ _id: property[i].ownerId });
            }

            if(property){
                res.render('property_listings', { property: property, len: len, owner: owner });
            }
            else {
                res.render('property_listings', { property: '' });
            }
        }
        else if(property_type === 'commercial' && ad_type === 'rent') {
            const property = await com_rent.find({ city: city, });
            const len = property.length;
            var owner = [];
            for(var i=0; i<len; i++)
            {
                owner[i] = await seller.findOne({ _id: property[i].ownerId });
            }

            if(property){
                res.render('property_listings', { property: property, len: len, owner: owner });
            }
            else {
                res.render('property_listings', { property: '' });
            }
        }
        else if(property_type === 'commercial' && ad_type === 'buy') {
            const property = await com_buy.find({ city: city, });
            const len = property.length;
            var owner = [];
            for(var i=0; i<len; i++)
            {
                owner[i] = await seller.findOne({ _id: property[i].ownerId });
            }

            if(property){
                res.render('property_listings', { property: property, len: len, owner: owner });
            }
            else {
                res.render('property_listings', { property: '' });
            }
        }
        else if(property_type === 'land' && ad_type === 'buy') {
            const property = await land_buy.find({ city: city, });
            const len = property.length;
            var owner = [];
            for(var i=0; i<len; i++)
            {
                owner[i] = await seller.findOne({ _id: property[i].ownerId });
            }

            if(property){
                res.render('property_listings', { property: property, len: len, owner: owner });
            }
            else {
                res.render('property_listings', { property: '' });
            }
        }
        else if(property_type === 'land' && ad_type === 'development') {
            const property = await land_dev.find({ city: city, });
            const len = property.length;
            var owner = [];
            for(var i=0; i<len; i++)
            {
                owner[i] = await seller.findOne({ _id: property[i].ownerId });
            }

            if(property){
                res.render('property_listings', { property: property, len: len, owner: owner });
            }
            else {
                res.render('property_listings', { property: '' });
            }
        }
        else{
            res.render('property_listings', { property: '' });
        }
    } catch(error) {
        console.error(error);
        res.render('error', { error: 'Something went wrong' });
    }
}