const mongoose = require('mongoose');

const peopleSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        mobile: {
            type: String
        },
        username: {
            type: String
        },
        password: {
            type: String,
            require: true
        },
        avatar: {
            type: String
        },
        role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user'
        },
        status: {
            type: String,
            default: 'inactive'
        }
    },
    {
        timestamp: true
    }
);

const People = mongoose.model('People', peopleSchema);

module.exports = People;
