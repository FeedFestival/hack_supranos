import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoutinePage } from './routine.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { RoutinePageRoutingModule } from './routine-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: RoutinePage }]),
    RoutinePageRoutingModule,
  ],
  declarations: [RoutinePage]
})
export class RoutinePageModule {}
