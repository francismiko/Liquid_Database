import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("@/pages/index/index-page.vue"),
    },
    {
      path: "/login",
      component: () => import("@/pages/index/login-page.vue"),
    },
    {
      path: "/register",
      component: () => import("@/pages/index/register-page.vue"),
    },
    {
      path: "/:uid",
      component: () => import("@/components/layout-container.vue"),
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
          path: "logs",
          component: () => import("@/pages/home/user/log/log-page.vue"),
        },
        {
          path: "settings",
          component: () => import("@/pages/home/user/setting/setting-page.vue"),
        },
        {
          path: "manage",
          children: [
            {
              path: "permission",
              component: () =>
                import(
                  "@/pages/home/admin/user-manage/permission-manage-page.vue"
                ),
            },
          ],
        },
        {
          path: "action_logs",
          component: () =>
            import("@/pages/home/admin/action-log/action-log-page.vue"),
        },
        {
          path: "exception_logs",
          component: () =>
            import("@/pages/home/admin/exception-log/exception-log-page.vue"),
        },
      ],
    },
  ],
});
export default router;
