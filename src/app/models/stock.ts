export class Stock {
  stock_id: number;
  name: string;
  shares: number;
  avgPrice: number;
  presentPrice: number;
  profit: number;
  spending:number;

  constructor() {
    this.stock_id = 0;
    this.name = '';
    this.avgPrice = 0;
    this.shares = 0;
    this.profit = 0;
    this.spending = 0;
    this.presentPrice = 0;
  }

  toString(): string {
    return 'Stock { id=' + this.stock_id + ', name=' + this.name + ', value=' + this.avgPrice + ', quantity=' + this.shares + ', presentPrice=' + this.presentPrice + ' }';
  }
}
