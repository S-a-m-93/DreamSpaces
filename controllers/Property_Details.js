const mongoose = require('mongoose');
const sale = require('../models/Residential_sale');
const seller = require('../models/Signup');
exports.property_details = async (req,res) =>{
    try{
        const object_id = req.body.object_id.toString();
        const property = await sale.findOne({_id: object_id});
        const owner = await seller.findOne({_id: property.ownerId});
        if(property){
            res.render('property_details', { property: property, owner: owner, });
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