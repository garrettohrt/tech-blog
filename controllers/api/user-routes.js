const router = require('express').Router();
const { User, Post, Comment } = require('../../models')

router.get('/', async (req, res) => {

    try {
        const userData = await User.findAll({
            attributes: { exclude: ['password'] }
        });

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/:id', async (req, res) => {

    try {
        const userData = await User.findOne({
            attributes: { exclude: ['password'] },
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: Post,
                    attributes: ['id', 'title', 'created_at']
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
        });
        if (!userData) {
            res.status(404).json({ message: 'No user found with that id' })
        } else res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err)
    }
});

router.post('/', async (req, res) => {

    try {
        const userData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            
            res.status(200).json(userData);
        })

        
    } catch (err) {
        res.status(400).json({ message: 'failed to create user' })
    }
});

router.post('/signup', async (req, res) => {

    try {
        const userData = await User.create(req.body);

        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json({ message: 'failed to create user' })
    }
});

router.post('/login', async (req, res) => {

    try {
        const userData = await User.create(req.body);

        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json(err)
    }
});

router.post('/logout', async (req, res) => {

    try {
        const userData = await User.create(req.body);

        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json(err)
    }
});

module.exports = router;