const mongoose = require('mongoose');
const sale = require('../models/Residential_sale');

exports.property_details = async (req,res) =>{
    try{
        const object_id = req.body.object_id.toString();
    
        const property = await sale.findOne({_id: object_id});
        if(property){
            res.render('property_details', { property: property });
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