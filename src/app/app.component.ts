import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EventData, Evt } from './app.constants';
import { EventBusService } from './event-bus.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

    stars = [];
    showNiceStars = true;
    showBackButton = false;
    disableAnimations = false;

    pageName: string;
    user = {
        name: 'Rock Roll',
        email: 'rock.roll@forlife.com'
    };

    @ViewChild('menuRef', { static: false }) menuRef: any;

    constructor(
        private router: Router,
        private eventBus: EventBusService
    ) {
        this.eventBus.on(Evt.NAVIGATE, (eventData: EventData) => {
            this.onNavigate(eventData.data.url);
        });
        this.eventBus.emit({ event: Evt.NAVIGATE, data: { url: '/login' } });
    }

    ngOnInit() {

        const randoms = [];
        while (randoms.length < 5) {
            var r = Math.floor(Math.random() * 100) + 1;
            if (randoms.indexOf(r) === -1 || r === 0) randoms.push(r);
        }

        for (let i = 1; i <= 4; i++) {
            this.stars.push({
                deg: randoms[i],
                class: 'star' + i
            });
        }
        this.rotateStars();

        if (this.disableAnimations) {
            return;
        }

        setInterval(this.rotateStars, 100);
    }

    private rotateStars = () => {
        for (let i = 0; i < this.stars.length; i++) {
            this.rotate(this.stars[i]);
        }
    }

    private rotate(star) {
        star.style = "rotate(" + star.deg + "deg)";
        star.deg = (star.deg + 10) % 360;
    }

    onNavigate(path: string) {

        if (this.menuRef && this.menuRef.isOpen()) {
            this.menuRef.close();
        }

        this.showNiceStars = path === '/';
        this.showBackButton = this.showNiceStars
            ? false
            : (path !== '/login');

        this.setName(path);

        this.router.navigateByUrl(path);
    }

    private setName(path: string) {
        if (path === '/') {
            return;
        }

        switch (path) {
            case '/profile':
                this.pageName = 'My Profile';
                break;
            case '/appliances':
                this.pageName = 'My Appliances';
                break;
            case '/routine':
                this.pageName = 'My Routine';
                break;
            case '/sleep-facts':
                this.pageName = 'Our Sleep Facts';
                break;
            case '/alarm':
                this.pageName = 'My Alarms';
                break;
            case '/login':
                this.pageName = 'Log In';
                break;
        }
    }
}
