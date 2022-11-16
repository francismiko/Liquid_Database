<template>
  <div>
    <div class="common-layout">
      <el-container>
        <el-header class="header">
          <el-menu :router="false" :default-active="router.currentRoute.value.path" class="el-menu-demo"
            mode="horizontal" :ellipsis="false" @select="handleSelect" text-color="#fff" background-color="#262f3e">
            <el-menu-item @click="jumpTo(`/${userID}`)" index="">
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
                      `${userName} (管理员)` :
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
                <el-sub-menu index="/connection" v-if="!isAdmin">
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
                <el-menu-item :index="userRouterMap.get(2)" v-if="!isAdmin">
                  <el-icon>
                    <icon-menu />
                  </el-icon>
                  <span>详情概览</span>
                </el-menu-item>
                <el-menu-item :index="userRouterMap.get(3)" v-if="!isAdmin">
                  <el-icon>
                    <document />
                  </el-icon>
                  <span>控制台日志</span>
                </el-menu-item>
                <el-menu-item :index="userRouterMap.get(4)" v-if="!isAdmin">
                  <el-icon>
                    <setting />
                  </el-icon>
                  <span>数据库设置</span>
                </el-menu-item>

                <!-- 管理员模块 -->
                <el-sub-menu index="/connection" v-if="isAdmin">
                  <template #title>
                    <el-icon>
                      <Connection />
                    </el-icon>
                    <span>权限管理</span>
                  </template>
                  <el-menu-item>MySQL</el-menu-item>
                </el-sub-menu>
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
import { ref, inject, onBeforeMount } from "vue";
import { useUserStore } from "@/store/user";
import {
  Document,
  Menu as IconMenu,
  Setting,
  UserFilled,
  HomeFilled,
  Connection,
  Message,
} from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";

// 引入store
const userStore = ref(useUserStore());
const { isLogin } = { ...userStore.value.checkLogin };
const { isAdmin, userName, userID } = { ...userStore.value.userInfo };

const router = useRouter();

const jumpTo = (path: string) => {
  router.push({ path: `${path}` });
};

const reload = inject("reload", Function, true);

onBeforeMount(() => {
  console.log(router.currentRoute.value.path);
})

const adminRouterMap = new Map([
  [1_1, `/${userID}/connection/mysql`],
  [1_2, `/${userID}/connection/mongodb`],
  [2, `/${userID}/details`],
  [3, `/${userID}/logs`],
  [4, `/${userID}/settings`],
]);

const userRouterMap = new Map([
  [1_1, `/${userID}/connection/mysql`],
  [1_2, `/${userID}/connection/mongodb`],
  [2, `/${userID}/details`],
  [3, `/${userID}/logs`],
  [4, `/${userID}/settings`],
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
        jumpTo('/')
        // 重置全局状态并刷新页面
        userStore.value.$reset()
        reload();
        ElMessage({
          type: 'success',
          message: `@${userName}注销成功!`,
        })
      });
  } else {
    jumpTo('/login')
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
  padding-top: $header-height + 1.25rem;
  padding-left: $aside-width + 1.25rem;
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
