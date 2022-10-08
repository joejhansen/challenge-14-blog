const router = require('express').Router();
const { Project, User } = require('../../models');
const withAuth = require('../../utils/auth')

router.get('/', async (req, res) => {
    try {
        const postsData = await Project.findAll({
            include: [
                {
                    model: User,
                    attributes: ['id', 'name']
                },
            ],
        });
        const posts = postsData.map((posts) =>
            posts.get({ plain: true })
        );

        if (posts) {
            res.render('homepage', {
                posts: posts,
                logged_in: req.session.logged_in
            })
        } else {
            res.status(500).json({ message: `Something went wrong with the databse.` })
        }

        // res.json(project)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;