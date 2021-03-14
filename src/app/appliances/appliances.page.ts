import { Component, OnInit } from "@angular/core";
import { AppliancesService } from "./appliances.services";


@Component({
    selector: 'app-appliances',
    templateUrl: 'appliances.page.html',
    styleUrls: ['appliances.page.scss']
})
export class AppliancesPage implements OnInit {
    appliences: any;

    constructor(private appliancesService: AppliancesService) {
    }

    ngOnInit(): void {
        this.appliancesService.getDevices().subscribe((val) => {
            this.appliences = val
;        })
    }

}