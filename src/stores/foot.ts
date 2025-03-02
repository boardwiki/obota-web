import { defineStore } from 'pinia'
import { useAuthStore } from './auth';
import { useProgressStore } from './progress';
import { requestApi } from '@/axios';
import { useShowsStore } from './show';
import { ObjectFootInfo,ObjectFootDetail } from '@/types/foot'; 
import { ObjectFeed } from '@/types/feed';

export type RootState = {
    list   : ObjectFootInfo[],
    detail : ObjectFootDetail[],
    detailSave :  ObjectFootDetail[],
    total  : number,
    filter : {
        page        : number,
        pageSize    : number,
        keyword     ?: string | null,
        aliasName   ?: string | null,
        footPlant   ?: number | null,
        flip        ?: string | null,
        difficulty  ?: string | null,
        bodyDegree  ?: any[] | null,
        boardDegree ?: any[] | null
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


export const useFootTrcikStore = defineStore({
  id: 'foot',
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
                    const storageData:any = localStorage.getItem('foot_category_keyword');
                    this.categoryKeyword = JSON.parse(storageData);
                })
            } catch (error) {
                console.error('Skill-filter check failed:', error);
            }
        }else{
            const storageData:any = localStorage.getItem('foot_category_keyword');
            this.categoryKeyword = JSON.parse(storageData);
        }
    },
    async getSaveCategory(){
        const stoAuth = useAuthStore();
        const storageData:any = localStorage.getItem('foot_favorites');
        const stoShows = useShowsStore();
        stoShows.on();
        if(storageData){
            this.favorites = JSON.parse(storageData);
        }else
            localStorage.setItem('foot_favorites', '');
        
        await this.getCateConfig();

        if(stoAuth.version !== localStorage.getItem('foot_version')){
            try{
                const res = await requestApi({
                    url: 'v1/foot-tricks/list',
                    params: {
                        page : 1,
                        pageSize : 999999,
                    },
                })
                if(res.data.status == "SUCCESS"){
                    this.total = res.data.totalCount
    
                    const difficultyMap:any = {
                        basic: 1,
                        easy: 2,
                        normal: 3,
                        hard: 4,
                        extreme: 5,
                    };

                    
                    this.list = res.data.list.map((item: any) => new ObjectFootInfo({
                        id: item.id,
                        originalKorName: item.originalKorName,
                        originalEngName: item.originalEngName,
                        aliasName: item.aliasName,
                        footPlant: item.footPlant,
                        flip: item.flip,
                        difficulty: item.difficulty,
                        boardDegree: item.boardDegree,
                        bodyDegree: item.bodyDegree,
                        thumbNailId: item.thumbNailId,
                        trickCount: item.trickCount,
                        userTrickCount: item.userTrickCount
                      }))
                      .sort((a:ObjectFootInfo, b:ObjectFootInfo) => difficultyMap[a.difficulty] - difficultyMap[b.difficulty]); // Sort by difficulty
                      

                    localStorage.setItem(`foot_version`, stoAuth.version);
                    localStorage.setItem('foot_category', JSON.stringify(this.list));
                }
            } catch (error){
                console.error(error)
            }

        }else{
            const storageData:any = localStorage.getItem('foot_category');
            this.list = JSON.parse(storageData);
        }

        await stoShows.off();
        this.total = this.list.length
    },
    async getSaveSkill(originalName?:string|null,category_id?:number){
        const stroageData:any = localStorage.getItem('foot_skill');
        let loadData:boolean = false;
        const category = this.list.filter(element => element.originalEngName === originalName)
        const stoAuth = useAuthStore();

        if(stroageData){
            this.detailSave = JSON.parse(stroageData); 

            const matchedItems: ObjectFootDetail[] = this.detailSave.filter((item: any) => 
                (item.originalName === originalName && item.category_id === category_id) && item.version == localStorage.getItem('foot_version')
            );

            // Goofy stance와 Regular stance에 따라 정렬
            if (stoAuth.info.stance === 'Goofy') {
                matchedItems.sort((item1, item2) => {
                const goofyRotateOrder = ['ccw', 'cw'];
                const goofyStanceOrder = ['LEFT_TAIL', 'LEFT_NOSE', 'RIGHT_NOSE', 'RIGHT_TAIL'];
            
                // 먼저 회전 방향을 정렬
                const rotateOrderComparison = goofyRotateOrder.indexOf(item1.rotate) - goofyRotateOrder.indexOf(item2.rotate);
                if (rotateOrderComparison !== 0) {
                    return rotateOrderComparison;
                }
            
                // 회전 방향이 동일한 경우, stance를 정렬
                return goofyStanceOrder.indexOf(item1.stance) - goofyStanceOrder.indexOf(item2.stance);
                });
            } else {
                matchedItems.sort((item1, item2) => {
                const regularRotateOrder = ['cw', 'ccw'];
                const regularStanceOrder = ['RIGHT_TAIL', 'RIGHT_NOSE', 'LEFT_NOSE', 'LEFT_TAIL'];
            
                // 먼저 회전 방향을 정렬
                const rotateOrderComparison = regularRotateOrder.indexOf(item1.rotate) - regularRotateOrder.indexOf(item2.rotate);
                if (rotateOrderComparison !== 0) {
                    return rotateOrderComparison;
                }
            
                // 회전 방향이 동일한 경우, stance를 정렬
                return regularStanceOrder.indexOf(item1.stance) - regularStanceOrder.indexOf(item2.stance);
                });
            }
  

            if(matchedItems.length == category[0].trickCount){
                loadData = true;
                this.detail = matchedItems;
            }
        }


        if(!loadData){
            try {
                const res = await requestApi({
                    url: 'v1/foot-tricks',
                    params: {
                        originalName: originalName
                    },
                });
                this.detail = [];
                if(res.data.status == "SUCCESS"){
                    this.detail  = res.data.list.map((item: any) => {
                        return new ObjectFootDetail({
                            aliasName: item.aliasName,
                            boardDegree: item.boardDegree,
                            bodyDegree: item.bodyDegree,
                            description: item.description,
                            difficulty: item.difficulty,
                            direction: item.direction,
                            engName: item.engName,
                            flip: item.flip,
                            footPlant: item.footPlant,
                            id: item.id,
                            korName: item.korName,
                            originalName: item.originalName,
                            rotate: item.rotate,
                            stance: item.stance,
                            videoId: item.videoId,
                            youtubeLink : item.youtubeLink,
                            categoryId : item.categoryId,
                            version : localStorage.getItem('foot_version')
                        });
                    }).sort((item1:ObjectFootDetail, item2:ObjectFootDetail) => {
                        if (stoAuth.info.stance === 'Goofy') {
                          // Goofy 스탠스일 때의 정렬 기준
                          const goofyRotateOrder = ['ccw', 'cw'];
                          const goofyStanceOrder = ['LEFT_TAIL', 'LEFT_NOSE', 'RIGHT_NOSE', 'RIGHT_TAIL'];
                    
                          // 먼저 회전 방향을 정렬
                          const rotateOrderComparison =
                            goofyRotateOrder.indexOf(item1.rotate) - goofyRotateOrder.indexOf(item2.rotate);
                          if (rotateOrderComparison !== 0) {
                            return rotateOrderComparison;
                          }
                    
                          // 회전 방향이 동일한 경우, stance를 정렬
                          return goofyStanceOrder.indexOf(item1.stance) - goofyStanceOrder.indexOf(item2.stance);
                        } else {
                          // Regular 스탠스일 때의 정렬 기준
                          const regularRotateOrder = ['cw', 'ccw'];
                          const regularStanceOrder = ['RIGHT_TAIL', 'RIGHT_NOSE', 'LEFT_NOSE', 'LEFT_TAIL'];
                    
                          // 먼저 회전 방향을 정렬
                          const rotateOrderComparison =
                            regularRotateOrder.indexOf(item1.rotate) - regularRotateOrder.indexOf(item2.rotate);
                          if (rotateOrderComparison !== 0) {
                            return rotateOrderComparison;
                          }
                    
                          // 회전 방향이 동일한 경우, stance를 정렬
                          return regularStanceOrder.indexOf(item1.stance) - regularStanceOrder.indexOf(item2.stance);
                        }
                      });
                    this.detailSave = this.detailSave.concat(this.detail);
                    localStorage.setItem('foot_skill', JSON.stringify(this.detailSave));
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
        const storageData:any = localStorage.getItem('foot_favorites');
        if(storageData)
            this.favorites = JSON.parse(storageData);
    },
    async deleteFavorites(id:string){
        const index = this.favorites.indexOf(id);
        if (index !== -1) {
            this.favorites.splice(index, 1);
            localStorage.setItem('foot_favorites', JSON.stringify(this.favorites));
        }
    },
    async setFavorites(id:string){
        if (!this.favorites.includes(id)) {
            this.favorites.push(id);
            localStorage.setItem('foot_favorites', JSON.stringify(this.favorites));
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
    async saveSkill(skillId:number){
        const stroageData:any = localStorage.getItem('foot_skill');
        if(stroageData){
            this.detailSave = JSON.parse(stroageData); 
            const matchedItems: ObjectFootDetail[] = this.detailSave.filter((item: any) => 
                (item.id === skillId) && item.version == localStorage.getItem('foot_version')
            );

            if(matchedItems.length > 0)
                return matchedItems;
        }


        try{
            const res = await requestApi({
                url: `/v1/community/skill/${skillId}`,
                params: {   
                    categoryType  : 'foot_trick'
                },
            });


            const item = res.data.data;
            const setData = new ObjectFootDetail({
                aliasName: item.aliasName,
                boardDegree: item.boardDegree,
                bodyDegree: item.bodyDegree,
                description: item.description,
                difficulty: item.difficulty,
                direction: item.direction,
                engName: item.engName,
                flip: item.flip,
                footPlant: item.footPlant,
                id: item.id,
                korName: item.korName,
                originalName: item.originalName,
                rotate: item.rotate,
                stance: item.stance,
                videoId: item.videoId,
                youtubeLink : item.youtubeLink,
                categoryId : item.categoryId,
                version : localStorage.getItem('foot_version')
            })
            this.detailSave = this.detailSave.concat(setData)
            localStorage.setItem('foot_skill', JSON.stringify(this.detailSave));
            return [setData]
        }catch(error){
            console.error(error);
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
                        categoryType: 'foot_trick'
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
                    url: `v1/user-progress/foot-tricks/${stoAuth.info.id}/list`,
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