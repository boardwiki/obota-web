import { defineStore } from "pinia"
import { requestApi } from '@/axios';
import { useAuthStore } from "./auth";


export type RootState = {
    list : any[];
    detail : any;
    page : number;
    totalPage : number;
    join : any[];
}

export const useChallengeStore = defineStore({
    id: 'challenge',
    state: () => ({
        list : [],
        page : 1,
        detail : null,
        totalPage : 0,
        join : []
    } as RootState),
    actions:{
        async submitEnroll(from:any){
            
            const data = {
                "title" : from.title,
                "startDate" : from.startDate,
                "endDate": from.endDate,
                "tel": "010-1234-5678",
                "challengeLines": [],
                "description": from.description,
                "challengeUrl": from.url
            }   

            try{
                const res = await requestApi({
                    method: 'post',
                    url: 'v1/challenges',
                    data
                });

                if(res.data.status == "SUCCESS")
                    return 1;
            }catch(err){
                console.error(err)
            }


        },
        async resetList(){
            this.page = 1;
            this.totalPage = 0;
            this.list = [];
            this.detail = null;
        },
        async getList(){
            if( (this.page == 1 && this.totalPage == 0) || this.page <= this.totalPage  )
            try{
                const res = await requestApi({
                    url: 'v1/challenges/list',
                    params: {
                        page : this.page,
                        pageSize : 10,
                    },
                })

                if(this.page ==1)
                    this.list = res.data.list;
                else
                    this.list = this.list.concat(res.data.list);

                this.totalPage = res.data.totalPage
                this.page++;

            } catch(error){
                console.error(error)
            }
        },
        async getDetail(id:number){
            try{
                const res = await requestApi({
                    url: `v1/challenges/${id}`,
                })
                this.detail = res.data.data;
            } catch(error){
                console.error(error)
            }
        },
        async setJoin (id:number,link:string){
            const stoAuth = useAuthStore();
            const httpRegex = /^(https?:\/\/)?/;

            try{
                const res = await requestApi({
                    url: `v1/challenges/${id}/join`,
                    method: 'post',
                    params: {
                        userId: stoAuth.info.id,
                        videoLink: link.replace(httpRegex, ''),
                        ranking: '1'
                    },
                })
                if(res.data.status == "SUCCESS"){
                    alert('참여 완료했습니다!');
                }
            } catch(error){
                console.error(error)
            }
        },
        async getJoin(){
            const id = this.detail.id;
            try{
                const res = await requestApi({
                    url: `v1/challenges/${id}/join/list`,
                })
                this.join = res.data.list;
            } catch(error){
                console.error(error)
            }
        }
    }
})