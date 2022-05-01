const mongoose = require('mongoose');
//used to verify the user's e-mail uniqueness upon registration
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({

    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, minlength: 6},
    admin: {type: Boolean, required: true},

});

const User = mongoose.model('User', UserSchema);
UserSchema.plugin(uniqueValidator);

module.exports = {User};