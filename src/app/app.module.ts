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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CreateCrosswordComponent,
    CreateBoardComponent,
    AddQuestionsComponent,
    PlayComponent,
    TimerPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      { path: 'create', component: CreateCrosswordComponent },
      { path: 'play/:id', component: PlayComponent }
    ])
  ],
  providers: [BoardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
