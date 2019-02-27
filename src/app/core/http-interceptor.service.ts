import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

    constructor(private toastr: ToastrService, public router: Router) {
    }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('intercept');
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
