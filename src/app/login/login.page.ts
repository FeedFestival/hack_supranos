import { Component } from "@angular/core";
import { Evt } from "../app.constants";
import { EventBusService } from "../event-bus.service";

@Component({
    templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})

export class LoginPage {

    constructor(private eventBus: EventBusService) {}

    logIn() {
        this.navigate('/');
    }

    navigate(path: string) {
        this.eventBus.emit({ event: Evt.NAVIGATE, data: { url: path } });
    }
}