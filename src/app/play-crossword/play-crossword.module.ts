import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaySuperComponent } from './play-super/play-super.component';
import { SoloModeComponent } from './solo-mode/solo-mode/solo-mode.component';
import { RaceModeComponent } from './race-mode/race-mode/race-mode.component';
import { PlayCrosswordRouterModule } from './play-crossword-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlayBoardComponent } from './play-board/play-board.component';
import { RevealAllModalComponent } from './modals/reveal-all-modal/reveal-all-modal.component';
import { RaceEndedModalComponent } from './modals/race-ended-modal/race-ended-modal.component';
import { SoloMatchFinishedModalComponent } from './modals/solo-match-finished-modal/solo-match-finished-modal.component';
import { ControlDashboardComponent } from './control-dashboard/control-dashboard.component';
import { DesktopSelectedQuestionWidgetComponent } from './desktop-selected-question-widget/desktop-selected-question-widget.component';
import { PlayerProgressWidgetComponent } from './player-progress-widget/player-progress-widget.component';
import { ProgressDashboardComponent } from './progress-dashboard/progress-dashboard.component';
import { QuestionsListComponent } from './questions-list/questions-list.component';
import { RunRaceComponent } from './race-mode/run-race/run-race.component';
import { TimerWidgetComponent } from './solo-mode/timer-widget/timer-widget.component';
import { MobileSelectedQuestionWidgetComponent } from './mobile-selected-question-widget/mobile-selected-question-widget.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { WaitForOpponentModalComponent } from './modals/wait-for-opponent-modal/wait-for-opponent-modal.component';
import { SharedModule } from '../shared/shared.module';
import { PlayService } from '../services/play.service';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { RaceModeService } from '../services/race-mode.service';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { boardReducer } from '../states/board.reducer';
import { boardStatReducer } from '../states/boardStat.reducer';
import { authReducer } from '../states/auth.reducer';

const socketConfig: SocketIoConfig = environment.socketUrl;

@NgModule({
    declarations: [
        PlaySuperComponent,
        SoloModeComponent,
        RaceModeComponent,
        PlayBoardComponent,
        RevealAllModalComponent,
        RaceEndedModalComponent,
        SoloMatchFinishedModalComponent,
        ControlDashboardComponent,
        DesktopSelectedQuestionWidgetComponent,
        PlayerProgressWidgetComponent,
        ProgressDashboardComponent,
        QuestionsListComponent,
        RunRaceComponent,
        TimerWidgetComponent,
        MobileSelectedQuestionWidgetComponent,
        WaitForOpponentModalComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatBadgeModule,
        SharedModule,
        NgbModalModule,
        SocketIoModule.forRoot(socketConfig),
        StoreModule.forFeature('boards', boardReducer),
        StoreModule.forFeature('boardStats', boardStatReducer),
        StoreModule.forFeature('auth', authReducer),
        PlayCrosswordRouterModule
    ],
    providers: [
        PlayService,
        RaceModeService,
        NgbActiveModal
    ],
    entryComponents: [RaceEndedModalComponent, SoloMatchFinishedModalComponent, RevealAllModalComponent]

})
export class PlayCrosswordModule { }
