export class ObejctBasicInfo {
    id: number;
    korName: string;
    engName: string;
    aliasName: string;
    difficulty: string;
    createDate: string;
    updateDate: string;
    youTubeLink: string | null;
    description: string;

    constructor(data: {
        id: number;
        korName: string;
        engName: string;
        aliasName: string;
        difficulty: string;
        createDate: string;
        updateDate: string;
        description: string;
        youTubeLink: string| null;
    }) {
        this.id = data.id;
        this.korName = data.korName;
        this.engName = data.engName;
        this.aliasName = data.aliasName;
        this.difficulty = data.difficulty;
        this.createDate = data.createDate;
        this.updateDate = data.updateDate;
        this.youTubeLink = data.youTubeLink;
        this.description = data.description;
    }
}
