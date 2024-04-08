const mongoose = require('mongoose');
const plot_sale_model = require('../models/Plot_sale');

exports.plotSale = async(req, res) => {

    try{
        const{ 
           
            plot_area,
            length,
            width,
            bWall,
            built_up_area,
            floors ,
            project,

            Expected_rent,
            rent_negotiable,
            available_from,
            Propertytax,
            Occupancy ,


            city,
            locality,
            landmark_street,
            locality_description,


            water_supply,
            electricity_supply,
            sewage_connection ,
            road ,
            security,
            Availability,
            startTime,
            endTime,
            Directions,
            amenities,

            image,
        } = req.body;

        const newAd = new plot_sale_model({
            plot_area,
            length,
            width,
            bWall,
            built_up_area,
            floors ,
            project,
          
            Expected_rent,
            rent_negotiable,
            available_from,
            Propertytax,
            Occupancy ,
          
          
            city,
            locality,
            landmark_street,
            locality_description,
          
          
            water_supply,
            electricity_supply,
            sewage_connection ,
            road ,
            security,
            Availability,
            startTime,
            endTime,
            Directions,
            amenities,
          
            image,
        });

        await newAd.save();

    }catch(error){

        res.render('error',{error : 'Something went wrong'});
}
}