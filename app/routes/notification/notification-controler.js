class NotificationController {
    constructor(data) {
        this.data = data;
    }


    async createNotification(notification) {
        console.log(notification);
        return await this.data.notifications.create(notification);
    }

    async getNotification(id) {
        return await this.data.notifications.getNotificationByUser(+id);
    }
    async updateTypeNotification(id) {
        return await this.data.notifications.updateType(id);
    }
}
module.exports = NotificationController;