import { defineStore } from 'pinia'
import { useAuthStore } from './auth';
import { requestApi } from '@/axios';
import { ObejctBasicInfo } from '@/types/basic';

export type RootState = {
    list   : ObejctBasicInfo[],//ObjectDancingInfo[],
    detail : ObejctBasicInfo|null,//ObjectDancingDetail[],\
    total  : number,
};


export const useBasicStore = defineStore({
  id: 'basic',
  state: () => ({
    list : [],
    total : 0,
    detail : null
  } as RootState),
  actions: {
    async getSaveCategory(){
        const stoAuth = useAuthStore();

        if(stoAuth.version !== localStorage.getItem('basic_version')){
            try{
                const res = await requestApi({
                    url: 'v1/basic-skill/list',
                })
                console.log(res);

                if(res.data.status == "SUCCESS"){
                    this.total = res.data.totalCount
                    

                    this.list = res.data.list.map((item: any) => new ObejctBasicInfo({
                        id: item.id,
                        korName: item.korName,
                        engName: item.engName,
                        aliasName: item.aliasName,
                        difficulty: item.difficulty,
                        createDate: item.createDate,
                        updateDate: item.updateDate,
                        youTubeLink : item.youTubeLink,
                        description : item.description
                    }));
                    
                    localStorage.setItem(`basic_version`, stoAuth.version);
                    localStorage.setItem('basic_category', JSON.stringify(res.data.list));
                }
            } catch (error){
                console.error(error)
            }

        }else{
            const storageData:any = localStorage.getItem('basic_category');
            this.list = JSON.parse(storageData);
        }

        this.total = this.list.length
    },
  },
});