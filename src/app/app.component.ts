import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

    stars = [];

    constructor() { }

    ngOnInit() {

        const randoms = [];
        while (randoms.length < 4) {
            var r = Math.floor(Math.random() * 100) + 1;
            if (randoms.indexOf(r) === -1) randoms.push(r);
        }

        for (let i = 1; i <= 4; i++) {
            this.stars.push({
                class: 'star' + i,
                style: 'rotate(' + randoms[i] + 'deg)'
            });
        }
    }
}
