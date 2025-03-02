export class ObjectPositionInfo {
    la : string;
    ma : string;

    constructor(
        la : string, 
        ma : string   
    ) {
        this.la = la;
        this.ma = ma;
    }
}

export class ObjectMap{
    title : string;
    sub  : string;
    link : string;
    constructor(
        title : string,
        sub   : string,
        link  : string 
    ){
        this.title = title;
        this.sub = sub;
        this.link = link;
    }
}

export class ObjectPosition {
    la : string;
    ma : string;

    constructor(
        la : string, 
        ma : string   
    ) {
        this.la = la;
        this.ma = ma;
    }
}

export class ObjectmapInfo {
    admin   : string|null;
    author  : string;
    id      : string;
    la      : string;
    local   : string;
    ma      : string;
    name    : string;
    show    : string|null;

    constructor(
        admin   : string|null,
        author  : string,
        id      : string,
        la      : string,
        local   : string,
        ma      : string,
        name    : string,
        show    : string|null, 
    ) {
        this.admin   = admin;
        this.author  = author;
        this.id      = id;
        this.la      = la;
        this.local   = local;
        this.ma      = ma;
        this.name    = name;
        this.show    = show;
    }
}

