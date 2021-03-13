import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review-alarm',
  templateUrl: 'review-alarm.page.html',
  styleUrls: ['review-alarm.page.scss']
})
export class ReviewAlarmPage {
  defaultTime: any;
  public form = [
    { text: 'Monday', isChecked: true, value: '1990-02-19T07:43Z' },
    { text: 'Tuesday', isChecked: true, value: '1990-02-19T07:43Z' },
    { text: 'Wednesday', isChecked: true, value: '1990-02-19T07:43Z' },
    { text: 'Thursday', isChecked: true, value: '1990-02-19T07:43Z' },
    { text: 'Friday', isChecked: true, value: '1990-02-19T07:43Z' },
    { text: 'Saturday', isChecked: true, value: '1990-02-19T07:43Z' },
    { text: 'Sunday', isChecked: true, value: '1990-02-19T07:43Z' }
  ];

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.defaultTime = navigation.extras.state;

  }

  saveAlarm(): void {

  }
}
