import { Component, OnInit, Input } from '@angular/core';
import { PortfolioService } from './../services/portfolio-service.service';
import { StockService } from './../services/stock-service.service';

import { Portfolio } from './../models/portfolio';
import { Client } from './../models/client';
import { Stock } from './../models/stock';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { LoginService } from '../services/login-service.service';

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
  constructor(private loginService: LoginService, private stockService: StockService ) { }

  ngOnInit() {
    this.client = this.loginService.getClient();
    
    this.stockService.getAllStocks(this.client.user_id).subscribe((stocks) =>{
      for(let stock of stocks){
        let s:Stock = new Stock();
        s.stock_id = +stock.stockDTO.stock_id;
        s.name =  stock.stockDTO.name;
        s.amount =  +stock.amount;
        s.shares = +stock.shares;
        this.stocks.push(s);
      }
      
    });

  }
}