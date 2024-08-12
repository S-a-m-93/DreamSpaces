const mongoose = require('mongoose');
const residential_rent_model = require('../models/Residential_rent');
const owners = require('../models/Signup');

exports.residentialRent = async(req, res) => {

    try{
        const{ 
            apartment_type,
            bhk_type,
            floor_number ,
            total_floors ,
            property_age ,
            facing ,
            built_up_area ,
            expected_rent ,
            expected_deposit ,
            rent_negotiable ,
            monthly_maintenance,
            available_from ,
            preferred_tenants,
            furnishing ,
            parking ,
            rental_description ,
            city ,
            locality,
            landmark_street ,
            locality_description ,
            bathrooms ,
            balcony ,
            water_supply ,
            gym ,
            non_veg ,
            gated_security ,
            availability_to_show_property ,
            start_time,
            end_time,
            amenities,
            image, // Array of image URLs} 
            
        } = req.body;

        const imagePaths = req.files.map(file => file.path);
        const newAd = new residential_rent_model({
            apartment_type,
            bhk_type,
            floor_number ,
            total_floors ,
            property_age ,
            facing ,
            built_up_area ,
            expected_rent ,
            expected_deposit ,
            rent_negotiable ,
            monthly_maintenance,
            available_from ,
            preferred_tenants,
            furnishing ,
            parking ,
            rental_description ,
            city ,
            locality,
            landmark_street ,
            locality_description ,
            bathrooms ,
            balcony ,
            water_supply ,
            gym ,
            non_veg ,
            gated_security ,
            availability_to_show_property ,
            start_time,
            end_time,
            amenities,
            image: imagePaths,
            ownerId: req.user._id, // Array of image URLs} 
        });

        await newAd.save();

        const property = await residential_rent_model.findOne().sort({_id: -1});
        await owners.updateOne({ _id: req.user._id }, {$push: {postedProperties: [property._id]}});

        res.redirect('/index?message=Property+is+Posted+Successfully');

    }catch(error){
        console.log(error);
        res.render('error',{error : 'Something went wrong'});
}
}
