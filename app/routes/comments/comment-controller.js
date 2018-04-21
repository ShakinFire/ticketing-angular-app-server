class CommentController {
    constructor(data) {
        this.data = data;
    }

    async allComments(ticketId) {
        const ticket = await this.data.tickets.getById(ticketId);

        return await this.data.comments.getAllComments(ticket);
    }
}

module.exports = CommentController;
