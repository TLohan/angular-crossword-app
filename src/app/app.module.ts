import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ChartsModule } from 'ng2-charts';
import { ToastrModule } from 'ngx-toastr';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatBadgeModule} from '@angular/material/badge';

import {NgbModule, NgbAccordion, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateBoardComponent } from './components/board/create-board.component';
import { AddQuestionsComponent } from './components/board/add-questions.component';
import { BoardService } from './services/board.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { PlayComponent } from './components/play/play.component';
import { CreateCrosswordComponent } from './components/create/create-crossword.component';
import { TimerPipe } from './pipes/timer.pipe';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './core/auth.service';
import { LandingPageComponent } from './components/landing/landing-page.component';
import { BoardCompletedModalComponent } from './components/play/board-completed-modal.component';
import { NotFoundComponent } from './components/404/404.component';
import { BoardComponent } from './components/create/board.component';
import { AddQuestionsBetaComponent } from './components/create/add-questions.component';
import { QuestionFormComponent } from './components/create/question-form.component';
import { QuestionListComponent } from './components/create/question-list.component';
import { HeaderInterceptor } from './core/http-interceptor.service';
import { Auth2Service } from './core/auth2.service';
import { CallbackComponent } from './components/login/callback.component';
import { StatsWidgetComponent } from './components/home/stats-widget.component';
import { CrosswordThumbComponent } from './components/home/crossword-thumb.component';
import { ScopeGuardService } from './guards/scope-guard.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { RevealAnswerWarningModalComponent } from './components/play/reveal-answer-warning-modal.component';
import { MobileSelectedQuestionWidgetComponent } from './components/play/mobile-selected-question-widget.component';
import { WaitForOpponentModalComponent } from './components/race-mode/wait-for-opponent-modal/wait-for-opponent-modal.component';
import { RunRaceModeComponent } from './components/race-mode/run-race-mode/run-race-mode.component';
import { environment } from 'src/environments/environment';
import { RaceModeService, NamespaceSocket } from './services/race-mode.service';
import { PlayInterfaceComponent } from './components/play/play-interface/play-interface.component';
import { PlayerProgressWidgetComponent } from './components/play/player-progress-widget/player-progress-widget.component';
import { SoloModeComponent } from './components/play/solo-mode/solo-mode.component';
import { RaceModeComponent } from './components/play/race-mode/race-mode.component';
import { ControlDashboardComponent } from './components/play/control-dashboard/control-dashboard.component';
import { QuestionsListComponent } from './components/play/questions-list/questions-list.component';
import { ProgressDashboardComponent } from './components/play/progress-dashboard/progress-dashboard.component';
import { TimerWidgetComponent } from './components/play/timer-widget/timer-widget.component';
import { PlayBoardComponent } from './components/play/play-board/play-board.component';
// tslint:disable-next-line:max-line-length
import { DesktopSelectedQuestionWidgetComponent } from './components/play/desktop-selected-question-widget/desktop-selected-question-widget.component';
import { PlayService } from './services/play.service';
import { PlaySuperComponent } from './components/play/play-super/play-super.component';
import { RaceEndedModalComponent } from './components/play/race-ended-modal/race-ended-modal.component';
import { SoloMatchFinishedModalComponent } from './components/solo-mode/solo-match-finished-modal/solo-match-finished-modal.component';

const socketConfig = environment.socketUrl;

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent,
        CreateCrosswordComponent,
        CreateBoardComponent,
        AddQuestionsComponent,
        PlayComponent,
        TimerPipe,
        LoginComponent,
        LandingPageComponent,
        BoardCompletedModalComponent,
        NotFoundComponent,
        BoardComponent,
        AddQuestionsBetaComponent,
        QuestionFormComponent,
        QuestionListComponent,
        CallbackComponent,
        StatsWidgetComponent,
        CrosswordThumbComponent,
        RevealAnswerWarningModalComponent,
        MobileSelectedQuestionWidgetComponent,
        WaitForOpponentModalComponent,
        RunRaceModeComponent,
        PlayInterfaceComponent,
        PlayerProgressWidgetComponent,
        SoloModeComponent,
        RaceModeComponent,
        ControlDashboardComponent,
        QuestionsListComponent,
        ProgressDashboardComponent,
        TimerWidgetComponent,
        PlayBoardComponent,
        DesktopSelectedQuestionWidgetComponent,
        PlaySuperComponent,
        RaceEndedModalComponent,
        SoloMatchFinishedModalComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule,
        AppRoutingModule,
        FormsModule,
        ChartsModule,
        BrowserAnimationsModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatCardModule,
        MatBadgeModule,
        NgbModule,
        ToastrModule.forRoot(),
        SocketIoModule.forRoot(socketConfig),
        RouterModule.forRoot([
            { path: '', component: HomeComponent },
            { path: 'home', component: HomeComponent },
            { path: 'create', component: CreateCrosswordComponent, canActivate: [ScopeGuardService],
                    data: { expectedScopes: ['create:board'] } },
            { path: 'play/:id', component: SoloModeComponent },
            { path: 'raceMode', component: RunRaceModeComponent },
            { path: 'callback', component: CallbackComponent },
            { path: '**', component: NotFoundComponent }
        ], {
            onSameUrlNavigation: 'reload'
        })
    ],
    providers: [
        BoardService,
        AuthService,
        Auth2Service,
        ScopeGuardService,
        PlayService,
        NgbActiveModal,
        RaceModeService,
        // NamespaceSocket,
        { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true }
    ],
    bootstrap: [AppComponent],
    entryComponents: [RaceEndedModalComponent, SoloMatchFinishedModalComponent]
})
export class AppModule { }
