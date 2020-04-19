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

   //get all the appointments
   public get(username: string): Observable<Array<appointmentData>> {
    const appointment$ = this.http.get<appointmentData[]>(`${this.ROUTE_URL}/${username}`);
    // console.log(`${this.ROUTE_URL}/${id}`);
    return appointment$;
  }

   //Update one appointment
   public update(appointmentItem:string,id: string): Observable<success> {
    let header = new HttpHeaders({'content-type': 'application/json'});
    const appointmentUpdate$ = this.http.put<success>(`${this.ROUTE_URL}/${id}`, appointmentItem, {headers : header});
    // this.http.post<Todoitem>(this.ROUTE_URL, todoitem);
    return appointmentUpdate$;
  }

  public save(appointmentItem:string): Observable<appointmentData> {
    let header = new HttpHeaders({'content-type': 'application/json'});
    const newAppointment$ = this.http.post<appointmentData>(this.ROUTE_URL, appointmentItem, {headers : header});
    return newAppointment$;
  }

   //Delete one appointment
   public delete(id: string): Observable<success> {
    const deleteAppointment$ = this.http.delete<success>(`${this.ROUTE_URL}/${id}`);
    return deleteAppointment$;
  }
}
