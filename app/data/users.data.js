const Data = require('./generic.data');
const {
    teams,
} = require('../../db/models');
const sequelize = require('sequelize');
const Op = sequelize.Op;

class UsersData extends Data {
    constructor(userModel) {
        super(userModel);
    }

    findByUserName(username) {
        let user = username.split(' ');
        let firstName = user[0];
        let lastName = user[1];
        const currentUser = this.Model.findOne({
            where: {
                firstName: firstName,
                lastName: lastName
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

    getAllById(id) {
        return this.Model.findAll({
            where: {
                id: id,
            },
        });
    }

    findOneByIdUser(id) {
        return this.Model.findOne({
            attributes: { exclude: ['password', 'updatedAt', 'createdAt'] },
            where: {
                id: id,
            },
        });
    }

    getAllAddMembers(userIds) {
        return this.Model.findAll({
            attributes: { exclude: ['password', 'updatedAt', 'createdAt', 'email'] },
            where: {
                id: {
                    [Op.notIn]: userIds,
                },
            },
        });
    }
}

module.exports = UsersData;