export class ObjectItem {
    id      : string|number;
    name    : string;
    cate    : string[]|number[];
    price   : string|number;
    sale    : boolean;
    img     : string;
    brand   : string;
    color  ?: string;
     
    constructor(
      id      : string|number, 
      name    : string, 
      cate    : string[]|number[], 
      price   : string|number,
      sale    : boolean, 
      img     : string,
      brand   : string,
      color  ?: string
    ) {
      this.id       = id;
      this.name     = name;
      this.cate     = cate;
      this.price    = price;
      this.sale     = sale;
      this.img      = img;
      this.brand    = brand;
      this.color    = color;
    }
  }