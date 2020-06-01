import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl} from '@angular/forms';
import {StockTransaction} from '../../models/stock-transaction';
import {PopUpService} from '../../services/pop-up.service';


@Component({
  selector: 'app-buy-pop-up',
  templateUrl: './buy-pop-up.component.html',
  styleUrls: ['./buy-pop-up.component.css']
})
export class BuyPopUpComponent implements OnInit {
  buyStockForm: any;
  stockData: StockTransaction;

  constructor(public dialogRef: MatDialogRef<BuyPopUpComponent>, public formBuilder: FormBuilder
    , public popUpService: PopUpService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.buyStockForm = this.formBuilder.group({
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
    // buyOrSell if buying then its 1
    this.stockData.userId = this.popUpService.userId;
    this.stockData.stockId = this.popUpService.buyStockData.stock_id;
    this.stockData.stockShares = this.buyStockForm.value.amount;
    this.stockData.stockPrice = this.popUpService.buyStockData.presentPrice;
    this.stockData.buyOrSell = 1;
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
