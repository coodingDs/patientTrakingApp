import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response';
@Injectable({
  providedIn: 'root'
})
export class ClientProxyService {

  constructor(private httpClient: HttpClient) { }

  openLink(link: any, type?: any) {
    window.open(link, type)
  }

  public serviceCall(url: string, payload: any, op: string): Observable<ApiResponse<any>> {
    payload = payload || {};
    if (op == "post") {
      return new Observable(observer => {
        this.httpClient
          .post<ApiResponse<any>>(url, payload)
          .subscribe(data => {
            observer.next(data);
          },
            err => {
              let retval = { isSuccess: false } as ApiResponse<any>;
              return retval;
            }, () => {
              observer.complete();
            });
      });
    } else if (op == "get") {
      return new Observable(observer => {
        this.httpClient
          .get<ApiResponse<any>>(url)
          .subscribe(data => {
            observer.next(data);
          },
            err => {
              let retval = { isSuccess: false } as ApiResponse<any>;
              observer.next(retval);
              return retval;
            }, () => {
              observer.complete();
            });
      });
    } else {
      return new Observable(observer => {
        this.httpClient
          .delete<ApiResponse<any>>(url)
          .subscribe(data => {
            observer.next(data);
          },
            err => {
              let retval = { isSuccess: false } as ApiResponse<any>;
              observer.next(retval);
              return retval;
            }, () => {
              observer.complete();
            });
      });
    }
  }

  serviceCallExternal(url: string, payload: any, op: string): Observable<any> {
    let request: Observable<any> | null = null;
    switch (op) {
      case "get":
        request = this.httpClient.get<ApiResponse<any>>(url)
        break;
      case "post":
      default:
        request = this.httpClient.post<ApiResponse<any>>(url, payload)
        break;
    }
    return new Observable<ApiResponse<any>>(observer => {
      request!.subscribe(response => {
        let obj = { isSuccess: true, data: response, message: "http_request_unexpected_error", status: 200 } as ApiResponse<any>
        observer.next(obj)
        observer.complete();
      }, error => {
        let errorObj = { isSuccess: false, data: error, message: "http_request_unexpected_error", status: -1 } as ApiResponse<any>
        observer.next(errorObj)
        observer.complete();
      }, () => {
        observer.complete();
      })
    })
  }

}


