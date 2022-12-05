<template>
  <div>
    <button class="test" @click="go">登录</button>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter();

const go = () => router.push("/login");

</script >

<style lang="scss" scoped>
.test {
  position: absolute;
  top: 30%;
  left: 30%;
  width: 20rem;
  height: 20rem;
}
</style>