import { defineStore } from 'pinia';
import { requestApi } from '@/axios'; // 이전에 작성한 axios.ts에서 requestApi 함수 가져오기
import { ObjectFeed } from '@/types/feed';
import { useShowsStore } from './show';
export type RootState = {
  page: number;
  pageSize: number;
  pageTotal: number;
  totalCount?: number;
  list: ObjectFeed[];
  comments: any[];
  commentsPage: number;
  commentsTotal: number;
  commentsTotalPage: number;
  commentId: number;
};

export const useFeedStore = defineStore({
  id: 'feed',
  state: () => ({
    page: 1,
    pageSize: 4,
    pageTotal: 0,
    list: [],
    commentId: -1,
    comments: [],
    commentsPage: 1,
    commentsTotal: 0,
    commentsTotalPage: 0,
  } as RootState),
  actions: {
    async resetList(){
      this.list = [];
      this.page = 1;
      this.pageTotal = 0;
    },
    async getList() {
      const stoShows= useShowsStore();
      stoShows.on();
      if(this.pageTotal == 0 || !(this.page > this.pageTotal)){
        try {
          const res = await requestApi({
            url: 'v1/community', // 수정된 부분: API 엔드포인트 변경
            params: {
              page: this.page,
              pageSize: this.pageSize,
            },
          });

          this.pageTotal = res.data.totalPage;
          if(this.page ==1)
            this.list = res.data.list;
          else
            this.list = this.list.concat(res.data.list);
          this.page ++;
          
        } catch (error) {
          console.error('Failed to fetch list:', error);
        }
      }
      stoShows.off();
    },
    async getComments(id: number) {
      this.commentId = id;
      try {
        const res = await requestApi({
          url: 'v1/community/comments', // 수정된 부분: API 엔드포인트 변경
          params: {
            targetId: id,
            page: this.commentsPage,
            pageSize: 10,
          },
        });
        if (res.data.status === 'SUCCESS') {
          this.comments = res.data.list;
          this.commentsTotal = res.data.totalCount;
          this.commentsTotalPage = res.data.totalPage;
        }
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      }
    },
    async resetComments() {
      this.commentsPage = 1;
      this.commentsTotalPage = 0;
      this.commentId = -1;
    },
    async postComment(txt: string, parentCommentId?: number | null) {
      try {
        const data = {
          targetId: this.commentId,
          parentCommentId: parentCommentId ? parentCommentId : undefined,
          categoryType: 'skill',
          content: txt,
        };
        const res = await requestApi({
          method: 'post',
          url: 'v1/community/comments', // 수정된 부분: API 엔드포인트 변경
          data,
        });
        if (res.data.status === 'SUCCESS') {
          this.getComments(this.commentId);
        }
      } catch (error) {
        console.error('Failed to post comment:', error);
      }
    },
    async like(id: number, type: string) {
      try {
        const data = {
          targetId: id,
          categoryType: type,
        };
        const res = await requestApi({
          method: 'post',
          url: 'v1/community/likes', // 수정된 부분: API 엔드포인트 변경
          data,
        });
        if (res.data.status === 'SUCCESS') {
          return res.data.list;
        }
      } catch (error) {
        console.error('Failed to like:', error);
        return 0;
      }
    },
    async unlike(id: number, type: string) {
      try {
        const res = await requestApi({
          method: 'delete',
          url: `v1/community/likes/${id}`, // 수정된 부분: API 엔드포인트 변경
          params: {
            categoryType: type,
          },
        });
        if (res.data.status === 'SUCCESS') {
          return res.data.data;
        }
      } catch (error) {
        console.error('Failed to unlike:', error);
        return 0;
      }
    },
  },
});