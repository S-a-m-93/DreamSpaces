const mongoose = require('mongoose');
const reviewDB = require('../models/Reviews');
const sale = require('../models/Residential_sale');

exports.review = async(req,res) => {
    try {
        const { comment_input, propertyId } = req.body;
        const newReview = new reviewDB({
            comment_input,
            propertyId,
            userId: req.user._id,
        });
        await newReview.save();
    } catch (error) {
        console.error(error);
        res.render('error', { error: 'Something went wrong' });
    }
}