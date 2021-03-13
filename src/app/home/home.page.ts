import { Component } from '@angular/core';
import { HomeService } from './home.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage {

    debugs: string[] = [];

    constructor(
        private homeService: HomeService
    ) { }

    testEndpoint() {
        const start = 'Start Test';
        this.debugs.push(start);
        this.homeService.testEnpoint()
            .subscribe(response => {
                const resS = 'Enpoint tested: ' + JSON.stringify(response);
                this.debugs.push(resS);
            });
    }
}
