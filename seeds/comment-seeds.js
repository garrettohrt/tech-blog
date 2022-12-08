const { Comment } = require('../models');

const commentdata = [
    {
        comment_text: 'They are awesome!',
        user_id: 1,
        post_id: 1
    },
    {
        comment_text: 'Thank you for explaining the difference between authentication and authorization.',
        user_id: 2,
        post_id: 2
    },
    {
        comment_text: 'I have been enjoying learning about the MVC paradigm!',
        user_id: 3,
        post_id: 3
    }
];

const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;