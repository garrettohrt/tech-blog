const router = require('express').Router();
const { User } = require('../../models')

router.post('/signup', async (req, res) => {

    try{
        const userData = await User.create(req.body);

        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json({ message: 'failed to create user' })
    }
});

router.post('/login', async (req, res) => {

    try{
        const userData = await User.create(req.body);

        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json(err)
    }
});

router.post('/logout', async (req, res) => {

    try{
        const userData = await User.create(req.body);

        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json(err)
    }
});

module.exports = router;