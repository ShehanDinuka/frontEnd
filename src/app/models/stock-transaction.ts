export class StockTransaction {
  userId: number;
  stockId: number;
  stockShares: number;
  stockPrice: number;
  buyOrSell: number;

  constructor() {
    this.userId = 0;
    this.stockId = 0;
    this.stockShares = 0;
    this.stockPrice = 0;
    this.buyOrSell = 0;
  }
}
