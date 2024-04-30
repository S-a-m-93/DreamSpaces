const mongoose = require('mongoose');
const sapro = require('../models/save_property');

exports.save_property = async(req,res) => {
    try {
        const {propId} = req.body;
        const client = await sapro.findOne({userId: req.user._id});
        if(client) {
            client.savedProperties = client.savedProperties.concat(propId);
            const uniqueElements = new Set(client.savedProperties);
            // Check if the size of the Set is different from the original array
            if (uniqueElements.size !== client.savedProperties.length) {
                res.render('error', {error: 'You have already saved this property'});   
            }
            await sapro.updateOne({ userId: req.user._id },{$push: { savedProperties: [propId] }});
        }
        else {
            const new_wish = new sapro({
                userId: req.user._id,
                savedProperties: propId
            });
            await new_wish.save();
        }
    }
    catch(error) {
        console.log(error);
        res.render('error', {error: 'Something went wrong'});
    }
}