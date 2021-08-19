const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    filmId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        min: 1,
        max: 30
    },
    comment: {
        type: String,
        required: true,
        min: 3,
        max: 180
    }
});

module.exports = mongoose.model('Comments', commentSchema);