const Ccontroller = require('./comment-controller');
const { Router } = require('express');
const passport = require('passport');

const init = (app, data) => {
    const CommentController = new Ccontroller(data);
    const router = new Router();

    app.use('/api', router);

    router
        .get('/getAllCommentsByTicketId', async (req, res) => {
            // Mocked ticketId.
            // When front end is connected it should come
            // from query params and it have to be parsed to int
            const ticketId = 1;

            const result = await CommentController.allComments(ticketId);

            res.json({
                result,
            });
        })
        .post('/createComment', passport.authenticate('jwt', { session: false }), async (req, res) => {
            const commentContent = req.body;
            const comment = await CommentController.createComment(commentContent);

            res.json({
                comment,
            });
        });
};

module.exports = {
    init,
};
