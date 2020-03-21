import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, Chart } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { WebsocketService } from '../services/websocket.service';
import { debounceTime } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import * as CanvasJS from '../../assets/canvasjs.min';



@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  private url = 'ws://localhost:8088';
  public chartValues = [];
  public messages = [];
  public min: Date = new Date();
  public max = [];
  // lineChartData : ChartDataSets[] = [{data: [85, 72, 78, 75, 77, 75], label: 'Crude oil prices'}];
  public chart : any;
  public candleStick : any;
  
  public dataPoints =[];
  
  public data :any = {x:new Date(),y:125};
  

  

  constructor(private wsService: WebsocketService) {
    wsService.createObservableSocket(this.url).pipe(debounceTime(500))
       .subscribe(m => {
           const item: any = JSON.parse(m);
           
           item.time = new Date() ;
          //  item.time = formatDate(item.time, ' hh:mm:ss a', 'en-US', '+0530');
           if (item.close) {
             let data = {x:item.time, y:item.close};
              this.data = data;

             this.chartValues.push({
               x:item.time, 
               y:item.close
              });
              this.dataPoints.push({
                x:item.time,
                y:[item.open,item.high,item.low,item.close]
              });
           if (this.chartValues.length > 60) {
              
              this.chartValues.shift();
           }
           if (this.dataPoints.length > 60) {
              
            this.dataPoints.shift();
         }
           } else {
           this.messages = [...this.messages, item];
           }
          //  this.chart.options.data[0].dataPoints = this.chartValues;
           this.chart.render();
           this.changeBorderColor(this.candleStick)
           this.candleStick.render();
           console.log(this.chartValues);
       });
   }

  ngOnInit() {
    this.chart = new CanvasJS.Chart("lineChart", {
      zoomEnabled: true,
      title: {
        text: "Share Value of APPLE Companies"
      },
      axisX: {
        interval: 1,
        title: "chart updates"
      },
      axisY:{
        prefix: "$",
        includeZero: false
      }, 
      toolTip: {
        // shared: true
      },
      legend:{
        // cursor : 'pointer'
      },
      data: [{ 
        type: "line",
        markerSize: 1,
        xValueType: "dateTime",
        yValueFormatString: "$####.00",
        xValueFormatString: "hh:mm:ss TT",
        showInLegend: true,
        name: "Company APPLE",
        dataPoints: this.chartValues
        }]
    });
    this.chart.render();
    
    this.candleStick = new CanvasJS.Chart("candleStick", {
      animationEnabled: true,
      theme: "light2", // "light1", "light2", "dark1", "dark2"
      
      title: {
        text: "Netflix Stock Price in 2016"
      },
      subtitles: [{
        text: "Weekly Averages"
      }],
      axisX: {
        interval: 1,
        xValueType: "dateTime",
        xValueFormatString: "hh:mm TT"
      },
      axisY: {
        includeZero: false,
        prefix: "$",
        title: "Price"
      },
      toolTip: {
        borderColor: "black" 
      },
      data: [{
        type: "candlestick",
        risingColor: 'green',
        Color: "black",
        lineThickness : 1,
        fallingColor: "red",
        yValueFormatString: "$##0.00",
        dataPoints: this.dataPoints
      }]
    });
    this.candleStick.render();
    
  }
   changeBorderColor(chart: any){
    let dataSeries:any;
    for( let i = 0; i < chart.options.data.length; i++){
        dataSeries = chart.options.data[i];
        for(let j = 0; j < dataSeries.dataPoints.length; j++){
          dataSeries.dataPoints[j].color = (dataSeries.dataPoints[j].y[0] <= dataSeries.dataPoints[j].y[3]) ? (dataSeries.risingColor ? dataSeries.risingColor : dataSeries.color) : (dataSeries.fallingColor ? dataSeries.fallingColor : dataSeries.color);
        }
    }
  }
  
    buttonClicked(val:any){
      console.log(val);
    }
}
