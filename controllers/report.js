const mongoose = require('mongoose');
const reports = require('../models/report');
const res_rent = require('../models/Residential_rent');
const res_buy = require('../models/Residential_sale');
const res_flat = require('../models/Residential_flatmates');
const com_rent = require('../models/Commercial_rent');
const com_buy = require('../models/Commercial_sale');
const land_buy = require('../models/Plot_sale');
const land_dev = require('../models/Plot_dev');
const seller = require('../models/Signup');
const reviews = require('../models/Reviews');

exports.reports = async(req,res) => {
    try{
        const {reportedPropertyId, report_description} = req.body;
        const existingReport = await reports.findOne({reportedPropertyId: reportedPropertyId});
        if(existingReport) {
            existingReport.reportedUserId = existingReport.reportedUserId.concat(req.user._id);
            const uniqueElements = new Set(existingReport.reportedUserId);
            // Check if the size of the Set is different from the original array
            if (uniqueElements.size !== existingReport.reportedUserId.length) {
                res.render('error', {error: 'You have already reported this property'});   
            }
            else {
                await reports.updateOne({reportedPropertyId: reportedPropertyId},{$push: { reportedUserId: req.user._id , description: report_description, date: new Date() }});
            }
        }
        else {
            const new_report = new reports({
                reportedPropertyId: reportedPropertyId,
                reportedUserId: req.user._id,
                description: report_description
            });
            await new_report.save();
        }
        const resRent = await res_rent.findOne({ _id: reportedPropertyId });
        const resBuy = await res_buy.findOne({ _id: reportedPropertyId });
        const resFlat = await res_flat.findOne({ _id: reportedPropertyId });
        const comRent = await com_rent.findOne({ _id: reportedPropertyId });
        const comBuy = await com_buy.findOne({ _id: reportedPropertyId });
        const landBuy = await land_buy.findOne({ _id: reportedPropertyId });
        const landDev = await land_dev.findOne({ _id: reportedPropertyId });

        if(resRent) {
            const owner = await seller.findOne({ _id: resRent.ownerId });
            const Reviews = await reviews.find({ propertyId: reportedPropertyId });
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
            const Reviews = await reviews.find({ propertyId: reportedPropertyId });
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
            const Reviews = await reviews.find({ propertyId: reportedPropertyId });
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
            const Reviews = await reviews.find({ propertyId: reportedPropertyId });
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
            const Reviews = await reviews.find({ propertyId: reportedPropertyId });
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
            const Reviews = await reviews.find({ propertyId: reportedPropertyId });
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
            const Reviews = await reviews.find({ propertyId: reportedPropertyId });
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
    catch(error) {
        console.log(error);
        res.render('error', {error: 'Something went wrong'});
    }
}