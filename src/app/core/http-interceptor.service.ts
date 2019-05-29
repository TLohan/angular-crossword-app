import { Injectable, OnInit } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Auth2Service } from './auth2.service';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../states/app.state';
import * as fromAuth from '../states/auth.reducer';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

    constructor(private toastr: ToastrService, public router: Router, public store: Store<fromRoot.State>) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            tap(event => {
              if (event instanceof HttpResponse) {
                if (event.body && event.body.success) {
                    this.toastr.success(event.body.success.message);
                }
              }
            }),
            catchError(err => {
                if (err instanceof HttpErrorResponse) {
                    try {
                        console.log(err);
                        this.toastr.error(err.error.error.title);
                        this.router.navigate(['/']);
                    } catch (e) {
                        this.toastr.error('An error occurred', '');
                    }
                }
                return of(err);
            })
        );
    }
}
