import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { AlarmPage } from './alarm.page';
import { AlarmPageRoutingModule } from './alarm-routing.module';
import { ReviewAlarmPage } from './review-alarm/review-alarm.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: AlarmPage }]),
    AlarmPageRoutingModule,
  ],
  declarations: [AlarmPage, ReviewAlarmPage]
})
export class AlarmPageModule {}
