const mongooose = require('mongoose');

const UserSchema = new mongoose.Schema({

    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    admin: {type: Boolean, required: true},

});

module.exports = mongoose.model('User', UserSchema);