import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AlarmPage } from './alarm/alarm.page';
import { AppliancesPage } from './appliances/appliances.page';
import { HomePage } from './home/home.page';
import { LoginPage } from './login/login.page';
import { ProfilePage } from './profile/profile.page';
import { RoutinePage } from './routine/routine.page';
import { SleepFactsPage } from './sleep-facts/sleep-facts.page';

const routes: Routes = [
	{
		path: '',
		component: HomePage
	},
	{
		path: 'profile',
		component: ProfilePage
	},
	{
		path: 'routine',
		component: RoutinePage
	},
	{
		path: 'appliances',
		component: AppliancesPage
	},
    {
		path: 'sleep-facts',
		component: SleepFactsPage
	},
	{
		path: 'alarm',
		component: AlarmPage
	},
	{
		path: 'login',
		component: LoginPage
	}
];
@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
