import { defineStore } from 'pinia'
import { useShowsStore } from './show';
import { useAuthStore } from './auth';
import { useProgressStore } from './progress';
import { requestApi } from '@/axios';
import { ObjectDancingDetail,ObjectDancingInfo } from '@/types/dancing'; 

import { ObjectFeed } from '@/types/feed';

export type RootState = {
    list   : any[],//ObjectFootInfo[],
    detail : any[],//ObjectDancingDetail[],
    detailSave :  any[],//ObjectDancingDetail[],
    total  : number,
    filter : {
        page        : number,
        pageSize    : number,
        keyword     ?: string | null,
        aliasName   ?: string | null,
        difficulty  ?: string | null,
        bodyDegree  ?: number | null,
    },
    progressPage : null | number,
    progressSize : null | number,
    myProgressInfo : any[],
    usersProgressInfo : ObjectFeed[],
    usersProgressPage : number,
    usersProgressPageSize : number,
    usersProgressPageTotal : number,
    usersProgressTotal : number,
    usersProgressPick : number,
    favorites : string[],
    categoryKeyword : string[]
};


export const useDancingStore = defineStore({
  id: 'dancing',
  state: () => ({
    list : [],
    total : 0,
    filter : {
        page: 1,
        pageSize : 9999
    },
    detail : [],
    detailSave : [],
    progressPage : 1,
    progressSize : 8,
    favorites :[],
    myProgressInfo : [],
    usersProgressInfo : [],
    usersProgressPage : 1,
    usersProgressPageSize : 4,
    usersProgressPick : -1,
    usersProgressTotal : 0,
    usersProgressPageTotal: -1,
    categoryKeyword : []
  } as RootState),
  actions: {
    async getCateConfig(){
        const stoAuth = useAuthStore();

        if(stoAuth.version !== localStorage.getItem('foot_version')){
            try{
                await stoAuth.versionCategory().then(()=>{
                    const storageData:any = localStorage.getItem('dancing_category_keyword');
                    this.categoryKeyword = JSON.parse(storageData);
                })
            } catch (error) {
                console.error('Skill-filter check failed:', error);
            }
        }else{
            const storageData:any = localStorage.getItem('dancing_category_keyword');
            this.categoryKeyword = JSON.parse(storageData);
        }
    },

    async getSaveCategory(){
        const stoAuth = useAuthStore();
        const storageData:any = localStorage.getItem('dancing_favorites');
        const stoShows = useShowsStore();
        await stoShows.on();

        if(storageData){
            this.favorites = JSON.parse(storageData);
        }else{
            localStorage.setItem('dancing_favorites', '[]');
        }

        await this.getCateConfig();

        if(stoAuth.version !== localStorage.getItem('dancing_version')){
            try{
                const res = await requestApi({
                    url: 'v1/dancing/list',
                    params: {
                        page : 1,
                        pageSize : 999999,
                    },
                })
                if(res.data.status == "SUCCESS"){
                    this.total = res.data.totalCount
                    this.list = res.data.list.map((item: any) => new ObjectDancingInfo({
                        id: item.id,
                        originalKorName: item.originalKorName,
                        originalEngName: item.originalEngName,
                        aliasName: item.aliasName,
                        dancingPlant: item.dancingPlant,
                        difficulty: item.difficulty,
                        bodyDegree: item.bodyDegree,
                        thumbNailId: item.thumbNailId,
                        trickCount : item.trickCount
                    }));
                    localStorage.setItem(`dancing_version`, stoAuth.version);
                    localStorage.setItem('dancing_category', JSON.stringify(res.data.list));
                }
            } catch (error){
                console.error(error)
            }

        }else{
            const storageData:any = localStorage.getItem('dancing_category');
            this.list = JSON.parse(storageData);
        }

        await stoShows.off();
        this.total = this.list.length
    },
    async getSaveSkill(originalName?:string|null,category_id?:number){
        const stroageData:any = localStorage.getItem('dancing_skill');
        let loadData:boolean = false;
        const category = this.list.filter(element => element.originalEngName === originalName)
        if(stroageData){
            this.detailSave = JSON.parse(stroageData); 

            const matchedItems: ObjectDancingDetail[] = this.detailSave.filter((item: any) => 
                (item.originalName === originalName && item.category_id === category_id) && item.version == localStorage.getItem('dancing_version')
            );

            if(matchedItems.length == category[0].trickCount){
                loadData = true;
                this.detail = matchedItems;
            }
        }

        if(!loadData){
            try {
                const res = await requestApi({
                    url: 'v1/dancing',
                    params: {
                        originalName: originalName
                    },
                });
                this.detail = [];
                if(res.data.status == "SUCCESS"){
                    this.detail = res.data.list.map((item: any) => {
                        return new ObjectDancingDetail({
                            id: item.id,
                            originalName : item.originalName,
                            korName: item.korName,
                            engName: item.engName,
                            aliasName: item.aliasName,
                            footPosition: item.footPosition,
                            bodyDegree  :item.bodyDegree,
                            difficulty: item.difficulty,
                            stance: item.stance,
                            carving : item.carving,
                            boardSide : item.boardSide,
                            description: item.description,
                            videoId: item.videoId,
                            categoryId : item.categoryId,
                            youtubeLink : item.youtubeLink,
                            version : localStorage.getItem('dancing_version')
                        });
                    });
                    this.detailSave = this.detailSave.concat(this.detail);
                    localStorage.setItem('dancing_skill', JSON.stringify(this.detailSave));
                }
            } catch (error) {
                console.error('Version check failed:', error);
            }
        }

    },
    async next(){
        if(this.total > this.filter.page * this.filter.pageSize){
            await this.filter.page++;
        }
    },
    async prev(){
        if(this.filter.page > 1){
            await this.filter.page--;
        }
    },
    async getDetail(originalName:string){
        await this.getSaveSkill(originalName);
        const storageData:any = localStorage.getItem('dancing_favorites');
        if(storageData)
            this.favorites = JSON.parse(storageData);
    },
    async deleteFavorites(id:string){
        const index = this.favorites.indexOf(id);
        if (index !== -1) {
            this.favorites.splice(index, 1);
            localStorage.setItem('dancing_favorites', JSON.stringify(this.favorites));
        }
    },
    async setFavorites(id:string){
        if (!this.favorites.includes(id)) {
            this.favorites.push(id);
            localStorage.setItem('dancing_favorites', JSON.stringify(this.favorites));
        }
    },
    async saveSkill(skillId:number){
        const stroageData:any = localStorage.getItem('dancing_skill');
        if(stroageData){
            this.detailSave = JSON.parse(stroageData); 
            const matchedItems: ObjectDancingDetail[] = this.detailSave.filter((item: any) => 
                (item.id === skillId) && item.version == localStorage.getItem('foot_version')
            );

            if(matchedItems.length > 0)
                return matchedItems;
        }


        try{
            const res = await requestApi({
                url: `/v1/community/skill/${skillId}`,
                params: {   
                    categoryType  : 'dancing'
                },
            });


            const item = res.data.data;
            const setData = new ObjectDancingDetail({
                id: item.id,
                originalName : item.originalName,
                korName: item.korName,
                engName: item.engName,
                aliasName: item.aliasName,
                footPosition: item.footPosition,
                bodyDegree  :item.bodyDegree,
                difficulty: item.difficulty,
                stance: item.stance,
                carving : item.carving,
                boardSide : item.boardSide,
                description: item.description,
                videoId: item.videoId,
                categoryId : item.categoryId,
                youtubeLink : item.youtubeLink,
                version : localStorage.getItem('dancing_version')
            });
            this.detailSave = this.detailSave.concat(setData);
            localStorage.setItem('dancing_skill', JSON.stringify(this.detailSave));
            return [setData]
        }catch(error){
            console.error(error);
        }
    },
    async resetProgress(){
        this.myProgressInfo = [];
        this.usersProgressPage  = 1;
        this.usersProgressTotal = 0;
        this.usersProgressPageTotal = -1;
        this.usersProgressInfo = [];
        this.usersProgressPick = -1;
    },
    async allUserProgress(id:number,categoryType:string,skillId:number,categoryId:number){
        if(this.usersProgressPick !== id || this.usersProgressPick == -1){
            this.usersProgressPage  = 1;
            this.usersProgressTotal = 0;
            this.usersProgressPageTotal = -1;
            this.usersProgressPick = id;
        }
        const stoProgree = useProgressStore();

        if(this.usersProgressPageTotal == -1 || (this.usersProgressPage < this.usersProgressPageTotal)){
            await stoProgree.allUserProgress(this.usersProgressPage,categoryType,skillId,categoryId).then((res)=>{
                this.usersProgressTotal = res.totalCount;
                this.usersProgressPageTotal = res.totalPage;
                if(this.usersProgressPage > 1)
                    this.usersProgressInfo = this.usersProgressInfo.concat(res.list);
                else
                    this.usersProgressInfo = res.list;

                this.usersProgressPage ++;

            })
        }
    },
    async myProgress(trick_id?:number,category_id?:number){
        const stoAuth = useAuthStore();
        if(trick_id){
            try{
                const res = await requestApi({
                    url: `v1/user-progress/skill/detail`,
                    params: {   
                        categoryId  : category_id,
                        skillId  : trick_id,
                        categoryType: 'dancing'
                    },
                });
                if(res.data.status == 'SUCCESS'){
                    this.myProgressInfo = res.data.list;
                }
            }catch(error){
                console.error(error);
            }
        }else{
            try{
                const res = await requestApi({
                    url: `v1/user-progress/dancing/${stoAuth.info.id}/list`,
                    params: {
                        page : this.progressPage,
                        pageSize : this.progressSize,
                    },
                });
                if(res.data.status == 'SUCCESS'){
                    this.myProgressInfo = res.data.list;
                }
            }catch(error){
                console.error(error)
            }
        }
    }
  },
});