const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        name: {
            type: String,
            required: [true, 'Please enter a name'],
        },
        email: {
            type: String,
            required: [true, 'Please enter a valid email address'],
        },
        phone: {
            type: String,
            required: [true, 'Please enter a phone number'],
        },
    },
    {timestamps: true});

module.exports = mongoose.model('Contact', contactSchema);