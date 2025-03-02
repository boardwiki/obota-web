export class ObjectDeck {
  readonly id?: string | number;
  readonly inch: number;
  readonly flex: string;
  readonly concave: string;
  readonly material: string;
  readonly price?: number;
  readonly color?: string;

  constructor(
      id      : string | number = '',
      inch    : number,
      flex    : string,
      concave : string,
      material: string,
      price   ?: number,
      color   ?: string
  ) {
      this.id = id;
      this.inch = inch;
      this.concave = concave;
      this.material = material;
      this.flex = flex;
      this.price = price;
      this.color = color;
  }
}