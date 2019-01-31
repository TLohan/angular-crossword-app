import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'crossword-app';

  firstLogin = false;

  constructor(private _authService: AuthService, private _router: Router) {}

  ngOnInit() {
    console.log('hit');
    if (window.location.href.indexOf('?postLogout=true') > 0) {
      console.log('hit2');
      this._authService.signoutRedirectCallback().then(() => {
        const url: string = this._router.url.substring(0, this._router.url.indexOf('?'));
        this._router.navigateByUrl(url);
      });
    }
  }

}
