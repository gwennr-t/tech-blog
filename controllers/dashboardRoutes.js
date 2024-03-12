const router = require('express').Router();
const { User,Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    
});

router.put('/createnew/:id', withAuth, (req, res) => {
    
});

router.get('/edit/:id', withAuth, (req, res) => {
    
});

router.destroy('/delete/:id', withAuth, (req, res) => {

});