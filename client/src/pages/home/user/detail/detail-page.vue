<template>
  <div>
    <item>
      <el-table :data="filterTableData" style="width: 100%">
        <el-table-column label="Date" prop="date" />
        <el-table-column label="Name" prop="name" />
        <el-table-column align="right">
          <template #header>
            <el-input v-model="search" size="small" placeholder="Type to search" />
          </template>
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
import { ref, computed } from 'vue';

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

const search = ref('')
const filterTableData = computed(() =>
  tableData.filter(
    (data) =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase())
  )
)
const handleEdit = (index: number, row) => {
  console.log(index, row)
}
const handleDelete = (index: number, row) => {
  console.log(index, row)
}

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'John',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Morgan',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Jessy',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script >

<style lang="scss" scoped></style>