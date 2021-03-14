import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Evt } from '../app.constants';
import { EventBusService } from '../event-bus.service';
import { weekDaysEnum } from '../shared/weekDaysEnum';
import { HomeService } from './home.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit, OnDestroy {

    urls = [
        '134a7098ec82.ngrok.io',
    ];

    appliances = [];
    alarm: any = {};
    weekAlarm: any;

    debugs: string[] = [];

    constructor(
        private eventBus: EventBusService,
        private homeService: HomeService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.homeService.getSchedule().subscribe((value) => {
            const todayDay = (new Date()).getDay();
            this.weekAlarm = value;
            this.alarm = value[weekDaysEnum[todayDay]];
        })
    }

    prepareToSleep(): void {
        this.homeService.triggerSleepNow().pipe(take(1)).subscribe();
    }

    testEndpoint(addr: string) {
        const start = 'Start Test';
        this.debugs.push(start);
        this.homeService.testEnpoint(addr)
            .subscribe(response => {
                const resS = 'Enpoint tested: ' + JSON.stringify(response);
                this.debugs.push(resS);
            }, (err?: any) => {
                this.debugs.push('[ ERROR ]' + JSON.stringify(err));
            });
    }

    setAlarm(): void {
        if (!this.alarm) {
            this.navigate('/alarm')
        } else {
            const params: NavigationExtras = {
                state: {
                    weekAlarm: this.weekAlarm
                }
            }
            this.router.navigate(['/review-alarm'], params);
        }
    } 

    clear() {
        this.debugs = [];
    }

    navigate(path: string) {
        this.eventBus.emit({ event: Evt.NAVIGATE, data: { url: path } });
    }

    ngOnDestroy() {
        console.log('');
    }

    
}
