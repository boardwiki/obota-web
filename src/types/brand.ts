export class ObjectBrand {
    id      : string|number;
    name    : string;
    name_en : string;
    img    ?: string;
    
    constructor(
      id      : string|number, 
      name    : string, 
      name_en : string,
      img     : string 
    ) {
      this.id       = id;
      this.name     = name;
      this.name_en  = name_en;
      this.img      = img;
    }
  }