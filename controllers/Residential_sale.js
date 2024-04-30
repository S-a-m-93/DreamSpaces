const mongoose = require('mongoose');
const residential_sale_model = require('../models/Residential_sale');

exports.residentialSale = async(req, res) => {

    try{
        const{ 
            apartment_type,
            bhk_type,
            floor_number ,
            total_floors ,
            property_age ,
            facing ,
            built_up_area ,
            expected_price ,
            price_negotiable ,
            available_from ,
            kitchen_type,
            furnishing ,
            parking ,
            property_tax,
            occupancy_certificate,
            sale_description ,
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
            availability ,
            start_time,
            end_time,
            amenities,
            image, // Array of image URLs} 
            
        } = req.body;
        const imagePaths = req.files.map(file => file.path);
        const newAd = new residential_sale_model({
            apartment_type,
            bhk_type,
            floor_number ,
            total_floors ,
            property_age ,
            facing ,
            built_up_area ,
            expected_price ,
            price_negotiable ,
            available_from ,
            kitchen_type,
            furnishing ,
            parking ,
            property_tax,
            occupancy_certificate,
            sale_description ,
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
            availability ,
            start_time,
            end_time,
            amenities,
            image: imagePaths,
            ownerId: req.user._id, // Array of image URLs} 
        });

        await newAd.save();

    }catch(error){
        console.log(error);
        res.render('error',{error : 'Something went wrong'});
}
}
