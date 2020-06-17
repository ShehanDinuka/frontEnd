import {Injectable} from '@angular/core';
import {Client} from './../models/client';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  clientObervable: Subject<Client>;
  private client: Client;

  constructor(private http: HttpClient) {
    this.client = new Client();
    this.clientObervable = new Subject<Client>();
  }

  validateUser(email: string, password: string): Observable<any> {
    let url = 'http://localhost:8091/validate';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
    let credentials = {email: email, password: password};
    return this.http.post<any>(url, credentials);

  }

  setClient(c: Client) {
    this.client = c;
  }

  getClient(): Client {
    return this.client;
  }
}
