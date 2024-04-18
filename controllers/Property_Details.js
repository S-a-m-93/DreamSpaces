const mongoose = require('mongoose');
const sale = require('../models/Residential_sale');
const seller = require('../models/Signup');
const reviews = require('../models/Reviews');

exports.property_details = async (req,res) =>{
    try{
        const object_id = req.body.object_id.toString();
        const property = await sale.findOne({ _id: object_id });
        const owner = await seller.findOne({ _id: property.ownerId });
        const Reviews = await reviews.find({ propertyId: object_id });
        const len = Reviews.length;
        var users = [];
        for(var i=0; i<len; i++)
        {
            users[i] = await seller.findOne({ _id: Reviews[i].userId });
        }

        if(property){
            res.render('property_details', { property: property, owner: owner, Reviews: Reviews, users: users, len: len });
        }
        else {
            res.render('property_details', { property: '' });
        }
    }
    catch(error){
        console.error(error);
        res.render('error', { error: 'Something went wrong' });
    }
}