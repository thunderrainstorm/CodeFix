const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Review', reviewSchema);
