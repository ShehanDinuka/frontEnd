import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StockTransaction} from '../models/stock-transaction';
import {Observable} from 'rxjs';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userId: number;
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

  updateUserAssets(user: User): Observable<any> {
    return this.http.post<any>(this.apiURL + 'addAssets', user, this.requestOptions1);
  }

  getAssetsAmount(user: User): Observable<any> {
    return this.http.post<any>(this.apiURL + 'getAssets', user, this.requestOptions1);
  }

  getUserDetails(user: User): Observable<any> {
    return this.http.get<any>(this.apiURL + 'userData/' + user.user_id, this.requestOptions1);
  }

  addStockToUser(stockTransaction: StockTransaction): Observable<any> {
    return this.http.post<any>(this.apiURL + 'addStockToUser', stockTransaction, this.requestOptions1);
  }


  updateUserStocksLog (stockTransaction: StockTransaction): Observable<any> {
    return this.http.post<any>(this.apiURL + 'updateUserStock', stockTransaction, this.requestOptions1);
  }
}
