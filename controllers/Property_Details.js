const mongoose = require('mongoose');
const res_rent = require('../models/Residential_rent');
const res_buy = require('../models/Residential_sale');
const res_flat = require('../models/Residential_flatmates');
const com_rent = require('../models/Commercial_rent');
const com_buy = require('../models/Commercial_sale');
const land_buy = require('../models/Plot_sale');
const land_dev = require('../models/Plot_dev');
const seller = require('../models/Signup');
const reviews = require('../models/Reviews');

exports.property_details = async (req,res) =>{
    try{
        const object_id = req.body.object_id.toString();
        const resRent = await res_rent.findOne({ _id: object_id });
        const resBuy = await res_buy.findOne({ _id: object_id });
        const resFlat = await res_flat.findOne({ _id: object_id });
        const comRent = await com_rent.findOne({ _id: object_id });
        const comBuy = await com_buy.findOne({ _id: object_id });
        const landBuy = await land_buy.findOne({ _id: object_id });
        const landDev = await land_dev.findOne({ _id: object_id });

        if(resRent) {
            const owner = await seller.findOne({ _id: resRent.ownerId });
            const Reviews = await reviews.find({ propertyId: object_id });
            const len = Reviews.length;
            var users = [];
            for(var i=0; i<len; i++)
            {
                users[i] = await seller.findOne({ _id: Reviews[i].userId });
            }

            res.render('property_det_res_rent', { property: resRent, owner: owner, Reviews: Reviews, users: users, len: len });
        }
        else if(resBuy) {
            const owner = await seller.findOne({ _id: resBuy.ownerId });
            const Reviews = await reviews.find({ propertyId: object_id });
            const len = Reviews.length;
            var users = [];
            for(var i=0; i<len; i++)
            {
                users[i] = await seller.findOne({ _id: Reviews[i].userId });
            }

            res.render('property_det_res_sale', { property: resBuy, owner: owner, Reviews: Reviews, users: users, len: len });
        }
        else if(resFlat) {
            const owner = await seller.findOne({ _id: resFlat.ownerId });
            const Reviews = await reviews.find({ propertyId: object_id });
            const len = Reviews.length;
            var users = [];
            for(var i=0; i<len; i++)
            {
                users[i] = await seller.findOne({ _id: Reviews[i].userId });
            }

            res.render('property_det_res_flatmates', { property: resFlat, owner: owner, Reviews: Reviews, users: users, len: len });
        }
        else if(comRent) {
            const owner = await seller.findOne({ _id: comRent.ownerId });
            const Reviews = await reviews.find({ propertyId: object_id });
            const len = Reviews.length;
            var users = [];
            for(var i=0; i<len; i++)
            {
                users[i] = await seller.findOne({ _id: Reviews[i].userId });
            }

            res.render('property_det_com_rent', { property: comRent, owner: owner, Reviews: Reviews, users: users, len: len });
        }
        else if(comBuy) {
            const owner = await seller.findOne({ _id: comBuy.ownerId });
            const Reviews = await reviews.find({ propertyId: object_id });
            const len = Reviews.length;
            var users = [];
            for(var i=0; i<len; i++)
            {
                users[i] = await seller.findOne({ _id: Reviews[i].userId });
            }

            res.render('property_det_com_sale', { property: comBuy, owner: owner, Reviews: Reviews, users: users, len: len });
        }
        else if(landBuy) {
            const owner = await seller.findOne({ _id: landBuy.ownerId });
            const Reviews = await reviews.find({ propertyId: object_id });
            const len = Reviews.length;
            var users = [];
            for(var i=0; i<len; i++)
            {
                users[i] = await seller.findOne({ _id: Reviews[i].userId });
            }

            res.render('property_det_plot_sales', { property: landBuy, owner: owner, Reviews: Reviews, users: users, len: len });
        }
        else if(landDev) {
            const owner = await seller.findOne({ _id: landDev.ownerId });
            const Reviews = await reviews.find({ propertyId: object_id });
            const len = Reviews.length;
            var users = [];
            for(var i=0; i<len; i++)
            {
                users[i] = await seller.findOne({ _id: Reviews[i].userId });
            }

            res.render('property_det_plot_dev', { property: landDev, owner: owner, Reviews: Reviews, users: users, len: len });
        }
        else {
            res.render('property_details_res_sale', { property: '' });
        }
    }
    catch(error){
        console.error(error);
        res.render('error', { error: 'Something went wrong' });
    }
}