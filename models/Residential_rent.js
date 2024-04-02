const mongoose = require('mongoose');


// Define a single schema to encompass all details
const propertySchema = new mongoose.Schema({
  apartment_type: String,
  bhk_type: String,
  floor_number: Number,
  total_floors: Number,
  property_age: Number,
  facing: String,
  built_up_area: Number,
  expected_rent: Number,
  expected_deposit: Number,
  rent_negotiable: Boolean,
  monthly_maintenance: String,
  available_from: Date,
  preferred_tenants: [String],
  furnishing: String,
  parking: String,
  description: String,
  city: String,
  locality: String,
  landmark_street: String,
  locality_description: String,
  bathrooms: Number,
  balcony: Number,
  water_supply: String,
  gym: String,
  non_veg: String,
  gated_security: String,
  availability_to_show_property: String,
  start_time: String,
  end_time: String,
  lift: Boolean,
  internet: Boolean,
  air_conditioner: Boolean,
  swimming_pool: Boolean,
  club_house: Boolean,
  children_play_area: Boolean,
  gas_pipeline: Boolean,
  house_keeping: Boolean,
  images: [String], // Array of image URLs
});

// Define a model based on the schema
module.exports = mongoose.model('Residential_rent', propertySchema);

