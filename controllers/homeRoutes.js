const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
  try {
    const userData = User.findAll({
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

    res.render('homepage', {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// unfinished - post routes with comments
router.get('/post/:id', (req,res) => {
  try {
    const postData = Post.findAll({
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

    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }

});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;