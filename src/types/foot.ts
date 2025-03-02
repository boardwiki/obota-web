export class ObjectFootInfo {
    id: number;
    originalKorName: string;
    originalEngName: string;
    aliasName: string;
    footPlant: number;
    flip: string;
    difficulty: string;
    boardDegree: number;
    bodyDegree: number;
    thumbNailId: number | null;
    trickCount: number;
    userTrickCount: number;

    constructor(data: {
        id: number,
        originalKorName: string,
        originalEngName: string,
        aliasName: string,
        footPlant: number,
        flip: string,
        difficulty: string,
        boardDegree: number,
        bodyDegree: number,
        thumbNailId: number | null,
        trickCount: number,
        userTrickCount: number,

    }) {
        this.id = data.id;
        this.originalKorName = data.originalKorName;
        this.originalEngName = data.originalEngName;
        this.aliasName = data.aliasName;
        this.footPlant = data.footPlant;
        this.flip = data.flip;
        this.difficulty = data.difficulty;
        this.boardDegree = data.boardDegree;
        this.bodyDegree = data.bodyDegree;
        this.thumbNailId = data.thumbNailId;
        this.trickCount = data.trickCount;
        this.userTrickCount = data.userTrickCount;
    }
}


export class ObjectFootDetail {
    aliasName: string;
    boardDegree: number;
    bodyDegree: number;
    description: string;
    difficulty: string;
    direction: string;
    engName: string;
    flip: string;
    footPlant: number;
    id: number;
    korName: string;
    originalName: string;
    rotate: string;
    stance: string;
    videoId: number;
    youtubeLink   : string;
    categoryId  : number;
    version : any;
    constructor(data: {
        aliasName: string;
        boardDegree: number;
        bodyDegree: number;
        description: string;
        difficulty: string;
        direction: string;
        engName: string;
        flip: string;
        footPlant: number;
        id: number;
        korName: string;
        originalName: string;
        rotate: string;
        stance: string;
        videoId: number;
        youtubeLink   : string;
        categoryId : number;
        version : any;
    }) {
        this.aliasName = data.aliasName;
        this.boardDegree = data.boardDegree;
        this.bodyDegree = data.bodyDegree;
        this.description = data.description;
        this.difficulty = data.difficulty;
        this.direction = data.direction;
        this.engName = data.engName;
        this.flip = data.flip;
        this.footPlant = data.footPlant;
        this.id = data.id;
        this.korName = data.korName;
        this.originalName = data.originalName;
        this.rotate = data.rotate;
        this.stance = data.stance;
        this.videoId = data.videoId;
        this.youtubeLink = data.youtubeLink;
        this.categoryId = data.categoryId;
        this.version = data.version
    }
}

