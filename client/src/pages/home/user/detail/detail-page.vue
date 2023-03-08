<template>
  <div>
    <item>
      <el-button @click="post" type="primary">添加数据</el-button>
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

const post = () => {
  if (isConnected) {
    // 数据库连接时才能发起请求
    axios.post('/test/post', config)
      .then(res => {
        console.log(res);
      })
  } else {
    console.log('数据库未连接');
  }
}
</script >

<style lang="scss" scoped></style>