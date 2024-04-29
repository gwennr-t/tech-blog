const router = require('express').Router();
const { User,Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// router.get('/', (req, res) => {
//     try {
// // post findAll
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// router.get('/:id', (req, res) => {
//     try {
// // post findOne
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

router.post('/', withAuth, (req, res) => {
    try {
    
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// router.put('/:id', withAuth,(req, res) => {
//     try {
// // post update
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

router.delete('/:id', withAuth,(req, res) => {
    try {
        const postData = Post.destroy({
          where: {
            id: req.params.id
          }, 
        });

      } catch (err) {
        res.status(500).json(err);
      } 
});

module.exports = router;