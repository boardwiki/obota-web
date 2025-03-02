import { defineStore } from 'pinia';
import { useAuthStore } from './auth';
import { useFootTrcikStore } from './foot';
import { requestApi } from '@/axios'; // requestApi import 추가
import { ObjectUserProfile } from '@/types/user';
import { useStanceStore } from './stance';
import { useDancingStore } from './dancing';
export type RootState = {
    list: ObjectUserProfile[];
    detail: ObjectUserProfile | null;
    total_cnt: {
        totalDancingCount: number;
        totalFootTrickCount: number;
        totalHandTrickCount: number;
    };
    progress_cnt: {
        dancingCount: number;
        footTrickCount: number;
        handTrickCount: number;
        progressCount: number;
    };
    setFollowingId: number;
    setFollowerId: number;
    followingPage: number;
    followerPage: number;
    follower: any;
    following: any;
    followingTotal: number;
    followerTotal: number;
    followingPageTotal: number;
    followerPageTotal: number;
    keyword : string;
    allUserCnt : number
};

export const useProfileStore = defineStore({
    id: 'profile',
    state: () => ({
        list: [],
        detail: null,
        total_cnt: {
            totalDancingCount: 0,
            totalFootTrickCount: 0,
            totalHandTrickCount: 0,
        },
        progress_cnt: {
            dancingCount: 0,
            footTrickCount: 0,
            handTrickCount: 0,
            progressCount: 0,
        },
        setFollowingId: 0,
        setFollowerId: 0,
        following: null,
        follower: null,
        followingPage: 1,
        followerPage: 1,
        followingTotal: 0,
        followerTotal: 0,
        keyword : '',
        allUserCnt : 0,
        followingPageTotal: 0,
        followerPageTotal: 0
    } as RootState),
    actions: {
        async getProfile(id: number) {
            try {
                const existingProfile = await this.list.find(profile => profile.id === id);
                
                if (existingProfile) {
                    return existingProfile;
                } else {
                    const res = await requestApi({
                        url: `v1/users/${id}`, // 수정된 부분: API 엔드포인트 변경
                    });

                    this.list.push(res.data.data);
                    return res.data.data;
                }
            } catch (error) {
                console.error('Failed to fetch list:', error);
            }
        },
        async getProfileDetail(id: number) {
            this.detail = await this.getProfile(id);
        },
        async fetchProfiles(userIds: number[]) {
            await Promise.all(userIds.map(async (userId) => {
                await this.getProfile(userId);
            }));
        },
        async allUserFind(){
            const res = await requestApi({
                url: `v1/users`,
                params : {
                    page:1,
                    pageSize:1
                }
            });

            this.allUserCnt = res.data.totalCount;
        },
        async getFollowing(id: number,keyword ?:string) {
            if (this.setFollowingId !== id || keyword !== this.keyword) {
                this.followingPage = 1;
                this.setFollowingId = id;
                this.followingTotal = 0;
                this.keyword = keyword ? keyword : '';
            }

            if(this.followingPage <= this.followingPageTotal || this.followingPageTotal == 0){
                const res = await requestApi({
                    url: `v1/users/following/list/${id}`, 
                    params: {
                        userId: id,
                        page: this.followingPage,
                        pageSize: 10,
                        keyword : this.keyword !== '' ? this.keyword : null
                    },
                });
    
                if (res.data.status === 'SUCCESS') {
                    this.followingPageTotal = res.data.totalPage;
                    this.followingTotal = res.data.totalCount;
    
                    if(this.followingPage == 1)
                        this.following = res.data.list;
                    else
                        this.following = this.following.concat(res.data.list);
    
                    this.followingPage ++;
                }
            }
        },
        async getFollower(id: number,keyword ?:string) {
            if (this.setFollowerId !== id || keyword !== this.keyword) {
                this.followerPage = 1;
                this.setFollowerId = id;
                this.followerTotal = 0;
                this.keyword = keyword ? keyword : '';
            }

            if(this.followerPage <= this.followerPageTotal || this.followerPageTotal == 0){
                const res = await requestApi({
                    url: `v1/users/follower/list/${id}`, 
                    params: {
                        userId: id,
                        page: this.followerPage,
                        pageSize: 10,
                        keyword : this.keyword !== '' ? this.keyword : null
                    },
                });
    
                if (res.data.status === 'SUCCESS') {
                    this.followerPageTotal = res.data.totalPage;
                    this.followerTotal = res.data.totalCount;
    
                    if(this.followerPage == 1)
                        this.follower = res.data.list;
                    else
                        this.follower = this.follower.concat(res.data.list);
    
                    this.followerPage ++;
                }
            }
        },
        async getUserSkillCount(id: number) {

            const res = await requestApi({
                url: `v1/user-progress/skill/progress/${id}`, 
                params: {
                    userId: id,
                },
            });

            if (res.data.status === 'SUCCESS') {
                this.progress_cnt = res.data.list;
            }
        },
        async getSkillCount() {
            const stoAuth = useAuthStore();
            if (stoAuth.version !== localStorage.getItem('skill_cnt_version')) {

                const res = await requestApi({
                    url: `v1/user-progress/skill/count`, 
                });
                if (res.data.status === 'SUCCESS') {
                    this.total_cnt = res.data.list;
                    localStorage.setItem(`skill_cnt_version`, stoAuth.version);
                    localStorage.setItem('skill_cnt_total', JSON.stringify(res.data.list));
                }
            } else {
                const storageData: any = localStorage.getItem('skill_cnt_total');
                this.total_cnt = JSON.parse(storageData);
            }
        },
        async isFollowing(id: number) {

            const res = await requestApi({
                url: `v1/users/follow/isFollowing/${id}`, 
            });

            return res.data.data;
        },
        async setFollow(id: number) {
            const res = await requestApi({
                url: `v1/users/follow?followId=${id}`, 
                method: 'post',
            });

            if (res.data.status === 'SUCCESS') {
                return res.data.code;
            }
        },
        async unFollow(id: number) {
            const res = await requestApi({
                url: `v1/users/unFollow?followId=${id}`, 
                method: 'delete',
            }).then((res)=>{
                console.log(res)
            });

        },
        async keywordReset(){
            this.keyword = '';
            this.followerPage = 1;
            this.followingPage = 1;
        },
        async fetchSkills(feed:any[]){
            return await Promise.all(feed.map(async (item) => {
              return await this.getSkill(item.skillId,item.categoryType);
          }));
        },
        async getSkill(skillId:number,categoryType:string){
            const stoStance = useStanceStore();
            const stoFoot = useFootTrcikStore();
            const stoDancing = useDancingStore();
            
            switch(categoryType){
                case 'foot_trick':
                    return await stoFoot.saveSkill(skillId).then((res:any)=>{
                        const stance = res[0].stance ? stoStance.getStanceName(res[0].stance) : '';
                        const side = res[0].rotate ? stoStance.getRrotation(res[0].stance,res[0].rotate) == 'BackSide' ? '백사이드' : '프론사이드' : '' ;
                        return {
                            url : `skill/footinfo/${res[0].originalName}`,
                            name : res[0].korName,
                            subName : stance+ ' ' + side 
                        }
                     })
                case 'dancing':
                    return await stoDancing.saveSkill(skillId).then((res:any)=>{
                        const stance = stoStance.getStanceName(res[0].stance)
                        const side = res[0].boardSide ? stoStance.getRrotation(res[0].stance,res[0].boardSide) == 'BackSide' ? '백사이드' : '프론사이드' : '' ;
                        const foot = res[0].footPosition ? stoStance.getFootPosition(res[0].footPosition) == 'BACK' ? '백풋' : '프론풋' : ''
                        const carving = res[0].carving ? stoStance.getCarviing(res[0].carving) == 'TOE' ? '토카빙' : '힐카빙' : ''
                        return {
                            url : `skill/dancinginfo/${res[0].originalName}`,
                            name : res[0].korName,
                            subName : stance+ ' ' + side +' ' + foot + ' ' + carving 
                        }
                    })
            }

        }
    }
});
