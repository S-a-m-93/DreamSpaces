const mongoose = require('mongoose');
const commercial_rent_model = require('../controllers/Commercial_rent');

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
            Available_From,
            Propertytax,
            Occupancy,
          
          
            city,
            Locality,
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
            Expected_deposit ,
            Available_From,
            Propertytax,
            Occupancy,
          
          
            city,
            Locality,
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
        });

        await newAd.save();

    }catch(error){

        res.render('error',{error : 'Something went wrong'});
}
}
