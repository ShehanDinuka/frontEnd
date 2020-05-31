import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StockTransaction} from '../models/stock-transaction';
import {Stock} from '../models/stock';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {
  // used to sell stock pop up
  sellStockData: Stock;
  // used to buy stock pop up
  buyStockData: Stock;
  userId: number;
  predictedValue: number;

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

  // getAllUsers(): Observable<any> {
  //   return this.http.get<any>(this.apiURL + 'usersData', this.requestOptions);
  // }
  addStockToUser(stockTransaction: StockTransaction): Observable<any> {
    return this.http.post<any>(this.apiURL + 'addStockToUser', stockTransaction, this.requestOptions1);
  }


  updateUserStock(stockTransaction: StockTransaction): Observable<any> {
    return this.http.post<any>(this.apiURL + 'updateUserStock', stockTransaction, this.requestOptions1);
  }
}
