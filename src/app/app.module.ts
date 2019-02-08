import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


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
import { CallbackComponent } from './components/callback/callback.component';
import { AuthService } from './core/auth.service';
import { LandingPageComponent } from './components/landing/landing-page.component';
import { BoardCompletedModalComponent } from './components/play/board-completed-modal.component';
import { NotFoundComponent } from './components/404/404.component';
import { BoardComponent } from './components/create/board.component';
import { AddQuestionsBetaComponent } from './components/create/add-questions.component';
import { QuestionFormComponent } from './components/create/question-form.component';
import { QuestionListComponent } from './components/create/question-list.component';

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
    CallbackComponent,
    LandingPageComponent,
    BoardCompletedModalComponent,
    NotFoundComponent,
    BoardComponent,
    AddQuestionsBetaComponent,
    QuestionFormComponent,
    QuestionListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      { path: 'create', component: CreateCrosswordComponent },
      { path: 'play/:id', component: PlayComponent },
      { path: 'callback', component: CallbackComponent },
      { path: '**', component: NotFoundComponent }
    ])
  ],
  providers: [BoardService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
