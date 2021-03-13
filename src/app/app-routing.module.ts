import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppliancesPage } from './appliances/appliances.page';
import { HomePage } from './home/home.page';
import { ProfilePage } from './profile/profile.page';
import { RoutinePage } from './routine/routine.page';

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
	}
];
@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
