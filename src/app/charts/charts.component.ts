import {Component, OnInit, ViewChild, AfterViewInit, OnDestroy} from '@angular/core';
import {ChartDataSets, Chart} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import {WebsocketService} from '../services/websocket.service';
import {debounceTime} from 'rxjs/operators';
import {formatDate} from '@angular/common';
import * as CanvasJS from '../../assets/canvasjs.min';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {Router, ActivatedRoute} from '@angular/router';
import {StockService} from '../services/stock-service.service';
import {Stock} from '../models/stock';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {StockTransaction} from '../models/stock-transaction';
import {UserService} from '../services/user.service';


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit, OnDestroy {

  private url = 'ws://localhost:8091/ws';
  public chartValues = [];
  public messages = [];
  private dataPath = '/topic/stockData';
  public chart: any;
  public candleStick: any;
  public stockData: StockTransaction = new StockTransaction();
  public dataPoints = [];

  public data: any = {x: new Date(), y: 125};
  // @ViewChild("DashboardComponent") dashboardComponent :DashboardComponent;
  private stock: Stock;
  public connection: any;
  public showSell: Boolean = false;
  public showBuy: Boolean = false;
  amount = new FormControl('');
  public item: any;

  constructor(private wsService: WebsocketService, private route: ActivatedRoute, private stockService: StockService
    , public dialog: MatDialog, public userService: UserService) {
    wsService.createSocketConnection(this.url, this.dataPath);
    this.connection = wsService.ws.pipe(debounceTime(500))
      .subscribe(m => {
        const value: any = m;
        this.item = JSON.parse(value.body);


        this.item.time = new Date();
        //  item.time = formatDate(item.time, ' hh:mm:ss a', 'en-US', '+0530');
        if (this.item.close) {
          let data = {x: this.item.time, y: this.item.close};
          this.data = data;

          this.chartValues.push({
            x: this.item.time,
            y: this.item.close
          });
          this.dataPoints.push({
            x: this.item.time,
            y: [this.item.open, this.item.high, this.item.low, this.item.close]
          });
          if (this.chartValues.length > 60) {

            this.chartValues.shift();
          }
          if (this.dataPoints.length > 60) {

            this.dataPoints.shift();
          }
        } else {
          this.messages = [...this.messages, this.item];
        }
        this.chart.render();
        this.changeBorderColor(this.candleStick);
        this.candleStick.render();
        console.log(this.chartValues);
      });
  }

  ngOnDestroy(): void {
    this.connection;
  }


  ngOnInit() {
    let id: number;
    this.route.queryParams.subscribe(params => {
      id = params['stockId'];
    });

    this.stock = this.stockService.stocks.find(stock => stock.stock_id == id);
    this.chart = new CanvasJS.Chart('lineChart', {
      zoomEnabled: true,
      title: {
        text: 'Share Value of ' + this.stock.name + ' Company'
      },
      axisX: {
        interval: 1,
        title: 'chart updates in minutes'
      },
      axisY: {
        prefix: '$',
        includeZero: false,
        title: 'Stock Price'
      },
      toolTip: {
        // shared: true
      },
      legend: {
        // cursor : 'pointer'
      },
      data: [{
        type: 'line',
        markerSize: 1,
        xValueType: 'dateTime',
        yValueFormatString: '$####.00',
        xValueFormatString: 'hh:mm:ss TT',
        showInLegend: true,
        name: '',
        dataPoints: this.chartValues
      }]
    });
    this.chart.render();

    this.candleStick = new CanvasJS.Chart('candleStick', {
      animationEnabled: true,
      theme: 'light2', // "light1", "light2", "dark1", "dark2"

      title: {
        text: 'Candle Stick Chart For ' + this.stock.name
      },
      subtitles: [{
        text: ''
      }],
      axisX: {
        interval: 1,
        xValueType: 'dateTime',
        xValueFormatString: 'hh:mm TT',
        title: 'chart updates in minutes'
      },
      axisY: {
        includeZero: false,
        prefix: '$',
        title: 'Stock Price'
      },
      toolTip: {
        borderColor: 'black'
      },
      data: [{
        type: 'candlestick',
        risingColor: 'green',
        Color: 'black',
        lineThickness: 1,
        fallingColor: 'red',
        yValueFormatString: '$##0.00',
        dataPoints: this.dataPoints
      }]
    });
    this.candleStick.render();

  }


  changeBorderColor(chart: any) {
    let dataSeries: any;
    for (let i = 0; i < chart.options.data.length; i++) {
      dataSeries = chart.options.data[i];
      for (let j = 0; j < dataSeries.dataPoints.length; j++) {
        dataSeries.dataPoints[j].color = (dataSeries.dataPoints[j].y[0] <= dataSeries.dataPoints[j].y[3])
          ? (dataSeries.risingColor ? dataSeries.risingColor : dataSeries.color)
          : (dataSeries.fallingColor ? dataSeries.fallingColor : dataSeries.color);
      }
    }
  }

  onClickSell(): void {
    this.showSell = true;
    this.showBuy = false;
  }

  onClickBuy(): void {
    this.showSell = false;
    this.showBuy = true;
  }

  onClickClose(): void {
    this.showSell = false;
    this.showBuy = false;
  }

  // if type = 0 then sell type = 1 then buy
  onClickAccept(type: number): void {
    if (type === 0) {
      this.stockData.userId = Number(localStorage.getItem('userId'));
      this.stockData.stockId = this.item.stockId;
      // this.stockData.stockId = 2;
      this.stockData.stockShares = this.amount.value;
      this.stockData.stockPrice = this.item.close;
      this.stockData.buyOrSell = 0;
      this.updateUserStock(this.stockData);
    } else if (type === 1) {
      this.stockData.userId = Number(localStorage.getItem('userId'));
      this.stockData.stockId = this.item.stockId;
      // this.stockData.stockId = 2;
      this.stockData.stockShares = this.amount.value;
      this.stockData.stockPrice = this.item.close;
      this.stockData.buyOrSell = 1;
      this.updateUserStock(this.stockData);
    }
  }

  updateUserStock(stockData: StockTransaction): void {
    this.userService.updateUserStocksLog(stockData).subscribe(
      res => {
        this.showSell = false;
        this.showBuy = false;
      },
      error => {
      }
    );
  }
}
