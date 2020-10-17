import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {User} from '../interfaces/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  public getEmployees(): Observable<any> {
    return this.http.get<any>(`${environment.api.endpoint}employees`)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  public getEmployee(id): Observable<any> {
    return this.http.get<any>(`${environment.api.endpoint}employee/` + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  public createEmployee(employee): Observable<any> {
    return this.http.post<any>(`${environment.api.endpoint}create`, JSON.stringify(employee))
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  public updateEmployee(id, employee): Observable<any> {
    return this.http.put<any>(`${environment.api.endpoint}update/` + id, JSON.stringify(employee))
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  public deleteEmployee(id){
    return this.http.delete<any>(`${environment.api.endpoint}delete/` + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

 handleError(error) {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    errorMessage = error.error.message;
  } else {
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  window.alert(errorMessage);
  return throwError(errorMessage);
  }

}
