const mongoose = require('mongoose');
const sale = require('../models/Residential_sale');
const seller = require('../models/Signup');

exports.property_listings = async (req,res) =>{
    try{
        //res.render('property_listings', { property: '' });
        //console.log('Hi');
        const {location, bhk} = req.body;

        // console.log(location);
        // console.log(bhk);

        const property = await sale.find({bhk_type: bhk, city: location});
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
    catch(error){
        console.error(error);
        res.render('error', { error: 'Something went wrong' });
    }
}