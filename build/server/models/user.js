// Create a User model to store data inside MongoDB
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newUser = new Schema({
    email: {
        type: String,
        required:true
    },
    password:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Signups', newUser);