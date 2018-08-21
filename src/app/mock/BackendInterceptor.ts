import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';

@Injectable()
export class BackendInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return Observable.of(null).mergeMap(() => {
        const validCodes = {
            'P1': 23.95,
            'P2': 15.99,
            'P3': 9.99
        };
            // check discount code
            if (request.url.indexOf('api/discount') !== -1 && request.method === 'GET') {
                    const urlParts = request.url.split('/');
                    const discountCode = urlParts[urlParts.length - 1];
                    if(discountCode in validCodes){
                      return Observable.of(new HttpResponse({ status: 200, body: validCodes[discountCode] }));
                    }

                    return Observable.of(new HttpResponse({ status: 400, body: null }));
            }

            if (request.url.indexOf('api/pay') !== -1 && request.method === 'POST') {
                  return Observable.of(new HttpResponse({ status: 200, body: true }));
            }

            return next.handle(request);
        })
        .materialize()
        .delay(500)
        .dematerialize();
    }
}

export const backendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: BackendInterceptor,
    multi: true
};
