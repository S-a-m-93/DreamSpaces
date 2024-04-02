const mongoose = require('mongoose');
const res_rent = require('../models/Residential_rent');

exports.Residential_rent = async(req, res) => {

    try{

        const { apartment_type,
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
            description ,
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
            lift ,
            internet ,
            air_conditioner ,
            swimming_pool,
            club_house ,
            children_play_area ,
            gas_pipeline,
            house_keeping,
            image, // Array of image URLs} 
            
        } = req.body;

        const newAd = new Residential_rent({
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
            description ,
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
            lift ,
            internet ,
            air_conditioner ,
            swimming_pool,
            club_house ,
            children_play_area ,
            gas_pipeline,
            house_keeping,
            image, // Array of image URLs} 
        }); 

        await newAd.save();

    }catch(error){

        res.render('error',{error : 'Something went wrong'});
}
}
