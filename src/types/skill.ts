export class ObjectSkillInfo {
    id              : number;
    originalKorName : string;
    originalEngName : string;
    aliasName       : string;
    difficulty      : string;
    count          ?: number;

    constructor(data:{
      id: number,
      originalKorName : string,
      originalEngName : string,
      aliasName       : string,
      difficulty      : string,
      count          ?: number
    }) {
      this.id              = data.id;
      this.originalKorName = data.originalKorName;
      this.originalEngName = data.originalEngName;
      this.aliasName       = data.aliasName;
      this.difficulty      = data.difficulty;
      this.count           = data.count;
    }
  }
  