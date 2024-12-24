const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
        username: {
            type: String,
            required: [true, 'Please enter a username'],
        },
        email: {
            type: String,
            required: [true, 'Please enter a email'],
            unique: [true, 'Email address already exists'],
        },
        password: {
            type: String,
            required: [true, 'Please enter your password'],
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', userSchema);