<template>
  <div>
    <div class="default-container">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script >

<style lang="scss" scoped>
.default-container {
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  height: auto;
  margin-bottom: 1rem;
  padding: 1.5rem;
  background-color: white;
}
</style>