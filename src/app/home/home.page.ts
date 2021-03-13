import { Component } from '@angular/core';
import { HomeService } from './home.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage {

    urls = [
        '134a7098ec82.ngrok.io',
    ];

    debugs: string[] = [];

    constructor(
        private homeService: HomeService
    ) { }

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
}
