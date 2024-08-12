const mongoose = require('mongoose');
const residential_flatmates_model = require('../models/Residential_flatmates');
const owners = require('../models/Signup');


exports.residentialflatmates = async(req, res) => {

    try{
        const{ 
            apartment_type,
            bhk_type,
            floor_number,
            total_floors,
            Room_Type,
            Tenant_Type,
            property_age,
            facing,
            built_up_area,
            expected_rent,
            expected_deposit,
            rent_negotiable,
            monthly_maintenance,
            available_from,
            furnishing,
            parking,
            rental_description,
            city,
            locality,
            landmark_street,
            locality_description,
            bathrooms,
            ac_room,
            smoking,
            drinking,
            balcony,
            gym,
            gated_security,
            availability_to_show_property,
            start_time,
            end_time,
            amenities,
            image, // Array of image URLs
            
        } = req.body;
        const imagePaths = req.files.map(file => file.path);
        const newAd = new residential_flatmates_model({
            apartment_type,
            bhk_type,
            floor_number,
            total_floors,
            property_age,
            Room_Type,
            Tenant_Type,
            facing,
            built_up_area,
            expected_rent,
            expected_deposit,
            rent_negotiable,
            monthly_maintenance,
            available_from,
            furnishing,
            parking,
            rental_description,
            city,
            locality,
            landmark_street,
            locality_description,
            bathrooms,
            ac_room,
            smoking,
            drinking,
            balcony,
            gym,
            gated_security,
            availability_to_show_property,
            start_time,
            end_time,
            amenities,
            image: imagePaths,
            ownerId: req.user._id, // Array of image URLs
        });

        await newAd.save();

        const property = await residential_flatmates_model.findOne().sort({_id: -1});
        await owners.updateOne({ _id: req.user._id }, {$push: {postedProperties: [property._id]}});

    }catch(error){

        res.render('error',{error : 'Something went wrong'});
}
}
