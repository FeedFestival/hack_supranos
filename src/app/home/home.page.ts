import { Component, OnDestroy, OnInit } from '@angular/core';
import { Evt } from '../app.constants';
import { EventBusService } from '../event-bus.service';
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

    debugs: string[] = [];

    constructor(
        private eventBus: EventBusService,
        private homeService: HomeService
    ) {
    }

    ngOnInit() {
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
