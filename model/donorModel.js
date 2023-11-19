const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  emailAddress: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  personalInfo: {
    fullName: String,
    contactInfo: {
      email: String,
      phoneNumber: String,
    },
  },
  donationHistory: [{
    date: Date,
    amount: Number,
  }],
  favoritePrograms: String,
  liveUpdates: String,
  settings: String,
});

const Donor = mongoose.model('Donor', donorSchema);
module.exports = Donor;
