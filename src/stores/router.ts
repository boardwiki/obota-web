import { defineStore } from 'pinia';

export type RootState = {
  from : string,
  to : string,
}


export const useRouteStore = defineStore({
  id: 'route',
  state: () => ({
    routeHistory: [] as RootState[], // 이곳에 라우터 히스토리를 저장
  }),
  actions: {
    recordRoute(route:RootState) {
      this.routeHistory.push(route);
    },
  },
});