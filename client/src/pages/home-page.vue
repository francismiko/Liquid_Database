<template>
  <div>
    <main class="default-container">
      <button @click="$router.push({path:'/login'})">登录</button>
    </main>
  </div>
</template>

<script lang="ts" setup>

</script >

<style lang="scss">
.default-container {
  display: grid;
  align-items: center;
  justify-items: center;
  height: 100vh;
  width: 100vw;
  background-color: rgb(14, 17, 19);

  .login-form-box {
    width: 20rem;
    height: 20rem;
    border: 1px solid black;
    border-radius: 0.5rem;
    padding: 1rem;
    background-color: rgb(255, 255, 255);
  }
}
</style>