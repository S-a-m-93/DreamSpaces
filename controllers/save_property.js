const mongoose = require('mongoose');
const users = require('../models/Signup');

exports.save_property = async(req,res) => {
    try {
        const {propId} = req.body;
        const id = req.user._id.toString();
        const client = await users.findOne({_id: id});
        if(!client.savedProperties)
        {
            await users.updateOne({ _id: id }, { savedProperties: [propId] });
        }
        else
        {
            client.savedProperties = client.savedProperties.concat(propId);
            const uniqueElements = new Set(client.savedProperties);
            // Check if the size of the Set is different from the original array
            if (uniqueElements.size !== client.savedProperties.length) {
                res.render('error', {error: 'You have already saved this property'});   
            }
            else {
                await users.updateOne({ _id: id },{$push: { savedProperties: [propId] }});
            }
        }
        res.redirect('/user_details?tab=saved_properties&tabId=saved_props&message=Property+is+Saved+Successfully');
    }
    catch(error) {
        console.log(error);
        res.render('error', {error: 'Something went wrong'});
    }
}