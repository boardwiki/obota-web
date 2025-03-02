export class ObjectDancingInfo {
    id: number;
    originalKorName: string;
    originalEngName: string;
    aliasName: string;
    dancingPlant: number;
    difficulty: string;
    bodyDegree: number | null; // 수정: null 허용
    thumbNailId: number | null;
    trickCount: number;

    constructor(data: {
        id: number,
        originalKorName: string,
        originalEngName: string,
        aliasName: string,
        dancingPlant: number,
        difficulty: string,
        bodyDegree: number | null,
        thumbNailId: number | null,
        trickCount: number,
    }) {
        this.id = data.id;
        this.originalKorName = data.originalKorName;
        this.originalEngName = data.originalEngName;
        this.aliasName = data.aliasName;
        this.dancingPlant = data.dancingPlant;
        this.difficulty = data.difficulty;
        this.bodyDegree = data.bodyDegree;
        this.thumbNailId = data.thumbNailId;
        this.trickCount = data.trickCount;
    }
}

export class ObjectDancingDetail {
    id: number;
    originalName : string;
    korName : string;
    engName : string;
    aliasName : string;
    footPosition : string;
    bodyDegree: number | null; // 수정: null 허용
    difficulty : string;
    stance : string;
    carving : string;
    boardSide : string;
    description: string|null;
    videoId : number|null;
    categoryId: number  | null;
    youtubeLink : string;
    version : string |null;

    constructor(data: {
        id: number,
        originalName : string,
        korName : string,
        engName : string,
        aliasName : string,
        footPosition : string,
        bodyDegree : number | null,
        difficulty : string,
        stance : string,
        carving : string,
        boardSide : string,
        description: string|null,
        videoId : number|null,
        youtubeLink : string,
        categoryId : number | null,
        version : string | null,
    }) {
        this.id = data.id;
        this.originalName = data.originalName;
        this.korName = data.korName;
        this.engName = data.engName;
        this.aliasName = data.aliasName;
        this.footPosition = data.footPosition;
        this.bodyDegree = data.bodyDegree;
        this.difficulty = data.difficulty;
        this.stance = data.stance;
        this.carving = data.carving;
        this.boardSide = data.boardSide;
        this.description = data.description;
        this.videoId = data.videoId;
        this.categoryId = data.categoryId;
        this.youtubeLink = data.youtubeLink;
        this.version = data.version;
    }
}


