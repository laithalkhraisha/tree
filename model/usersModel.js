const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  type: { type: String, enum: ['School', 'University', 'Institution', 'Park'], required: true },
  name: { type: String, required: true },
  emailAddress: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date, required: true, default:Date.now },
});

const User = mongoose.model('Userr', userSchema);

module.exports = User;
