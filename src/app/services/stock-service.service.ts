import {Injectable} from '@angular/core';
import {Stock} from './../models/stock';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  stocks: Stock[];
  requestOptions: any;
  requestOptions1: any;
  private apiURL = 'http://localhost:8091/';

  constructor(private http: HttpClient) {
    this.requestOptions = {
      responseType: 'json'
    };

    this.requestOptions1 = {
      responseType: 'json',
      observe: 'response',
    };
  }


  getUserStocksLog(client_id: number): Observable<any[]> {
    console.log(client_id);
    let url = this.apiURL + 'stockDataLogs/' + client_id;
    return this.http.get<any[]>(url);
  }

  getAllStocks(): Observable<any> {
    return this.http.get<any>(this.apiURL + 'stocksData', this.requestOptions1);
  }
}
