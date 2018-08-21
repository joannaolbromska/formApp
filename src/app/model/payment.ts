export class Payment {
  currentPrice: number;
  discountCode: string;
  discount: number;
  
  constructor(price = 59.88, discountCode = '', discount = 0){
    this.currentPrice = price - discount * 0.01 * price;
    this.discountCode = discountCode;
    this.discount = discount;
  }
}
