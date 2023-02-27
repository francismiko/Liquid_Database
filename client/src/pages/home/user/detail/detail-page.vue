<template>
  <div>
    <item>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content ep-bg-purple" />
        </el-col>
        <el-col :span="6">
          <div class="grid-content ep-bg-purple" />
        </el-col>
        <el-col :span="6">
          <div class="grid-content ep-bg-purple" />
        </el-col>
        <el-col :span="6">
          <div class="grid-content ep-bg-purple" />
        </el-col>
      </el-row>
    </item>
  </div>
</template>

<script lang="ts" setup>
import item from '@/components/item-container.vue'
import axios from '@/utils/axios';
</script >

<style lang="scss" scoped>

</style>