import {Component, OnInit} from '@angular/core';
import {Stock} from '../models/stock';
import {StockService} from '../services/stock-service.service';
import {UserService} from '../services/user.service';
import {StockTransaction} from '../models/stock-transaction';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-new-user-dash-board',
  templateUrl: './new-user-dash-board.component.html',
  styleUrls: ['./new-user-dash-board.component.css']
})
export class NewUserDashBoardComponent implements OnInit {
  public stocks: Array<Stock> = new Array<Stock>();
  public userId: number;
  public stockTransaction: StockTransaction;
  public amount: any = new FormControl('');
  constructor(public stockService: StockService, public userService: UserService) {
  }

  ngOnInit() {
    this.getAllStockData();
    this.getUserStockData();
  }

  getAllStockData(): void {
    this.stockService.getAllStocks().subscribe(res => {
      this.stocks = res.body;
    });
  }
  getUserStockData(){
    this.stockService.getUserStocksLog(+localStorage.getItem('userId')).subscribe(
      res =>{
        if(res.length){
          this.stockService.dashboardObservable.next(true);
        }

      }
    );
  }

  // onClick(stockId: number): void {
  //   this.stockTransaction.stockId = stockId;
  //   this.stockTransaction.userId = Number(localStorage.getItem('userId'));
  //   this.userService.addStockToUser(this.stockTransaction).subscribe(res => {});
  // }

}
