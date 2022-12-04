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
import { ElMessage } from 'element-plus';
let tableData = ref<Array<object>>([])

onMounted(() => {
  getActionLogs()
})

const getActionLogs = () => {
  axios.get('/user/actions')
    .then(res => {
      if (res.data.code === 200) {
        tableData.value = res.data.actions
        ElMessage.success('已获取最新数据')
      } else {
        ElMessage.error('服务器出现异常，请联系管理员')
      }
    }).catch(err => {
      ElMessage.error(err)
    })
}
</script >

<style lang="scss" scoped>

</style>