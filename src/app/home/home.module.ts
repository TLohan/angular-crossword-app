import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { BoardThumbComponent } from './board-thumb/board-thumb.component';
import { StatsWidgetComponent } from './stats-widget/stats-widget.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TimerPipe } from '../pipes/timer.pipe';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        HomeComponent,
        BoardThumbComponent,
        StatsWidgetComponent,
    ],
    imports: [
        CommonModule,
        MatProgressSpinnerModule,
        SharedModule,
        HomeRoutingModule,
    ],
    providers: [
    ]
})
export class HomeModule { }
