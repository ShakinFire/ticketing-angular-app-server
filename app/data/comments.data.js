const Data = require('./generic.data');

class CommentsData extends Data {
    constructor(Model) {
        super(Model);
    }

    getCommentsOnTicket(id) {
        return this.Model.findAll({
            where: {
                ticket: id,
            },
        });
    }
}

module.exports = CommentsData;