const Report = require('../models/report');
const res_rent = require('../models/Residential_rent');
const res_buy = require('../models/Residential_sale');
const res_flat = require('../models/Residential_flatmates');
const com_rent = require('../models/Commercial_rent');
const com_buy = require('../models/Commercial_sale');
const land_buy = require('../models/Plot_sale');
const land_dev = require('../models/Plot_dev');
const Signup = require('../models/Signup');
const Admin = require('../models/admin_login');


exports.renderAdminDashboard = async (req, res) => {
    try {
        // Fetch all users and reports from the database
        const users = await Signup.find({});
        const reports = await Report.find({});
        
        var property = [];
        property = property.concat(await res_rent.find({}));
        property = property.concat(await res_buy.find({}));
        property = property.concat(await res_flat.find({}));
        property = property.concat(await com_buy.find({}));
        property = property.concat(await com_rent.find({}));
        property = property.concat(await land_buy.find({}));
        property = property.concat(await land_dev.find({}));
        const len = property.length;
        const owner = [];
        for (let i = 0; i < len; i++) {
            owner[i] = await Signup.findOne({ _id: property[i].ownerId });
        }

        // Render the admin dashboard view with users, reports, and property data
        res.render('admin_dashboard', { users: users, reports: reports, property: property, len: len, owner: owner });
    } catch (error) {
        console.error('Error fetching data:', error);
         res.render('error', {error: 'Something went wrong'});
    }
};

exports.deleteUser = async(req,res)=>{
    try {
        const email = req.body.u_email;
        const client = await Signup.findOne({ email: email });
        await res_rent.deleteMany({ownerId: client._id});
        await res_buy.deleteMany({ownerId: client._id});
        await res_flat.deleteMany({ownerId: client._id});
        await com_buy.deleteMany({ownerId: client._id});
        await com_rent.deleteMany({ownerId: client._id});
        await land_buy.deleteMany({ownerId: client._id});
        await land_dev.deleteMany({ownerId: client._id});
        await Signup.deleteOne({_id: client._id});
        res.redirect("/admin_dashboard");
    }
    catch(error) {
        console.log(error);
        res.render('error', {error: 'Something went wrong'});
    }
    
}


exports.changePermission = async(req,res)=> {
    try {
        const { useremail, permissionType } = req.body;
        const client = await Signup.findOne({email: useremail});
        if(permissionType === 'admin') {
            const newAdmin = new Admin({
                name: client.name,
                email: client.email,
                password: client.password,
                phone: client.phone
            });
            await newAdmin.save();
            res.redirect('/admin_dashboard');
        }
    }
    catch(error) {
        console.log(error);
        res.render('error', {error: 'Something went wrong'});
    }
}