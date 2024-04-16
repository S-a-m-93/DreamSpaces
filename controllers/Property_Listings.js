const mongoose = require('mongoose');
const sale = require('../models/Residential_sale');

exports.property_listings = async (req,res) =>{
    try{
        //res.render('property_listings', { property: '' });
        //console.log('Hi');
        const {location, bhk} = req.body;

        // console.log(location);
        // console.log(bhk);

        const property = await sale.findOne({bhk_type: bhk, city: location});
        //console.log(property);

        if(property){
            res.render('property_listings', { property: property });
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