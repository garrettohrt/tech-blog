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
    var newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    await User.findOne({
        where: {
            username: req.body.username,
            email: req.body.email
        }
    }).then(async profile => {
        if (!profile) {
            await newUser.save()
                .then(() => {
                    res.status(200).send(newUser);
                })
                .catch(err => {
                    console.log("Error is ", err.message);
                });
        } else {
            res.send("User already exists...");
        }
    }).catch(err => {
        console.log("Error is", err.message);
    });
});

router.post('/login', async (req, res) => {

    try {
        const userData = await User.findOne({
            where: {
                username: req.body.username
            }
        });

        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

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
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

  router.put('/:id', async (req, res) => {

    try {
        const userData = await User.update(req.body, {
            individualHooks: true,
            where: {
                id: req.params.id
            }
        });

        if (!userData) {
            res.status(404).json({ message: 'No user found with that id' })
        } else res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err)
    }
});

router.delete('/:id', async (req, res) => {

    try {
        const userData = await User.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!userData) {
            res.status(404).json({ message: 'No user found with that id' })
        } else res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;