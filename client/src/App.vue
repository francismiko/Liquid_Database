<template>
  <router-view v-if="isRouterAlive"></router-view>
</template>

<script lang="ts" setup>
import { ref, provide, nextTick } from "vue";

// 路由刷新
const isRouterAlive = ref(true);
const reload = (): void => {
  isRouterAlive.value = false;
  nextTick(() => {
    isRouterAlive.value = true;
  });
};

provide("reload", reload);
</script>

<style lang="scss">
/* 去默认初始化 */
@import 'normalize.css';
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  color: aqua;
  background-color: rgba(0, 0, 0, 0.54);
  border-radius: 10px;
  transition: all .2s ease-in-out;
}
</style>
