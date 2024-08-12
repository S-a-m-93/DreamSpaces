const mongoose = require('mongoose');
const plot_dev_model = require('../models/Plot_dev');
const owners = require('../models/Signup');

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
            available_from,
            Propertytax,
            Occupancy ,
          
          
            city,
            locality,
            landmark_street,
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
        const imagePaths = req.files.map(file => file.path);
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
            available_from,
            Propertytax,
            Occupancy ,
          
          
            city,
            locality,
            landmark_street,
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
           
          
            image: imagePaths,
            ownerId: req.user._id,
        });

        await newAd.save();

        const property = await plot_dev_model.findOne().sort({_id: -1});
        await owners.updateOne({ _id: req.user._id }, {$push: {postedProperties: [property._id]}});

        res.redirect('/index?message=Property+is+Posted+Successfully');

    }catch(error){

        //res.render('error',{error : 'Something went wrong'});
        console.log(error);
}
}
