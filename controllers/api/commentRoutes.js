const router = require('express').Router();
const { User,Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    try {
        const commentData = Comment.findAll()

        const comments = commentData.map((comment) => comment.get({ plain: true }));
        res.render('', {
            comments
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', withAuth,(req, res) => {
    try {
        const commentData = Comment.Create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id,
        })

        const comments = commentData.map((comment) => comment.get({ plain: true }));
        res.render('', {
            comments
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;