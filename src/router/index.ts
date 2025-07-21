import { createRouter, createWebHashHistory } from 'vue-router';
//import { useRouteStore } from '@/stores/router'; // Pinia 스토어 불러오기
//import { useAuthStore } from '@/stores/auth'; // Pinia 스토어 불러오기

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL), 
  //createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home/HomeView.vue'),
    },
    {
      path:'/term',
      name: 'term',
      redirect: '/term/service',
      children: [
        {
          path: '/service',
          name: 'service',
          component: () => import('@/views/term/service.vue')
        },
        {
          path: '/membership',
          name: 'membership',
          component: () => import('@/views/term/membership.vue')
        },
        {
          path: '/marketing',
          name: 'marketing',
          component: () => import('@/views/term/marketing.vue')
        },
        {
          path: '/accountdeletion',
          name: 'accountdeletion',
          component: () => import('@/views/term/accountdeletion.vue')
        },
      ]
    },
    {
      path: '/error',
      name: 'error',
      component: () => import('@/views/ErrorView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/error',
    },
  ]
})
  /*

router.beforeEach(async(to, from, next) => {
  const route = { from: from.fullPath, to: to.fullPath };
  const routeStore = useRouteStore(); 
  const authStore = useAuthStore();


  const code = await authStore.getParameterByName('code',window.location.href);
  
  if(code){
    await authStore.login(code);
  }

  if(to.name == 'logout' && authStore.accessToken !== ''){
    authStore.logout();
    next({ name: 'login' });
  }else if (to.name !== 'login' && authStore.accessToken == '') { 
    next({ name: 'login' });
  }else if (to.name !== 'join' && !authStore.joined && authStore.accessToken !== ''){
    next({ name: 'join' });
  }else if((to.name == 'join' || to.name == 'login') && authStore.joined && authStore.accessToken !==''){
    next({ name: 'home' });
  }else {
    routeStore.recordRoute(route); 
    next();
  }
  next();
});

  */

export default router



    /*
    {
      path:'/notice',
      name: 'notice',
      redirect: '/notice/list',
      children: [
        {
          path: 'detail/:id',
          props: true,
          name: 'noticeDetail',
          component: () => import('@/views/notice/DetailView.vue')
        },
        {
          path: 'list',
          props: true,
          name: 'noticeList',
          component: () => import('@/views/notice/BoardView.vue'),
        },


      ]
    },
    {
      path: '/profile',
      name: 'profile',
      redirect: '/profile/find',
      children: [
        {
          path: 'user/:id',
          name: 'profileInfo',
          props: true,
          component: () => import('@/views/profile/ProfileView.vue')
        },
        {
          path: 'find',
          name: 'profileFind',
          component: () => import('@/views/profile/SearchView.vue')
        },
        {
          path: 'skill/:user_id/:skill_type',
          name: 'profileSkill',
          props: true,
          component: () => import('@/views/profile/SkillView.vue')
        },
        {
          path: 'achievements',
          name: 'achievements',
          component: () => import('@/views/profile/AchievementsView.vue')
        },
        
        {
          path: 'following/:id',
          name: 'following',
          props: true,
          component: () => import('@/views/profile/FollowingView.vue')
        },
        
        {
          path: 'follower/:id',
          name: 'follower',
          props: true,
          component: () => import('@/views/profile/FollowerView.vue')
        },

        
      ]
    },
    {
      path: '/community',
      name: 'community',
      redirect: '/community/feed',
      children: [
        {
          path: 'feed',
          name: 'feed',
          component: () => import('@/views/community/FeedView.vue')
        },
        {
          path: 'challenge',
          name: 'challenge',
          component: () => import('@/views/community/ChallengeView.vue')
        },
        {
          path: 'challenge/:id',
          name: 'challengeDetail',
          props: true,
           component: () => import('@/views/community/ChallengeDetailVeiw.vue')
        },
        {
          path: 'challengewrite',
          name: 'challengeWrite',
           component: () => import('@/views/community/ChallengeWriteView.vue')
        },
         {
          path: 'crew',
          name: 'crew',
          component: () => import('@/views/community/CrewView.vue')
        },
        {
          path: 'crew/:id',
          name: 'creweDetail',
          props: true,
          component: () => import('@/views/community/CrewDetailView.vue')
        },
        {
          path: 'calendar/:id',
          name: 'creweCalendar',
          props: true,
          component: () => import('@/views/community/CrewDetailView.vue')
        },
        {
          path: 'crewcreate',
          name: 'crewCreate',
          component: () => import('@/views/community/CrewCreateView.vue')
        }
      ]
    },
    {
      path: '/skill',
      name: 'skill',
      redirect: '/skill/foot',
      children: [
        {
          path: 'basic',
          name: 'basic',
          component: () => import('@/views/skill/BasicListView.vue')
        },
        {
          path: 'foot',
          name: 'foot',
          component: () => import('@/views/skill/FootListView.vue')
        },
        {
          path: 'hand',
          name: 'hand',
          component: () => import('@/views/skill/HandListView.vue')
        },
        {
          path: 'dancing',
          name: 'dancing',
          component: () => import('@/views/skill/DancingListView.vue')
        },
        {
          path: 'basicinfo/:id',
          name: 'basicDetail',
          props: true,
          component: () => import('@/views/skill/BasicDetailView.vue')
        },
        {
          path: 'footinfo/:id',
          name: 'FootDetail',
          props: true,
          component: () => import('@/views/skill/FootDetailView.vue')
        },
        {
          path: 'handinfo/:id',
          name: 'HandDetail',
          props: true,
          component: () => import('@/views/skill/HandDetailView.vue')
        },
        {
          path: 'dancinginfo/:id',
          name: 'DancingDetail',
          props: true,
          component: () => import('@/views/skill/DancingDetailView.vue')
        },
        {
          path: 'enroll',
          name: 'skillEnroll',
          component: () => import('@/views/skill/EnrollView.vue')
        },
      ]
    },
    {
      path: '/mypage',
      name: 'mypage',
      redirect: '/mypage/skill',
      children: [
        {
          path: 'skill',
          name: 'mySkill',
          component: () => import('@/views/mypage/skill/SkillView.vue')
        },
        {
          path: 'challenge',
          name: 'myChallenge',
          component: () => import('@/views/mypage/challenge/ChallengeView.vue')
        },
        {
          path: 'calendar',
          name: 'myCalendar',
          component: () => import('@/views/mypage/calendar/CalendarView.vue')
        },
        {
          path: 'setting',
          name: 'setting',
          component: () => import('@/views/mypage/setting/SettingView.vue')
        },
      ]
    },

    {
      path : '/admin',
      name : 'admin',
      redirect : '/admin/dashboard',
      children : [
        {
          path : 'dashboard',
          name : 'adminDashboard',
          component : ()=> import('@/views/admin/ListView.vue'),
        },
        {
          path : 'skill',
          name : 'adminSkill',
          component : ()=> import('@/views/admin/SkillView.vue')
        }
      ]
    },

    {
      path: '/calendar',
      name: 'calendar',
      redirect: '/calendar/month',
      children: [
        {
          path: 'month',
          name: 'month',
          component: () => import('@/views/calendar/MonthView.vue')
        },
        {
          path: 'week',
          name: 'week',
          component: () => import('@/views/calendar/WeekView.vue')
        },
        {
          path: 'write',
          name: 'write',
          component: () => import('@/views/calendar/WriteView.vue')
        },
      ]
    },
    {
      path: '/frame',
      name: 'frame',
      component: () => import('@/views/test/FrameView.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/test/TreeView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/LoginView.vue')
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('@/views/login/LogoutView.vue')
    },
    {
      path: '/join',
      name: 'join',
      component: () => import('@/views/login/JointView.vue')
    },
    {
      path: '/error',
      name: 'error',
      component: () => import('@/views/ErrorView.vue')
    },
    */
   
    /* 
    2차 업데이트에 개발 예정
    
 
    {
      path: '/item',
      name: 'item',
      redirect: '/item/deck',
      children: [
        {
          path: 'deck',
          name: 'deck',
          component: () => import('@/views/item/DeckView.vue')
        },
        {
          path: 'truck',
          name: 'truck',
          component: () => import('@/views/item/TruckView.vue')
        },
        {
          path: 'wheel',
          name: 'wheel',
          component: () => import('@/views/item/WheelView.vue')
        },
        {
          path: 'filter',
          name: 'filter',
          component: () => import('@/views/item/FilterView.vue')
        },
        {
          path: 'brandfilter',
          name: 'brandfilter',
          component: () => import('@/views/item/BrandFilterView.vue')
        },
        {
          path: 'brand/:id',
          props: true,
          name: 'brand',
          component: () => import('@/views/item/BrandView.vue')
        },
        {
          path: 'search',
          name: 'search',
          component: () => import('@/views/item/SearchView.vue')
        },
        {
          path: 'detail/:id',
          name: 'item',
          props: true,
          component: () => import('@/views/item/DetailView.vue'),
        },
      ]
    },
    {
      path: '/map',
      name: 'map',
      redirect: '/map/spot',
      children: [
        {
          path: 'spot',
          name: 'spot',
          component: () => import('@/views/map/SpotView.vue')
        },
        {
          path: 'shop',
          name: 'shop',
          component: () => import('@/views/map/ShopView.vue')
        },
        {
          path: 'shop/:id',
          props: true,
          name: 'shopDetail',
          component: () => import('@/views/shop/DetailView.vue')
        },
        {
          path: 'spot/:id',
          props: true,
          name: 'spotDetail',
          component: () => import('@/views/spot/DetailView.vue')
        },
        {
          path: 'crew',
          name: 'crewMap',
          component: () => import('@/views/map/CrewView.vue')
        },
        {
          path: 'crew/:id',
          props: true,
          name: 'crewMapDetail',
          component: () => import('@/views/crew/DetailView.vue')
        },
        {
          path: 'search',
          name: 'mapSearch',
          component: () => import('@/views/map/SearchView.vue'),
          props: true,
        }
      ]
    },
    */
