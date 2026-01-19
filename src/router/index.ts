import { createRouter, createWebHistory } from "vue-router"

// Router 생성
const router = createRouter({
  history: createWebHistory(), // ✅ '/' 제거
  linkActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomeView.vue"), // ✅ FIX
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
      component: () => import("@/views/HomeView.vue"), // ✅ FIX
    },

    // Not found
    { path: "/:pathMatch(.*)*", redirect: "/404" },
  ],
})

export default router
