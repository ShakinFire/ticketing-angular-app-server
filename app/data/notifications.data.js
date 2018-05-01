const Data = require('./generic.data');

class NotificationsData extends Data {
    constructor(NotificationModel) {
        super(NotificationModel);
    }
    getNotificationByUser(id) {
        return this.Model.findAll({
            where: {
                userId: id
            }
        });
    }
}

module.exports = NotificationsData;