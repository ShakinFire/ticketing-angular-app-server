class NotificationController {
    constructor(data) {
        this.data = data;
    }


    async createNotification(notification) {
        return await this.data.notifications.create(notification);
    }

    async getNotification(id) {
        return await this.data.notifications.getNotificationByUser(+id);
    }
}
module.exports = NotificationController;