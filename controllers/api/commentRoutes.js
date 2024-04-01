const router = require('express').Router();
const { User,Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    try {
// comment findAll
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', withAuth,(req, res) => {
    try {
// comment create
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;