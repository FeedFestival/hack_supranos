import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EventData, Evt } from './app.constants';

@Injectable({
    providedIn: 'root'
})
export class EventBusService {
    private subject = new Subject<any>();

    constructor() { }

    on(event: Evt, onEventAction: any, eventFilter: (p: EventData) => boolean = () => true): Subscription {
        return this.subject
            .pipe(
                filter((e: EventData) => {
                    return e.event === event && eventFilter(e);
                }),
                map((ev: EventData) => {
                    return ev;
                })
            )
            .subscribe(onEventAction);
    }

    emit(event: EventData): void {
        this.subject.next(event);
    }
}
