const Data = require('./generic.data');

class UsersData extends Data {
    constructor(userModel) {
        super(userModel);
    }

    findByUserName(username) {
        const currentUser = this.Model.findOne({
            where: {
                userName: username,
            },
        });

        return currentUser;
    }

    getByEmail(email) {
        return this.Model.findOne({
            where: {
                email: email,
            },
        });
    }
}

module.exports = UsersData;
