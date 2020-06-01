import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl} from '@angular/forms';
import {StockTransaction} from '../../models/stock-transaction';
import {PopUpService} from '../../services/pop-up.service';

@Component({
  selector: 'app-sell-pop-up',
  templateUrl: './sell-pop-up.component.html',
  styleUrls: ['./sell-pop-up.component.css']
})

export class SellPopUpComponent implements OnInit {
  sellStockForm: any;
  stockData: StockTransaction;

  constructor(public dialogRef: MatDialogRef<SellPopUpComponent>, public formBuilder: FormBuilder
    , public popUpService: PopUpService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.sellStockForm = this.formBuilder.group({
      stockName: new FormControl(this.popUpService.buyStockData.name),
      predict: new FormControl(this.popUpService.predictedValue),
      amount: new FormControl(''),
      price: new FormControl(this.popUpService.buyStockData.presentPrice)
    });
  }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit() {
    // buyOrSell if selling then its 0
    this.stockData.userId = this.popUpService.userId;
    this.stockData.stockId = this.popUpService.buyStockData.stock_id;
    this.stockData.stockShares = this.sellStockForm.value.amount;
    this.stockData.stockPrice = this.popUpService.buyStockData.presentPrice;
    this.stockData.buyOrSell = 0;
    this.updateUserStock(this.stockData);
  }

  updateUserStock(stockData: StockTransaction): void {
    this.popUpService.updateUserStock(stockData).subscribe(
      res => {
        this.dialogRef.close();
      },
      error => {
      }
    );
  }

}
