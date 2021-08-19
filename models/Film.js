const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 1,
        max: 30
    },
    description: {
        type: String,
        required: true,
        min: 3,
        max: 180
    },
    realeaseDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    ticketPrice: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    genre: [String],
    photo: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Films', filmSchema);