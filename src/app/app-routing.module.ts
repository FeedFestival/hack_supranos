import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './tab1/home.page';
import { ProfilePage } from './tab2/profile.page';
import { RoutinePage } from './tab3/routine.page';

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
	}
];
@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
