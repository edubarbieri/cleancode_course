export default class Coupon {
  constructor(
    readonly code: string,
    readonly discountPercent: number,
    readonly expirationDate?: Date
  ) {}

  isExpired(currentDate: Date = new Date()): boolean {
    if (!this.expirationDate) {
      return false;
    }
    return this.expirationDate.getTime() < currentDate.getTime();
  }

  isValid(currentDate: Date = new Date()): boolean {
    return !this.isExpired(currentDate);
  }
}
