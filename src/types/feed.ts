export class ObjectFeed {
    categoryType: string;
    commentCount: number;
    commentYn: string;
    description: string;
    likeCount: number;
    skillId: number;
    userId: number;
    videoId: number;
    id :number;
    likeYn : string;

    constructor(
        categoryType: string,
        commentCount: number,
        commentYn: string,
        description: string,
        likeCount: number,
        skillId: number,
        userId: number,
        videoId: number,
        id : number,
        likeYn : string
    ) {
        this.categoryType = categoryType;
        this.commentCount = commentCount;
        this.commentYn = commentYn;
        this.description = description;
        this.likeCount = likeCount;
        this.skillId = skillId;
        this.userId = userId;
        this.videoId = videoId;
        this.id = id;
        this.likeYn = likeYn;
    }
  }