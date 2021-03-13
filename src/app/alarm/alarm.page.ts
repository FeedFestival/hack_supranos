import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alarm',
  templateUrl: 'alarm.page.html',
  styleUrls: ['alarm.page.scss']
})
export class AlarmPage {
 customPickerOptions: any;

  constructor(private router: Router) {
    this.customPickerOptions = {
      buttons: [{
        text: 'Cancel',
        handler: () => { return false; }
      }, {
        text: 'Next',
        handler:(value:any) => {
          console.log(value);
          this.router.navigate(['/review-alarm'], {state: value})
        }
      }]
    }
  }

}
