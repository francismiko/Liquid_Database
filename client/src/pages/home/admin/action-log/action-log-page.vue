<template>
  <div>
    <item>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="action_date" label="日期" />
        <el-table-column prop="account" label="用户名" />
        <el-table-column prop="action_type" label="行为类型" />
        <el-table-column prop="action_content" label="行为内容" />
      </el-table>
    </item>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import item from '@/components/item-container.vue'
import axios from '@/utils/axios';
let tableData = ref<Array<object>>([])

onMounted(() => {
  axios.get('/user/actions').then(res => {
    if (res.data.code === 200) {
      tableData.value = res.data.actions
      console.log(tableData)
    }
  })
})
</script >

<style lang="scss" scoped>

</style>