import { defineStore } from 'pinia'

export type RootState = {
  loading     : boolean;
  page        : string;
  isLoading   : boolean;
  loadingState: boolean[];
};

export const useShowsStore = defineStore({
  id: 'shows',
  state: () => ({
    loadingState: [] as boolean[], // 배열로 로딩 상태 관리
    page: '',
  } as RootState),
  getters: {
    isLoading(): boolean {
      return this.loadingState.length > 0;
    },
  },
  actions: {
    on(): void {
      this.loadingState.push(true); // 배열에 true 추가
    },
    off(): void {
      if (this.loadingState.length > 0) {
        this.loadingState.pop(); // 배열에서 마지막 요소 제거
      }
    },
  },
});