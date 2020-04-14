import { Injectable } from '@angular/core';
import { patientData } from '../healthappoint.model';
import { success } from '../healthappoint.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PatientService {

  // private ROUTE_URL = './../../assets/dataset/doctorsData.json';
  private ROUTE_URL = 'http://localhost:3000/patients';


  constructor(private http: HttpClient) { }

  //List all the patients
  public list(): Observable<Array<patientData>> {
    const patients$ = this.http.get<patientData[]>(this.ROUTE_URL);
    return patients$;
  }

  //get one patident
  public get(username: string): Observable<patientData> {
    const patient$ = this.http.get<patientData>(`${this.ROUTE_URL}/${username}`);
    // console.log(`${this.ROUTE_URL}/${id}`);
    return patient$;
  }
}
