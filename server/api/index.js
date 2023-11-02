// import express and invoke it to create a router
const express = require('express');
const router = express.Router();

// GET /api/health
router.get('/health', (req, res, next) => {
    res.send('OK');
});

// setting up route prefixes for each section of your app
router.use('/users', require('./users'));
router.use('/blogs', require('./blogs'));
router.use('/reviews', require('./reviews'));
router.use('/projects', require('./projects'));

module.exports = router;