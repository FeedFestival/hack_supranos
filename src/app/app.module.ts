import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AlarmPageModule } from './alarm/alarm.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppliancesPageModule } from './appliances/appliances.module';
import { HomePageModule } from './home/home.module';
import { RoutinePageModule } from './routine/routine.module';

const modules = [
    HomePageModule,
    AppliancesPageModule,
    AlarmPageModule,
    RoutinePageModule
];

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        ...modules
    ],
    providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
    bootstrap: [AppComponent],
})
export class AppModule { }
