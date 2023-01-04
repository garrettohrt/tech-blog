const router = require('express').Router();
const { Post, User, Comment } = require('../../models')
const sequelize = require('../../config/connection')
const withAuth = require('../../utils/auth')

router.get('/', async (req, res) => {

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

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/:id', async (req, res) => {

    try {
        const postData = await Post.findOne({
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
            res.status(404).json({ message: 'No post found with that id' })
        } else res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err)
    }
});

router.post('/', withAuth, async (req, res) => {
    try {
        const postData = Post.create({
            title: req.body.title,
            description: req.body.description,
            user_id: req.session.user_id
        });
        console.log("post data",postData)
        res.status(200).json(postData)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const postData = Post.update(
            {
                title: req.body.title,
                description: req.body.description
            },
            {
                where: {
                    id: req.params.id
                }
            }
        )
        if (!postData) {
            res.status(404).json({ message: 'No post found with that id' })
        } else res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err)
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = Post.destroy(
            {
                where: {
                    id: req.params.id
                }
            }
        )
        if (!postData) {
            res.status(404).json({ message: 'No post found with that id' })
        } else res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router