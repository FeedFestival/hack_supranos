import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { ExploreContainerComponentModule } from "../explore-container/explore-container.module";
import { AppliancesPageRoutingModule } from "./appliances-routing.module";
import { AppliancesPage } from "./appliances.page";

@NgModule({
    imports: [
      IonicModule,
      CommonModule,
      FormsModule,
      ExploreContainerComponentModule,
      AppliancesPageRoutingModule
    ],
    declarations: [AppliancesPage]
  })
  export class AppliancesPageModule {}