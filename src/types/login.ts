export class ObjectLogin {
    readonly accessToken: string;
    readonly refreshToken: string;
    readonly joined?: boolean;
  
    constructor(
        accessToken     : string,
        refreshToken    : string,
        joined          : boolean,
    ) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.joined = joined;
    }
  }