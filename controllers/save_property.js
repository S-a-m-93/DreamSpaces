const mongoose = require('mongoose');
const sapro = require('../models/save_property');

exports.save_property = async(req,res) => {
    try {
        const {propId} = req.body;
        const client = await sapro.findOne({userId: req.user._id});
        console.log(propId);
        console.log(client);
        if(client) {
            console.log('Hi');
            client.savedProperties = client.savedProperties.concat(propId);
            const uniqueElements = new Set(client.savedProperties);
            // Check if the size of the Set is different from the original array
            if (uniqueElements.size !== client.savedProperties.length) {
                res.render('error', {error: 'You have already saved this property'});   
            }
            else {
                await sapro.updateOne({ userId: req.user._id },{$push: { savedProperties: [propId] }});
            }
        }
        else {
            console.log('Hiiiiii');
            const new_wish = new sapro({
                userId: req.user._id,
                savedProperties: propId
            });
            console.log('Hiii');
            await new_wish.save();
        }
        res.redirect('/user_details?tab=saved_properties&tabId=saved_props');
    }
    catch(error) {
        console.log(error);
        res.render('error', {error: 'Something went wrong'});
    }
}