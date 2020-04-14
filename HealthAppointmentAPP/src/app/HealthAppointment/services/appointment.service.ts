import { Injectable } from '@angular/core';
import { appointmentData } from '../healthappoint.model';
import { success } from '../healthappoint.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private ROUTE_URL = 'http://localhost:3000/appointments';

  constructor(private http: HttpClient) { }

   //get one doctor
   public get(username: string): Observable<Array<appointmentData>> {
    const appointment$ = this.http.get<appointmentData[]>(`${this.ROUTE_URL}/${username}`);
    // console.log(`${this.ROUTE_URL}/${id}`);
    return appointment$;
  }

   //Update one todo
   public update(appointmentItem:string,id: string): Observable<success> {
    let header = new HttpHeaders({'content-type': 'application/json'});
    const todoUpdate$ = this.http.put<success>(`${this.ROUTE_URL}/${id}`, appointmentItem, {headers : header});
    // this.http.post<Todoitem>(this.ROUTE_URL, todoitem);
    return todoUpdate$;
  }

  public save(todoitem:string): Observable<appointmentData> {
    let header = new HttpHeaders({'content-type': 'application/json'});
    const newTodo$ = this.http.post<appointmentData>(this.ROUTE_URL, todoitem, {headers : header});
    return newTodo$;
  }
}
