import { Injectable } from '@angular/core';
import { ClientProxyService } from '../../core/services/client-proxy.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private clientProxy: ClientProxyService) { }


  login(payload: any): Observable<any> {
    return new Observable(observer => {
      this.clientProxy.serviceCall('http://localhost:5001/api/Auth/login', payload, 'post')
        .subscribe(data => {
          observer.next(data);
        }, err => {
          let retval = { isSuccess: false } as any;
          observer.next(retval);
        }
          , () => {
            observer.complete();
          }
        );
    })
  }
  register(payload: any): Observable<any> {
    return new Observable(observer => {
      this.clientProxy.serviceCall('http://localhost:5001/api/Auth/register', payload, 'post')
        .subscribe(data => {
          observer.next(data);
        }, err => {
          let retval = { isSuccess: false } as any;
          observer.next(retval);
        }
          , () => {
            observer.complete();
          }
        );
    });
  }
}
