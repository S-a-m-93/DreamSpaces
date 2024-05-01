const mongoose = require('mongoose');
const endUsers = require('../models/Signup');

exports.update = async(req,res) => {
    try{
        const {bio, input_file, motive} = req.body;
        const imagePaths = req.files.map(file => file.path);

        await endUsers.findOneAndUpdate({_id: req.user._id}, {$set: { bio: bio, profile_pic: imagePaths[0], motive: motive }});
        res.redirect('/user_details?tab=account&tabId=acc');
    }
    catch(error) {
        console.log(error);
        res.render('error', {error: 'Something went wrong'});
    }
}