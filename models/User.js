const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    // Add any additional fields you need for your user model
    // For example, you might want to include fields like email, name, etc.
    username: String,
    email:String,
    password: String
});

// Add the passport-local-mongoose plugin to your schema
userSchema.plugin(passportLocalMongoose);

// Create and export the User model
module.exports = mongoose.model('User', userSchema);