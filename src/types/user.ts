export class ObjectUserProfile {
    id             ?: number;
    email          ?: string;
    nickName       ?: string;
    instaId        ?: string;
    birth          ?: string;
    isExperienced  ?: boolean;
    location       ?: string;
    firstStartDate ?: string;
    stance         ?: 'Regular' | 'Goofy'; // 스탠스는 'Regular' 또는 'Goofy' 중 하나일 것으로 가정합니다.
    role           ?: string;
    constructor(
      id: number,
      email: string,
      nickName: string,
      instaId: string,
      birth: string,
      isExperienced: boolean,
      location: string,
      firstStartDate: string,
      stance: 'Regular' | 'Goofy',
      role : string
    ) {
      this.id = id;
      this.email = email;
      this.nickName = nickName;
      this.instaId = instaId;
      this.birth = birth;
      this.isExperienced = isExperienced;
      this.location = location;
      this.firstStartDate = firstStartDate;
      this.stance = stance;
      this.role = role
    }
  }
  