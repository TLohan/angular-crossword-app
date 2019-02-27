import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth.service';
import { Router } from '@angular/router';
import { Auth2Service } from './core/auth2.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'crossword-app';
  _isLoggedIn = false;

  get profile() {
    return this._authService.userProfile;
  }

  constructor(private _authService: Auth2Service, private _router: Router) {
    this._authService.handleAuthentication();
  }

  ngOnInit() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        this._authService.renewTokens();
    }
  }

  get isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

}
