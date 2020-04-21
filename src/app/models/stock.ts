
export class Stock {
  stock_id: number;
  name: string; 
  shares: number;
  amount: number;
  presentPrice: number;

  constructor() {
    this.stock_id = 0;
    this.name = "";
    this.amount = 0;
    this.shares = 0;
    this.presentPrice = 0;
  }

  toString(): string {
    return 'Stock { id=' + this.stock_id + ', name=' + this.name + ', value=' + this.amount + ', quantity=' + this.shares + ', presentPrice=' + this.presentPrice + ' }'; 
  }
}