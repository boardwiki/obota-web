export class ObjectBushing {
  readonly id?: string | number;
  readonly hardness: string;
  readonly type: string;
  readonly color?: string;

  constructor(
      id        : string | number = '',
      hardness  : string,
      type      : string,
      color     : string = ''
  ) {
      this.id = id;
      this.hardness = hardness;
      this.type = type;
      this.color = color;
  }
}