const Data = require('./generic.data');

class NotificationsData extends Data {
    constructor(NotificationModel) {
        super(NotificationModel);
    }
    getNotificationByUser(id) {
        return this.Model.findAll({
            attributes: {
                exclude: ['updatedAt']
            },
            where: {
                userId: id,
            },
        });
    }
    updateType(id) {
        return this.Model.update({
            type: 'viewTeam',
        }, {
            where: {
                id: id,
            }
        });
    }
}

module.exports = NotificationsData;