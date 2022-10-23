<template>
  <div>
    <div class="common-layout">
      <el-container>
        <el-header class="header">
          <el-menu :default-active="null" class="el-menu-demo" mode="horizontal" :ellipsis="false"
            @select="handleSelect" text-color="#fff" background-color="#262f3e">
            <el-menu-item index="0">Francismiko</el-menu-item>
            <div class="flex-grow" />
            <el-menu-item index="1">Processing Center</el-menu-item>
            <el-sub-menu index="2">
              <template #title>{{
                  userStore.checkLogin.isLogin ? userStore.userInfo.userName : "未登录"
              }}
              </template>
              <el-menu-item index="2-1">个人中心</el-menu-item>
              <el-menu-item index="2-2">设置</el-menu-item>
              <el-menu-item @click="changeLogin" index="2-3">{{
                  userStore.checkLogin.isLogin ? "注销账号" : "点此登录"
              }}
              </el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-header>
        <el-container>
          <el-aside class="aside">
            <el-col :span="12">
              <el-menu default-active="null" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                text-color="#fff" background-color="#00000000">
                <el-sub-menu index="1">
                  <template #title>
                    <el-icon>
                      <location />
                    </el-icon>
                    <span>连接本地数据库</span>
                  </template>
                  <el-menu-item index="1-1">MySQL</el-menu-item>
                  <el-menu-item index="1-2">MongoDB</el-menu-item>
                  <el-menu-item index="1-3">SQLite</el-menu-item>
                  <el-menu-item index="1-4">Redis</el-menu-item>
                </el-sub-menu>
                <el-menu-item index="2">
                  <el-icon>
                    <icon-menu />
                  </el-icon>
                  <span>详情概览</span>
                </el-menu-item>
                <el-menu-item index="3">
                  <el-icon>
                    <document />
                  </el-icon>
                  <span>控制台日志</span>
                </el-menu-item>
                <el-menu-item index="4">
                  <el-icon>
                    <setting />
                  </el-icon>
                  <span>数据库设置</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-aside>
          <el-container>
            <el-main class="main">
              <el-button @click="test" type="primary">测试</el-button>
              <slot></slot>
            </el-main>

            <el-footer></el-footer>
          </el-container>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useUserStore } from "@/store/user";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
import { useRouter } from "vue-router";

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

const router = useRouter();

// 引入store
const userStore = ref(useUserStore());

const changeLogin = () => {
  if (userStore.value.checkLogin.isLogin) {
    // 重置全局状态
    userStore.value.$reset()
  } else {
    router.push('/login')
  }
};

const test = () => {
  console.log(
    userStore.value.userInfo.userName,
    userStore.value.checkLogin.isLogin
  );
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
  background-color: #1e222d;
}

.main {
  padding-top: $header-height;
  padding-left: $aside-width;
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
</style>
