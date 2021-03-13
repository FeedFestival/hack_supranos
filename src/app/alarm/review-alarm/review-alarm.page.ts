import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-review-alarm',
  templateUrl: 'review-alarm.page.html',
  styleUrls: ['review-alarm.page.scss']
})
export class ReviewAlarmPage {
  public form = [
    { text: 'Monday', isChecked: true, value: '1990-02-19T07:43Z' },
    { text: 'Tuesday', isChecked: true, value: '1990-02-19T07:43Z' },
    { text: 'Wednesday', isChecked: true, value: '1990-02-19T07:43Z' },
    { text: 'Thursday', isChecked: true, value: '1990-02-19T07:43Z' },
    { text: 'Friday', isChecked: true, value: '1990-02-19T07:43Z' },
    { text: 'Saturday', isChecked: true, value: '1990-02-19T07:43Z' },
    { text: 'Sunday', isChecked: true, value: '1990-02-19T07:43Z' }
  ];

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.form.forEach((entry) => {
          entry.value = this.router.getCurrentNavigation().extras.state.wakeHour;
        })
      }
    });
  }

  saveAlarm(): void {

  }
}
