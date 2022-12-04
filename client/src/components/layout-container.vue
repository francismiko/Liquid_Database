<template>
  <div>
    <div class="common-layout">
      <el-container>
        <el-header class="header">
          <el-menu :router="false" :default-active="router.currentRoute.value.path" class="el-menu-demo"
            mode="horizontal" :ellipsis="false" @select="handleSelect" text-color="#fff" background-color="#262f3e">
            <el-menu-item @click="jumpTo(`/${userId}`)" index="home">
              <el-icon>
                <HomeFilled />
              </el-icon>
              <span>Francismiko</span>
            </el-menu-item>
            <div class="flex-grow" />
            <el-menu-item index="1">
              <el-icon>
                <Message />
              </el-icon>
              <span>消息</span>
            </el-menu-item>
            <el-sub-menu index="2">
              <template #title>
                <el-icon>
                  <UserFilled />
                </el-icon>
                <span>{{
                    isLogin ? isAdmin ?
                      `${userName} (超级用户)` :
                      `${userName} (普通用户)` :
                      "未登录"
                }}
                </span>
              </template>
              <el-menu-item index="2-1">个人中心</el-menu-item>
              <el-menu-item index="2-2">设置</el-menu-item>
              <el-menu-item @click="changeLogin" index="2-3">{{
                  isLogin ? "注销账号" : "点此登录"
              }}
              </el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-header>
        <el-container>
          <el-aside class="aside">
            <el-col :span="12">
              <el-menu :router="true" :default-active="router.currentRoute.value.path" class="el-menu-vertical-demo"
                @open="handleOpen" @close="handleClose" text-color="#fff" background-color="#00000000">

                <!-- 用户模块 -->
                <el-sub-menu index="/connection">
                  <template #title>
                    <el-icon>
                      <Connection />
                    </el-icon>
                    <span>连接本地数据库</span>
                  </template>
                  <el-menu-item :index="userRouterMap.get(1_1)">MySQL</el-menu-item>
                  <el-menu-item :index="userRouterMap.get(1_2)">MongoDB</el-menu-item>
                  <el-menu-item index="1-3" disabled>SQLite</el-menu-item>
                  <el-menu-item index="1-4" disabled>Redis</el-menu-item>
                </el-sub-menu>
                <el-menu-item :index="userRouterMap.get(2)">
                  <el-icon>
                    <icon-menu />
                  </el-icon>
                  <span>详情概览</span>
                </el-menu-item>
                <el-menu-item :index="userRouterMap.get(3)">
                  <el-icon>
                    <document />
                  </el-icon>
                  <span>控制台日志</span>
                </el-menu-item>
                <el-menu-item :index="userRouterMap.get(4)">
                  <el-icon>
                    <setting />
                  </el-icon>
                  <span>数据库设置</span>
                </el-menu-item>

                <!-- 管理员模块 -->
                <el-sub-menu v-if="isAdmin" index="/manage">
                  <template #title>
                    <el-icon>
                      <User />
                    </el-icon>
                    <span>用户管理</span>
                  </template>
                  <el-menu-item index="1">权限管理</el-menu-item>
                  <el-menu-item disabled>用户组管理</el-menu-item>
                  <el-menu-item disabled>黑名单</el-menu-item>
                </el-sub-menu>
                <el-menu-item v-if="isAdmin">
                  <el-icon>
                    <Message />
                  </el-icon>
                  <span>站内消息管理</span>
                </el-menu-item>
                <el-menu-item :index="userRouterMap.get(7)" v-if="isAdmin">
                  <el-icon>
                    <List />
                  </el-icon>
                  <span>用户行为日志</span>
                </el-menu-item>
                <el-menu-item v-if="isAdmin">
                  <el-icon>
                    <Failed />
                  </el-icon>
                  <span>异常状态日志</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-aside>
          <el-main class="main-container">
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject, watch } from "vue";
import { useUserStore } from "@/store/user";
import {
  Document,
  Menu as IconMenu,
  Setting,
  UserFilled,
  HomeFilled,
  Connection,
  Message,
  User,
  List,
  Failed,
} from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";

// 引入store
const userStore = useUserStore();
const { isLogin } = { ...userStore.checkLogin };
const { isAdmin, userName, userId } = { ...userStore.userInfo };

const router = useRouter();

const jumpTo = (path: string) => {
  router.push({ path: `${path}` });
};

const reload = inject("reload", Function, true);

// 路由映射
const userRouterMap: Map<number, string> = new Map([
  [1_1, `/${userId}/connection/mysql`],
  [1_2, `/${userId}/connection/mongodb`],
  [2, `/${userId}/details`],
  [3, `/${userId}/logs`],
  [4, `/${userId}/settings`],
  [7, `/${userId}/action_logs`],
]);

const changeLogin = () => {
  if (isLogin) {
    ElMessageBox.confirm(
      '是否注销当前已登录的账号?',
      '注销账号',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )
      .then(() => {
        // router.replace({ path: '/' });
        // 重置全局状态并刷新页面
        userStore.$reset();
        reload();
        isLogin ?
          ElMessage.error(`注销失败!`) :
          ElMessage.success(`@${userName}注销成功!`);
      });
  } else {
    router.push({ path: "/login" });
  }
};

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

</script >

<style lang="scss" scoped>
$header-height: 3.7rem;
$aside-width: 15rem;

.header {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: $header-height;
  z-index: 100;
  user-select: none;
  background-color: #262f3e;
}

.aside {
  position: fixed;
  left: 0;
  top: 0;
  width: $aside-width;
  height: 100vh;
  padding-top: $header-height;
  z-index: 99;
  box-sizing: border-box;
  user-select: none;
  background-color: #1e222d;
}

.main-container {
  min-height: 120vh;
  padding-top: $header-height + 2rem;
  padding-left: $aside-width + 2rem;
  padding-right: 2rem;
  padding-bottom: 2rem;
  background-color: #f3f4f7;
}

.flex-grow {
  flex-grow: 1;
}

:deep(.el-menu) {
  border: none;
}

:deep(.el-col-12) {
  max-width: 100%;
}

:deep(.el-menu-item) {
  user-select: none;
}
</style>
