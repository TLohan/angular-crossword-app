import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardService } from './services/board.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './core/auth.service';
import { LandingPageComponent } from './components/landing/landing-page.component';
import { NotFoundComponent } from './components/404/404.component';
import { HeaderInterceptor } from './core/http-interceptor.service';
import { Auth2Service } from './core/auth2.service';
import { CallbackComponent } from './components/login/callback.component';
import { ScopeGuardService } from './guards/scope-guard.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HomeModule } from './home/home.module';
import { CreateCrosswordModule } from './create-crossword/create-crossword.module';
import { PlayCrosswordModule } from './play-crossword/play-crossword.module';


@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        LoginComponent,
        LandingPageComponent,
        NotFoundComponent,
        CallbackComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        MatProgressSpinnerModule,
        HomeModule,
        CreateCrosswordModule,
        PlayCrosswordModule,
        AppRoutingModule,
        ToastrModule.forRoot(),
    ],
    providers: [
        BoardService,
        AuthService,
        Auth2Service,
        ScopeGuardService,
        // NamespaceSocket,
        { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true }
    ],
    exports: [
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
