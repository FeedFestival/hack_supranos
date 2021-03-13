import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlarmPage } from './alarm.page';
import { ReviewAlarmPage } from './review-alarm/review-alarm.page';

const routes: Routes = [
  {
    path: 'alarm',
    component: AlarmPage,
  },
  {
    path: 'review-alarm',
    component: ReviewAlarmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlarmPageRoutingModule {}
