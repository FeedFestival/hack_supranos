import { Component, OnInit } from '@angular/core';
import { RoutineService } from './routine.service';

@Component({
    selector: 'app-routine',
    templateUrl: 'routine.page.html',
    styleUrls: ['routine.page.scss']
})
export class RoutinePage implements OnInit {

    groups = [];
    shownGroup;
    gradientHeight = '';
    margin = '';

    routineNames = {
        wakeUp: 'Wake Up',
        lastNap: 'Last Nap',
        lastCoffee: 'Last Coffe',
        lastHeavyMeal: 'Last Heavy Meal',
        lastWorkout: 'Last Workout',
        lastDrink: 'Last Drink',
        goToSleep: 'Go To Sleep'
    };

    constructor(
        private routineService: RoutineService
    ) { }

    ngOnInit() {

        const fullSpace = 100;
        const hours = 24;
        const percentPerHour = fullSpace / hours;

        this.routineService.getRoutines()
            .subscribe(result => {
                this.groups = result.events;

                const hours = this.groups.length;
                const percent = fullSpace / hours;

                let totalPercent = 0;

                const today = new Date();
                const hour = today.getHours();
                // const hour = 19;
                let firstNotPassedFound = false;

                for (var i = 0; i < this.groups.length; i++) {
                    const g = this.groups[i];
                    g.id = i;

                    g.hour = parseInt(g.time.substring(0, 2), 10);
                    g.minutes = g.time.substring(3, 5);

                    if (hour > g.hour) {
                        g.class = "passed";
                    } else if (firstNotPassedFound === false) {
                        firstNotPassedFound = true;
                        g.isOnFirstNotPassed = true;
                        g.class = 'next-in-line';
                    }

                    g.label = g.hour + ':' + g.minutes + ' - ' + this.routineNames[g.code];

                    const isLast = i == this.groups.length - 1;
                    if (isLast) {
                        totalPercent += percentPerHour;
                        g.percent = percentPerHour;
                        g.class = 'last';
                        continue;
                    }

                    const nextI = i + 1;
                    const nextG = this.groups.length > nextI ? this.groups[nextI] : null;
                    if (nextG) {
                        nextG.hour = parseInt(nextG.time.substring(0, 2), 10);
                        const diff = nextG.hour - g.hour;
                        const newPerc = (diff * percent);
                        totalPercent += newPerc;
                        g.percent = newPerc;
                    }
                }

                const houMuchPercOf = Math.floor(this.percentage(fullSpace, totalPercent));
                const reverse = 100 - houMuchPercOf;

                let finalPercentValue = 0;

                this.groups.forEach(g => {

                    const subtract = (g.percent * reverse) / 100;
                    g.percent = Math.floor(g.percent - subtract);
                    g.height = g.percent + '%';

                    if (g.isOnFirstNotPassed) {
                        this.margin = finalPercentValue + '%';
                        const myPercentage = 100 - finalPercentValue;
                        this.gradientHeight = myPercentage + '%';
                    }

                    finalPercentValue += g.percent;
                });

                const finalDiff = 100 - finalPercentValue;
                const lastOfGroups = this.groups[this.groups.length - 1];
                lastOfGroups.percent += finalDiff;

                const biggestPercent =
                    Math.max.apply(Math, this.groups.map(function (o) { return o.percent; }));
                const biggestIndex = this.groups.findIndex(g => g.percent === biggestPercent);
                const biggestOfTheGroup = this.groups[biggestIndex];
                biggestOfTheGroup.percent -= 1;
                biggestOfTheGroup.height = biggestOfTheGroup.percent + '%';

                lastOfGroups.height = lastOfGroups.percent + 1 + '%';
            });
    }

    private percentage(partialValue, totalValue) {
        return (100 * partialValue) / totalValue;
    }


}
