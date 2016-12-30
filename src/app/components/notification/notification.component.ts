import { Component } from '@angular/core';

@Component({
  selector: 'notification',
  styleUrls: ['./notification.component.css'],
  templateUrl: './notification.component.html',
  providers: [],
})
export class NotificationComponent {

  static instance: NotificationComponent;
  message: string = '';
  showMes: boolean = false;

  constructor() {
    return NotificationComponent.instance = NotificationComponent.instance || this;
  }

  showNotification(mes: string) {
    if (this.showMes)
      this.message += '. ' + mes;
    else {
      this.message = mes;
      this.showMes = true;
    }

  }

  hideNotification() {
    this.showMes = false;
  }
}
