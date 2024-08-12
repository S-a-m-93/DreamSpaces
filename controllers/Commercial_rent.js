const mongoose = require('mongoose');
const commercial_rent_model = require('../models/Commercial_rent');
const owners = require('../models/Signup');

exports.commercialRent = async(req, res) => {

    try{
        const{ 
            property_type,
            building_type ,
            floors,
            totalfloor,
            age,
            builtuparea,
            carpetarea,
            furnish,
          
            Expected_rent,
            Rent_Negotiable,
            Expected_deposit ,
            lease,
            available_from,
            Propertytax,
            Occupancy,
          
          
            city,
            locality,
            landmark_street,
            locality_description,
          
          
            wash,
            powerbackup ,
            water_supply,
            parking,
            security,
            Availability,
            start_time,
            end_time,
            Directions,
          
          
            image,
            
        } = req.body;
        const imagePaths = req.files.map(file => file.path);
        const newAd = new commercial_rent_model({
            property_type,
            building_type ,
            floors,
            totalfloor,
            age,
            builtuparea,
            carpetarea,
            furnish,
          
            Expected_rent,
            Rent_Negotiable,
            Expected_deposit,
            lease,
            available_from,
            Propertytax,
            Occupancy,
          
          
            city,
            locality,
            landmark_street,
            locality_description,
          
          
            wash,
            powerbackup ,
            water_supply,
            parking,
            security,
            Availability,
            start_time,
            end_time,
            Directions,
          
          
            image: imagePaths,
            ownerId: req.user._id,
        });

        await newAd.save();

        const property = await commercial_rent_model.findOne().sort({_id: -1});
        await owners.updateOne({ _id: req.user._id }, {$push: {postedProperties: [property._id]}});

        res.redirect('/index?message=Property+is+Posted+Successfully');

    }catch(error){

        res.render('error',{error : 'Something went wrong'});
}
}
