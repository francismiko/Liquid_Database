import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("@/pages/index-page.vue"),
    },
    {
      path: "/login",
      component: () => import("@/pages/login-page.vue"),
    },
    {
      path: "/register",
      component: () => import("@/pages/register-page.vue"),
    },
    {
      path: "/:id",
      component: () => import("@/pages/home/home-page.vue"),
      children: [
        {
          path: "connection",
          children: [
            {
              path: "mysql",
              component: () =>
                import("@/pages/home/user/connection/mysql/mysql-page.vue"),
            },
            {
              path: "mongodb",
              component: () =>
                import("@/pages/home/user/connection/mongodb/mongodb-page.vue"),
            },
          ],
        },
        {
          path: "details",
          component: () => import("@/pages/home/user/detail/detail-page.vue"),
        },
        {
          path: "settings",
          component: () => import("@/pages/home/user/setting/setting-page.vue"),
        },
        {
          path: "logs",
          component: () => import("@/pages/home/user/log/log-page.vue"),
        },
        {
          path: "action_logs",
          component: () => import("@/pages/home/admin/action-log/action-log-page.vue"),
        },
      ],
    },
  ],
});
export default router;
