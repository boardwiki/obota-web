// src/router/index.ts
import {createRouter, createWebHistory} from "vue-router"



// ---------------------
// Router 생성
// ---------------------
const router = createRouter({
  history: createWebHistory('/'),
  linkActiveClass: "active",
  routes: [
    // ------------------ Public Layout ------------------
    {
      path: "/",
      name: "home",
      component: import("@/views/HomeView.vue"),
    },
    
   {
      path: "/term",
      redirect: "/term/service",
      children: [
        {
          path: "service",
          name: "term-service",
          component: () => import("@/views/term/service.vue"),
        },
        {
          path: "membership",
          name: "term-membership",
          component: () => import("@/views/term/membership.vue"),
        },
        {
          path: "marketing",
          name: "term-marketing",
          component: () => import("@/views/term/marketing.vue"),
        },
        {
          path: "accountdeletion",
          name: "term-accountdeletion",
          component: () => import("@/views/term/accountdeletion.vue"),
        },
      ],
    },

    {
      path: "/404",
      name: "Error404",
      component: import("@/views/HomeView.vue"),
    },

    // Not found
    {path: "/:pathMatch(.*)*", redirect: "/404"},
  ],
})

router.beforeEach(async (to) => {
})

export default router
