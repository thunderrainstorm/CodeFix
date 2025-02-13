const aiService = require("../services/ai.service");
const Review = require("../models/review.model");

module.exports.getReview = async (req, res) => {
    try {
        const code = req.body.code;
        if (!code) {
            return res.status(400).send("Code is required");
        }
        const response = await aiService(code);
        res.send(response);
    } catch (error) {
        res.status(500).send("Error generating review");
    }
};

module.exports.getReviewHistory = async (req, res) => {
    try {
        const history = await Review.find().sort({ timestamp: -1 }).limit(10);
        res.json(history);
    } catch (error) {
        res.status(500).send("Error fetching review history");
    }
};
