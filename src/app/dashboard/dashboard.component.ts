import {Component, OnInit, Input} from '@angular/core';
import {PortfolioService} from './../services/portfolio-service.service';
import {StockService} from './../services/stock-service.service';

import {Portfolio} from './../models/portfolio';
import {Client} from './../models/client';
import {Stock} from './../models/stock';
import {ActivatedRoute, Router} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {LoginService} from '../services/login-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @Input() client: Client;
  portfolios: Array<Portfolio>;
  defaultPortfolio: Portfolio;
  stocks: Stock[] = [];

  constructor(private loginService: LoginService, private stockService: StockService, private router: Router) {
  }

  ngOnInit() {
    this.client = this.loginService.getClient();
    this.client.user_id = Number(localStorage.getItem('userId'));
    this.stockService.getUserStocksLog(this.client.user_id).subscribe((stocks) => {
      if (stocks == null) {
        this.router.navigate(['/', 'stocks']);
      }

      for (let stock of stocks) {
        let s: Stock = new Stock();
        s.stock_id = +stock.stockDTO.stock_id;
        s.name = stock.stockDTO.name;
        s.avgPrice = +stock.price;
        s.shares = +stock.shares;
        s.profit = +stock.profit;
        s.spending = +stock.spending;
        this.stocks.push(s);
      }
      this.stockService.stocks = this.stocks;
    });

  }
}
