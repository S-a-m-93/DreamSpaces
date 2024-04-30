const mongoose = require('mongoose');
const commercial_sale_model = require('../models/Commercial_sale');

exports.commercialSale = async(req, res) => {

    try{
        const{ 
            property_type,
            building_type ,
            floors,
            totalfloor,
            age,
            builtuparea ,
            carpetarea ,
            furnish,
          
            Expected_rent,
            Rent_Negotiable,
            available_from,
            Propertytax,
            Occupancy,
          
          
            city,
            Locality,
            landmark_street,
            locality_description,
          
            water_storage,
            lift,
            powerbackup ,
            wash ,
            parking,
            security,
            Availability,
            startTime,
            endTime,
            Directions ,
          
          
            image,
        } = req.body;
        const imagePaths = req.files.map(file => file.path);
        const newAd = new commercial_sale_model({
            property_type,
            building_type ,
            floors,
            totalfloor,
            age,
            builtuparea ,
            carpetarea ,
            furnish,
          
            Expected_rent,
            Rent_Negotiable,
            available_from,
            Propertytax,
            Occupancy,
          
          
            city,
            Locality,
            landmark_street,
            locality_description,
          
            water_storage,
            lift,
            powerbackup ,
            wash ,
            parking,
            security,
            Availability,
            startTime,
            endTime,
            Directions ,
          
          
            image: imagePaths,
            ownerId: req.user._id,
        });

        await newAd.save();

    }catch(error){

        res.render('error',{error : 'Something went wrong'});
}
}
