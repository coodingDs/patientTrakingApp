import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, retry, switchMap } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class CustomHttpInterceptorService {
  tokenInfo: any;
  constructor(
    private storageService: StorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if ( req.url.startsWith("https://localhost")) {
      let modifiedReq = req.clone({
        setHeaders: {
          "Accept-Language": "en-US,en;q=0.9"
        },
      });

      if (!req.url.includes("login") && !req.url.includes("register")) {
        const tokenValue = this.storageService.tokenInfo;
        if (!tokenValue) {
          return this.storageService.Get("token").pipe(
            switchMap(token => {
              if (token) {
                modifiedReq = modifiedReq.clone({
                  setHeaders: { Authorization: `Bearer ${token}` }
                });
              }
              return this.handleRequest(modifiedReq, next);
            })
          );
        } else {
          modifiedReq = modifiedReq.clone({
            setHeaders: { Authorization: `Bearer ${tokenValue}` }
          });
        }
      }

      return this.handleRequest(modifiedReq, next);
    }

    return this.handleRequest(req, next);
  }

  private handleRequest(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      }),
      finalize(() => {
        const profilingMsg = `${req.method} "${req.urlWithParams}"`;
      })
    );
  }
}


