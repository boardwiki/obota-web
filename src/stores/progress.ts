import { defineStore } from 'pinia';
import { ObjectFootDetail } from '@/types/foot'; 
import { ObjectProgressEnroll } from '@/types/progress';
import { requestApi } from '@/axios';
import { useShowsStore } from './show';
export type RootState = {
    enroll : {
        type : string,
        info ?: ObjectFootDetail ,
        categoryId : null | number,
        videoId : null | number
    }
};

export const useProgressStore = defineStore({
  id: 'progress',
  state: () => ({
    enroll:{
        type : '',
        categoryId : null,
        videoId : null // videoId를 null로 초기화
    }   
  } as RootState),
  getters: {
    
  },
  actions: {
    setEnroll(type:string,info:ObjectFootDetail){
        this.enroll.type = type;
        this.enroll.info = info;
    },
    setCategory(id:number){
      this.enroll.categoryId = id
    },
    async setVideo(video:File){
      try {
        if (video.size <= 11 * 1024 * 1024) { // 5MB 이하인 경우에만 진행
          const formData = new FormData();
          formData.append('file', video);
          
          const res = await requestApi({
            method: 'post',
            url: `v1/files/upload?path=${this.enroll.type}`, // 수정된 부분: API 엔드포인트 변경
            data: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          });

          return res.data.data.id; // 업로드된 비디오의 ID 반환
        } else {
          return -1
        }
      } catch (error) {
        console.error('파일 업로드 실패:', error);
        return -1; // 실패 시 -1 반환
      }
    },
    async submitEnroll(data:ObjectProgressEnroll){
  
      const stoShows = useShowsStore();
      stoShows.on();
      const videoId = await this.setVideo(data.video);

      if(videoId !== -1){ // 비디오 업로드에 성공한 경우
          switch (this.enroll.type) {
            case 'foot_trick':
              try{
                const res = await requestApi({
                  method: 'post',
                  url: 'v1/user-progress/foot-tricks', // 수정된 부분: API 엔드포인트 변경
                  data :{
                    "footTrickCategoryId": this.enroll.info? this.enroll.info.categoryId : '',
                    "footTrickId": this.enroll.info ? this.enroll.info.id : '' ,
                    "videoId": videoId, // 업로드된 비디오의 ID
                    "description": data.description,
                    "openYn": data.openYn,
                    "commentYn": data.commentYn
                  },
                });

                if(res.data.status == "SUCCESS")
                  alert('등록이 완료 됐습니다.')
              }catch(error){
                console.error(error)
              }
              break;


              case 'dancing':
                try{
                  const res = await requestApi({
                    method: 'post',
                    url: 'v1/user-progress/dancing', // 수정된 부분: API 엔드포인트 변경
                    data :{
                      "dancingCategoryId": this.enroll.info? this.enroll.info.categoryId : '',
                      "dancingId": this.enroll.info ? this.enroll.info.id : '' ,
                      "videoId": videoId, // 업로드된 비디오의 ID
                      "description": data.description,
                      "openYn": data.openYn,
                      "commentYn": data.commentYn
                    },
                  });
  
                  if(res.data.status == "SUCCESS")
                    alert('등록이 완료 됐습니다.')
                }catch(error){
                  console.error(error)
                }
              break;
          }
        } else {
          alert('영상이 등록되지 않았습니다. \n영상의 용량을 확인하거나 관리자에게 문의해주세요!')
        }

        stoShows.off();
        
      },
      async allUserProgress(page:number,categoryType:string,skillId:number,categoryId:number){
        try{
            const res = await requestApi({
                url: `v1/user-progress/skill/detail/list`,
                params: {   
                    page        : 1,
                    pageSize    : 4,
                    categoryId  : categoryId,
                    skillId     : skillId,
                    categoryType:categoryType
                },
            });
            return res.data;

        }catch(error){
            console.error(error);
        }
    },
    async waitPrgressRemove(id:number){
      try{
        const res = await requestApi({
            url: `v1/user-progress/${id}/reject`,
            method : 'patch'
        });
        if(res.data.status == 'SUCCESS'){
          return 1
        }
      }catch(error){
          console.error(error);
          return 0
      }
    },
    async getCategoryProgress(categoryId:number,categoryType:string){
      try{
          const res = await requestApi({
              url: `v1/user-progress/skill/${categoryId}/progress`, 
              params: {   
                  categoryType : categoryType
              },
          });
          return res.data.data;
      }catch(error){
          console.error(error);
          return null;
      }
    },


  },
});