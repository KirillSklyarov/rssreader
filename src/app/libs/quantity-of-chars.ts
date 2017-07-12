export class QuantityOfChars {
  char: string;
  quantity: number;

  constructor(char: string, quantity?: number) {
    if (char.length !== 1) {
      console.error('You can add only one character');
    } else {
      this.char = char;
      if (quantity) {
        this.quantity = quantity;
      } else {
        this.quantity = 0;
      }
    }
    return this;
  }
}
