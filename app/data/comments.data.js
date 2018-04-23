const Data = require('./generic.data');

class CommentsData extends Data {
    constructor(commentModel) {
        super(commentModel);
    }

    getAllComments(ticket) {
        return ticket.getComments();
    }
}

module.exports = CommentsData;
