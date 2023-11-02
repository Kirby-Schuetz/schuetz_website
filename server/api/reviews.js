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
    try{
        const reviews = await getAllReviews();
        res.send(reviews);
    } catch (error) {
        next(error);
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
router.put('/:review_id', async (req, res, next) => {
    try{
        const review = await updateReview(req.params.review_id, req.body);
        res.send(review);
    } catch (error) {
        next(error);
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