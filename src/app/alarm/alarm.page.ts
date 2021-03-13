import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

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
        handler: () => { 
          this.router.navigate(['/alarm'])
        }
      }, {
        text: 'Next',
        handler:(value:any) => {
          const extras: NavigationExtras = {
            state: {
              wakeHour: value
            }
          }
          this.router.navigate(['/review-alarm'], extras)
        }
      }]
    }
  }

}
