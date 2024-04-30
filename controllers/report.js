const mongoose = require('mongoose');
const reports = require('../models/report');

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
    }
    catch(error) {
        console.log(error);
        res.render('error', {error: 'Something went wrong'});
    }
}