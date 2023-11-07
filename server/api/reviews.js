const express = require('express');
const router = express.Router();

const { createReview, getAllReviews, getSingleReview, updateReview, deleteReview } = require('../db/helpers/reviewshelper');

// POST new review
router.post('/', async (req, res, next) => {
    try{
        console.log("Express route: ", req.body);
        const review = await createReview(req.body);
        res.send(review);
    } catch(error) {
        next(error);
    }
});

// GET all reviews
router.get('/', async (req, res, next) => {
    console.log("Request all reviews")
    try{
        const reviews = await getAllReviews();
        res.send(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error"})
    }
});

// GET single review
router.get('/:review_id', async (req, res, next) => {
    try{
        const review = await getSingleReview(req.params.review_id);
        res.send(review);
    } catch (error) {
        next(error);
    }
})

// PUT update review
router.put('/:review_id/edit', async (req, res, next) => {
    const reviewId = req.params.review_id;
    const updatedReview = req.body;
    try{
        const updatedReviewFromDB = await updateReview(reviewId, updatedReview);
        res.status(200).json({message: 'Review post updated successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
});

// DELETE review
router.delete('/:review_id', async (req, res, next) => {
    try{
        const review = await deleteReview(req.params.review_id);
        res.send(review);
    } catch (error) {
        next(error);
    }
});

// export router
module.exports = router;