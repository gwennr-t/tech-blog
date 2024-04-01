const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    try {
        const userData = User.findAll({
          where: {
            user_id: req.session.user_id
          },  
          attributes: [ 'id', 'title', 'content'],
          include: [{
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id']
          },
          {
            model: User,
            attributes: ['username']
          },
        ]
        });
    
        const users = userData.map((post) => post.get({ plain: true }));
    
        res.render('dashboard', {
          users,
          logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/edit/:id', withAuth, (req, res) => {
    try {
        const postData = Post.findAll({
          where: {
            id: req.session.id
          }, 
          attributes: [ 'id', 'title', 'content'],
          include: [{
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id']
          },
          {
            model: User,
            attributes: ['username']
          },
        ]
        });
    
        const posts = postData.map((post) => post.get({ plain: true }));
    
        res.render('editPost', {
          posts,
          logged_in: req.session.logged_in,
        });
      } catch (err) {
        res.status(500).json(err);
      } 
});

router.get('/new', withAuth, (req, res) => {
    res.render('addPost', {
        logged_in: true
    })
});

module.exports = router;