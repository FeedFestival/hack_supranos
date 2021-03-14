import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Evt } from 'src/app/app.constants';
import { EventBusService } from 'src/app/event-bus.service';
import { weekDaysEnum } from 'src/app/shared/weekDaysEnum';
import { AlarmService } from '../alarm.page.service';
import { AlertController } from '@ionic/angular';

export interface IForm {
    text: string,
    isChecked: boolean,
    value: any
}

@Component({
    selector: 'app-review-alarm',
    templateUrl: 'review-alarm.page.html',
    styleUrls: ['review-alarm.page.scss']
})

export class ReviewAlarmPage {
  public form: IForm[] = [
    { text: 'Monday', isChecked: true, value: '1990-02-19T07:43Z' },
    { text: 'Tuesday', isChecked: true, value: '1990-02-19T07:43Z' },
    { text: 'Wednesday', isChecked: true, value: '1990-02-19T07:43Z' },
    { text: 'Thursday', isChecked: true, value: '1990-02-19T07:43Z' },
    { text: 'Friday', isChecked: true, value: '1990-02-19T07:43Z' },
    { text: 'Saturday', isChecked: true, value: '1990-02-19T07:43Z' },
    { text: 'Sunday', isChecked: true, value: '1990-02-19T07:43Z' }
  ];
  weekAlarm: any;

  constructor(private route: ActivatedRoute, private router: Router, private alarmService: AlarmService,
    private eventBus: EventBusService, private alertController: AlertController) {
    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        if (this.router.getCurrentNavigation().extras.state.wakeHour) {
        this.form.forEach((entry) => {
            entry.value = this.router.getCurrentNavigation().extras.state.wakeHour;
          });
        } else {
          this.weekAlarm = this.router.getCurrentNavigation().extras.state.weekAlarm;
          this.form[0].value = this.weekAlarm['monday'].nextDayAlarm;
          this.form[1].value = this.weekAlarm['tuesday'].nextDayAlarm;
          this.form[2].value = this.weekAlarm['wednesday'].nextDayAlarm;
          this.form[3].value = this.weekAlarm['thursday'].nextDayAlarm;
          this.form[4].value = this.weekAlarm['friday'].nextDayAlarm;
          this.form[5].value = this.weekAlarm['saturday'].nextDayAlarm;
          this.form[6].value = this.weekAlarm['sunday'].nextDayAlarm;
        }
      }
    });
  }

  saveAlarm(): void {
    let req = { id: 1}
      this.form.forEach(element => {
        let nextDayAlarm = element.value.hour ? `${element.value.hour.value}:${element.value.minute.value}` : element.value;
        let hourArray = nextDayAlarm.split(':');
        let bedTime = `${this.convertToDoubleDigit(Math.abs(hourArray[0] - 8))}:${hourArray[1]}`
        req[element.text.toLowerCase()] = {
          id: weekDaysEnum[element.text.toLowerCase()],
          weekDay: element.text.toUpperCase(),
          bedTime: bedTime,
          nextDayAlarm: nextDayAlarm
        }
    });

    if (this.weekAlarm) {
      this.alarmService.updateSchedule(req).subscribe(() => {
        this.eventBus.emit({ event: Evt.NAVIGATE, data: { url: '/' } });
      });
    } else {
      this.alarmService.createSchedule(req).subscribe(() => {
        this.eventBus.emit({ event: Evt.NAVIGATE, data: { url: '/' } });
      });
    }
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Warning!',
        message: 'For sleep to work its magic, your schedule should not have any variations.',
        buttons: [
            {
                text: 'Okay',
                handler: () => {
                    console.log('Confirm Okay');
                }
            }
        ]
    });

    await alert.present();
}

  private convertToDoubleDigit(n: number) {
    return ('00' + n).slice(-2);
}
}
