import { NotificationComponent } from '../components/notification';
import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {

    constructor(private notification: NotificationComponent) {
    }

    showNotification(message) {
        this.notification.showNotification(message);
    }
}