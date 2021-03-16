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
    { text: 'Monday', isChecked: true, value: '' },
    { text: 'Tuesday', isChecked: true, value: '' },
    { text: 'Wednesday', isChecked: true, value: '' },
    { text: 'Thursday', isChecked: true, value: '' },
    { text: 'Friday', isChecked: true, value: '' },
    { text: 'Saturday', isChecked: true, value: '' },
    { text: 'Sunday', isChecked: true, value: '' }
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
          this.form[0].value = this.weekAlarm[weekDaysEnum[1]] ? this.weekAlarm[weekDaysEnum[1]].nextDayAlarm : '00:00:00';
          this.form[1].value = this.weekAlarm[weekDaysEnum[2]] ? this.weekAlarm[weekDaysEnum[2]].nextDayAlarm : '00:00:00';
          this.form[2].value = this.weekAlarm[weekDaysEnum[3]] ? this.weekAlarm[weekDaysEnum[3]].nextDayAlarm : '00:00:00';
          this.form[3].value = this.weekAlarm[weekDaysEnum[4]] ? this.weekAlarm[weekDaysEnum[1]].nextDayAlarm : '00:00:00';
          this.form[4].value = this.weekAlarm[weekDaysEnum[5]] ? this.weekAlarm[weekDaysEnum[1]].nextDayAlarm : '00:00:00';
          this.form[5].value = this.weekAlarm[weekDaysEnum[6]] ? this.weekAlarm[weekDaysEnum[1]].nextDayAlarm : '00:00:00';
          this.form[6].value = this.weekAlarm[weekDaysEnum[0]] ? this.weekAlarm[weekDaysEnum[1]].nextDayAlarm : '00:00:00';

          this.form[0].isChecked = this.weekAlarm[weekDaysEnum[1]] ? true : false;
          this.form[1].isChecked = this.weekAlarm[weekDaysEnum[2]] ? true : false;
          this.form[2].isChecked = this.weekAlarm[weekDaysEnum[3]] ? true : false;
          this.form[3].isChecked = this.weekAlarm[weekDaysEnum[4]] ? true : false;
          this.form[4].isChecked = this.weekAlarm[weekDaysEnum[5]] ? true : false;
          this.form[5].isChecked = this.weekAlarm[weekDaysEnum[6]] ? true : false;
          this.form[6].isChecked = this.weekAlarm[weekDaysEnum[0]] ? true : false;

        }
      }
    });
  }

  saveAlarm(): void {
    let req = { id: 1}
    this.form.filter(v => v.isChecked);
      this.form.forEach(element => {
        let nextDayAlarm = element.value.hour ? `${element.value.hour.text}:${element.value.minute.text}:${element.value.second.text}` : element.value;
        let hourArray = nextDayAlarm.split(':');
        let bedTime = `${this.convertToDoubleDigit(Math.abs(hourArray[0] - 8))}:${hourArray[1]}`
        req[element.text.toLowerCase()] = {
          id: this.setDayDbCorespondingId(element),
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

  private setDayDbCorespondingId(element: any): any {
    let dayId;
    switch (element.text.toLowerCase()) {
      case weekDaysEnum[1]:
        dayId = 89;
        break;
      case weekDaysEnum[2]:
        dayId = 93;
        break;
      case weekDaysEnum[3]:
        dayId = 94;
        break;
      case weekDaysEnum[4]:
        dayId = 92;
        break;
      case weekDaysEnum[5]:
        dayId = 88;
        break;
      case weekDaysEnum[6]:
        dayId = 90;
        break;
      case weekDaysEnum[7]:
      default:
        dayId = 91;
        break;
    }
    return dayId;
}
}
