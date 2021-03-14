import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { weekDaysEnum } from 'src/app/shared/weekDaysEnum';
import { AlarmService } from '../alarm.page.service';

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

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private alarmService: AlarmService,
        private alertController: AlertController
        ) {
        this.route.queryParams.subscribe(() => {
            if (this.router.getCurrentNavigation().extras.state) {
                this.form.forEach((entry) => {
                    entry.value = this.router.getCurrentNavigation().extras.state.wakeHour;
                })
            }
        });
    }

    saveAlarm(): void {
        let req = { id: 1 }
        this.form.forEach(element => {
            const nextDayAlarm = this.convertTime12to24(element.value);
            req[element.text.toLowerCase()] = {
                id: weekDaysEnum[element.text.toLowerCase()],
                weekDay: element.text.toUpperCase(),
                bedTime: null,
                nextDayAlarm: nextDayAlarm
            }
        });

        this.alarmService.createSchedule(req).subscribe((value) => {
            this.router.navigate(['/'])
        });
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

    private convertTime12to24(time12h): any {
        let hours = time12h.hour.value;
        let minutes = time12h.minute.value;

        if (hours === '12') {
            hours = '00';
        }

        if (time12h.ampm.text === 'PM') {
            hours = parseInt(hours, 10) + 12;
        }

        return `${hours}:${minutes}`;
    }
}
