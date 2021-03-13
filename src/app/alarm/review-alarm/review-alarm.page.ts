import { Component } from '@angular/core';

@Component({
  selector: 'app-review-alarm',
  templateUrl: 'review-alarm.page.html',
  styleUrls: ['review-alarm.page.scss']
})
export class ReviewAlarmPage {

  constructor() {}
  public form = [
    { val: 'M', isChecked: true },
    { val: 'T', isChecked: true },
    { val: 'W', isChecked: true },
    { val: 'T', isChecked: true },
    { val: 'F', isChecked: true },
    { val: 'S', isChecked: true },
    { val: 'S', isChecked: true }
  ];
}
