import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

    constructor(private toastr: ToastrService) {
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
                        this.toastr.error(err.error.message);
                    } catch (e) {
                        this.toastr.error('An error occurred', '');
                    }
                }
                return of(err);
            })
        );
    }
}
