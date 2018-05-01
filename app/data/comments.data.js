const Data = require('./generic.data');
const {
    users,
} = require('../../db/models');

class CommentsData extends Data {
    constructor(commentModel) {
        super(commentModel);
    }

    getAllComments(ticket) {
        return ticket.getComments();
    }

    getCommentAndUser(commentId) {
        return this.Model.findOne({
            attributes: { exclude: ['userId', 'ticketId', 'updatedAt'] },
            where: {
                id: commentId,
            },
            include: [
                {
                    model: users,
                    as: 'users',
                    attributes: { exclude: ['password', 'updatedAt', 'createdAt', 'email'] },
                },
            ],
        });
    }
}

module.exports = CommentsData;
