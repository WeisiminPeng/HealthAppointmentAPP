import { Injectable } from '@angular/core';
import { doctorsData } from '../healthappoint.model';
import { success } from '../healthappoint.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  // private ROUTE_URL = './../../assets/dataset/doctorsData.json';
  private ROUTE_URL = 'http://localhost:3000/doctors';


  constructor(private http: HttpClient) { }

  //List all the todos
  public list(): Observable<Array<doctorsData>> {
    const doctors$ = this.http.get<doctorsData[]>(this.ROUTE_URL);
    return doctors$;
  }

  //get one doctor
  public get(username: string): Observable<doctorsData> {
    const doctor$ = this.http.get<doctorsData>(`${this.ROUTE_URL}/${username}`);
    // console.log(`${this.ROUTE_URL}/${id}`);
    return doctor$;
  }

  //Update one doctor
  public update(doctorWorkDays:string,username: string): Observable<success> {
    let header = new HttpHeaders({'content-type': 'application/json'});
    const doctorUpdate$ = this.http.put<success>(`${this.ROUTE_URL}/${username}`, doctorWorkDays, {headers : header});
    return doctorUpdate$;
  }

}
