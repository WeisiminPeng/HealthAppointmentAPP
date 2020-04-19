import { Injectable } from '@angular/core';

//import HttpClient
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../message/model/message.model'

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private routeUrl = "http://localhost:3000/messages";
  constructor(private http: HttpClient) {

  }

  // get all the messages.
  public list(): Observable<Array<Message>> {
    const messages$ = this.http.get<Message[]>(this.routeUrl);
    return messages$;
  }

  //add a message
  public addMessage(message: Message): Observable<Message>{
    return this.http.post<Message>(this.routeUrl, message)
  }

  //update a message
  public updateMessage(message: Message, id: string): Observable<Message>{
    const url = `${this.routeUrl}/${id}`;
    return this.http.put<Message>(url, message);
  }

  //delete a message.
  public deleteMessage (_id: string): Observable<{}> {
    const url = `${this.routeUrl}/${_id}`;
    return this.http.delete(url);
  }

}
