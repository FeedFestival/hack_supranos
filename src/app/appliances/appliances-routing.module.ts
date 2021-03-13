import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppliancesPage } from "./appliances.page";

const routes: Routes = [
    {
        path: '',
        component: AppliancesPage,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppliancesPageRoutingModule { }
