const Data = require('./generic.data');

class UsersData extends Data {
    constructor(Model) {
        super(Model);
    }

    findByUserName(username) {
        const currentUser = this.Model.findOne({
            where: {
                userName: username,
            },
        });
        return currentUser;
    }

    
}

module.exports = UsersData;