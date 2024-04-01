const router = require('express').Router();
const { User, Post, Comment } = require('../models');

router.get('/', (req, res) => {
  try {
    const userData = User.findAll({
      attributes: {
        exclude: ['password']
      }
    })

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  try {
    const userData = User.findOne({
      attributes: {
        exclude: ['password']
      },
      include: [{
        model: Post,
        attributes: ['id', 'title', 'content', 'created_at']
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'created_at'],
        include: {
          model: Post,
          attributes: ['title']
        }
      }
    ]
    })

  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', (req, res) => {
  try {
    const userData = User.Create({
      username: req.body.username,
      password: req.body.password
    })
    
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/login', async (req, res) => {
  try {
    // Find the user who matches the posted e-mail address
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Verify the posted password with the password store in the database
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Create session variables based on the logged in user
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // Remove the session variables
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
