import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { BoardThumbComponent } from './board-thumb/board-thumb.component';
import { StatsWidgetComponent } from './stats-widget/stats-widget.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { boardReducer } from '../states/board.reducer';
import { environment } from 'src/environments/environment';
import { boardStatReducer } from '../states/boardStat.reducer';
import { EffectsModule } from '@ngrx/effects';
import { BoardEffects } from '../states/board.effects';
import { BoardStatEffects } from '../states/board-stat.effects';

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
        NgbPaginationModule.forRoot(),
        StoreModule.forFeature('boards', boardReducer),
        StoreModule.forFeature('boardStats', boardStatReducer),
        EffectsModule.forFeature([BoardEffects, BoardStatEffects]),
        HomeRoutingModule,
    ],
    providers: [
    ]
})
export class HomeModule { }
