import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ChartsModule } from 'ng2-charts';
import { ToastrModule} from 'ngx-toastr';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import { RevealAnswerWarningModalComponent } from './components/play/reveal-answer-warning-modal.component';
import { MobileSelectedQuestionWidgetComponent } from './components/play/mobile-selected-question-widget.component';
import { WaitForOpponentModalComponent } from './components/race-mode/wait-for-opponent-modal/wait-for-opponent-modal.component';
import { RunRaceModeComponent } from './components/race-mode/run-race-mode/run-race-mode.component';
import { environment } from 'src/environments/environment';
import { RaceModeService } from './services/race-mode.service';

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
    RunRaceModeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ChartsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatCardModule,
    ToastrModule.forRoot(),
    SocketIoModule.forRoot(socketConfig),
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'home', component: HomeComponent},
      { path: 'create', component: CreateCrosswordComponent, canActivate: [ScopeGuardService], data: {expectedScopes: ['create:board']} },
      { path: 'play/:id', component: PlayComponent},
      { path: 'raceMode', component: RunRaceModeComponent },
      { path: 'callback', component: CallbackComponent },
      { path: '**', component: NotFoundComponent }
    ])
  ],
  providers: [
    BoardService,
     AuthService,
     Auth2Service,
     ScopeGuardService,
     RaceModeService,
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
