const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth')

router.get('/', withAuth, async (req, res) => {

    try {
        const postData = await Post.findAll({
            attributes: [
                'id',
                'title',
                'description',
                'created_at'
            ],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });

        const posts = postData.map(post => post.get({ plain: true }));
        res.render('home', { posts, loggedIn: req.session.loggedIn });
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/post/:id', withAuth, async (req, res) => {

    try {
        const postData = await Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'title',
                'description',
                'created_at'
            ],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with that id' });
        } else {
            const post = postData.get({ plain: true });

            res.render('one-post', {
                post,
                loggedIn: req.session.loggedIn
            });
        };

    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.get('/signup', (req, res) => {
    if (!req.session.loggedIn) {
        res.render('signup');
    } else {
        res.redirect('/');
    }
});

module.exports = router;