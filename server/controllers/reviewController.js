const Review = require('../models/Review');

const addReview = async (req, res) => {
    try {
        const { workerId, reviewerName, rating, comment } = req.body;
        
        const newReview = new Review({
            workerId,
            reviewerName,
            rating,
            comment
        });

        await newReview.save();
        res.status(201).json(newReview);
    } catch (error) {
        res.status(400).json({ message: 'Validation Error', error: error.message });
    }
};

module.exports = { addReview };
