import { Injectable } from '@angular/core';
import { ClientProxyService } from '../../core/services/client-proxy.service';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../core/models/api-response';
import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private clientProxyService: ClientProxyService) { }

  getList(): Observable<ApiResponse<Patient[]>> {
    return new Observable((observer) => {
      this.clientProxyService.serviceCall('http://localhost:5001/api/Patients', {}, "get").subscribe((res) => {
        observer.next(res);
      }, (err) => {
        observer.error(err);
      });
    });
  }

  getListById(id:number): Observable<ApiResponse<Patient>> {
    return new Observable((observer) => {
      this.clientProxyService.serviceCall('http://localhost:5001/api/Patients/'+id, {}, "get").subscribe((res) => {
        observer.next(res);
      }, (err) => {
        observer.error(err);
      });
    });
  }

  addNewPatient(payload: Patient): Observable<ApiResponse<Patient>> {
    return new Observable((observer) => {
      this.clientProxyService.serviceCall('http://localhost:5001/api/Patients', payload, "post").subscribe((res) => {
        observer.next(res);
      }, (err) => {
        observer.error(err);
      });
    });
  }

  deletePatient(id: number): Observable<ApiResponse<Patient>> {
    return new Observable((observer) => {
      this.clientProxyService.serviceCall('http://localhost:5001/api/Patients/' + id, {}, "delete").subscribe((res) => {
        observer.next(res);
      }, (err) => {
        observer.error(err);
      });
    });
  }

  getPrediction(): Observable<ApiResponse<any>> {
    return new Observable((observer) => {
      this.clientProxyService.serviceCall('http://localhost:5001/api/Prediction', {}, "get").subscribe((res) => {
        observer.next(res);
      }, (err) => {
        observer.error(err);
      });
    });
  }
}
