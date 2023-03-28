<template>
  <div>
    <item>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="table_name" label="表名" width="280" />
        <el-table-column prop="table_engine" label="引擎" width="180" />
        <el-table-column prop="table_autoincrement" label="自增" width="180" />
        <el-table-column prop="table_bytes" label="数据长度" width="180" />
        <el-table-column prop="table_description" label="描述" width="180" />
        <el-table-column label="选项">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </item>
  </div>
</template>
<script lang="ts" setup>
import item from '@/components/item-container.vue';
import { useUserStore } from '@/store/user';
import { useMysqlStore } from '@/store/mysql';
import axios from '@/utils/axios';
import axiosRequest from '@/utils/request';
import { MysqlConfiguration } from '@/types/configuration';
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';

// 引入store
const userStore = useUserStore();
const mysqlStore = useMysqlStore();

const { isConnected } = mysqlStore.mysqlStatus;
const { mysql_host, mysql_port, mysql_user, mysql_password, mysql_database } = mysqlStore.mysqlConfig;

const config: MysqlConfiguration = {
  id: userStore.userInfo.userId,
  host: mysql_host,
  port: mysql_port,
  user: mysql_user,
  password: mysql_password,
  database: mysql_database,
}

let tableData = ref<Array<object>>([])

onMounted(() => {
  getMysqlTables();
})

const handleEdit = (index: number, row) => {
  console.log(index, row)
}
const handleDelete = (index: number, row) => {
  console.log(index, row)
}

const getMysqlTables = () => {
  axios.post(`/operational/mysql/query-tables`, config)
    .then(res => {
      if (res.data.code === 200) {
        tableData.value = res.data.props
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