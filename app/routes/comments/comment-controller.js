class CommentController {
    constructor(data) {
        this.data = data;
    }

    async allComments(ticketId) {
        const ticket = await this.data.tickets.getById(ticketId);

        return await this.data.comments.getAllComments(ticket);
    }

    async createComment(commentContent) {
        console.log(commentContent);
        const newComment = await this.data.comments.create(commentContent);
        const commentAndUser = await this.data.comments.getCommentAndUser(newComment.id);
        this.data.tickets.updateTotalComments(commentContent.ticketId);
        return commentAndUser;
    }
}

module.exports = CommentController;
