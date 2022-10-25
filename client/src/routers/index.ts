import { createRouter, createWebHashHistory } from "vue-router";
const router = createRouter({
  history: createWebHashHistory(),
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
      children: [
        {
          path: "details",
          component: () => import("@/pages/home/detail/detail-page.vue"),
        },
        {
          path: "connections",
          children: [
            {
              path: "mysql",
              component: () =>
                import("@/pages/home/connection/mysql/mysql-page.vue"),
            },
            {
              path: "mongodb",
              component: () =>
                import("@/pages/home/connection/mongodb/mongodb-page.vue"),
            },
          ],
        },
        {
          path: "settings",
          component: () => import("@/pages/home/setting/setting-page.vue"),
        },
        {
          path: "logs",
          component: () => import("@/pages/home/log/log-page.vue"),
        },
      ],
    },
  ],
});
export default router;
