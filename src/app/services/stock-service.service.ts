import { Injectable } from '@angular/core';
import { Stock } from './../models/stock';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  stocks : Stock[];
  constructor(private http : HttpClient) { }

  getAllStocks(client_id: number): Observable <any[]> {
    console.log(client_id);
    let url = 'http://localhost:8091/stockDataLogs/'+client_id; 
    // ${this.heroesUrl}/${id}  
    return  this.http.get<any[]>(url);
  }
}
