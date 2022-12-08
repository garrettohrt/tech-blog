const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async(req, res) => {
    try {
        const commentData = Comment.findAll()
        res.status(200).json(commentData)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.post('/', withAuth, async(req, res) => {
    try {
        const commentData = Comment.create({
            comment_text: req.body.comment_text,
            user_id: req.session.user_id,
            post_id: req.body.post_id
        })
        res.status(200).json(commentData)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.delete('/:id', withAuth, async(req, res) => {
    try {
        const commentData = Comment.destroy({
            where: {
                id: req.params.id
            }
        })
        if (!commentData) {
            res.status(404).json({ message: 'No comment found with that id' })
        } else res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;