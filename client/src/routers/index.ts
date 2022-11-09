import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      component: () => import("@/pages/login-page.vue"),
    },
    {
      path: "/register",
      component: () => import("@/pages/register-page.vue"),
    },
    {
      path: "/home",
      component: () => import("@/pages/home/home-page.vue"),
    },
    {
      path: "/home/connection/mysql",
      component: () => import("@/pages/home/connection/mysql/mysql-page.vue"),
    },
    {
      path: "/home/connection/mongodb",
      component: () =>
        import("@/pages/home/connection/mongodb/mongodb-page.vue"),
    },
    {
      path: "/home/details",
      component: () => import("@/pages/home/detail/detail-page.vue"),
    },
    {
      path: "/home/settings",
      component: () => import("@/pages/home/setting/setting-page.vue"),
    },
    {
      path: "/home/logs",
      component: () => import("@/pages/home/log/log-page.vue"),
    },
  ],
});
export default router;
