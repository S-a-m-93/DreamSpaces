const mongoose = require('mongoose');
const plot_dev_model = require('../models/Plot_dev');

exports.plotDev = async(req, res) => {

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
            Budget_Negotiable,
            Expected_commission ,
            Commission_Negotiable,
            Available_From,
            Propertytax,
            Occupancy ,
          
          
            city,
            locality,
            Landmark_Street,
            locality_description,
          
          
            water_supply,
            electricity_supply,
            sewage_connection,
            road ,
            security,
            Availability,
            startTime,
            endTime,
            Directions ,
          
          
            image,
        } = req.body;

        const newAd = new plot_dev_model({
            plot_area,
            length,
            width,
            bWall,
            built_up_area,
            floors ,
            project,
          
            Expected_rent,
            Budget_Negotiable,
            Expected_commission ,
            Commission_Negotiable,
            Available_From,
            Propertytax,
            Occupancy ,
          
          
            city,
            locality,
            Landmark_Street,
            locality_description,
          
          
            water_supply,
            electricity_supply,
            sewage_connection,
            road ,
            security,
            Availability,
            startTime,
            endTime,
            Directions ,
           
          
            image,
        });

        await newAd.save();

    }catch(error){

        //res.render('error',{error : 'Something went wrong'});
        console.log(error);
}
}
