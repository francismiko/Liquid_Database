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

const config: MysqlConfiguration = {
  id: userStore.userInfo.userId,
  host: mysqlStore.mysqlConfig.mysql_host,
  port: mysqlStore.mysqlConfig.mysql_port,
  user: mysqlStore.mysqlConfig.mysql_user,
  password: mysqlStore.mysqlConfig.mysql_password,
  database: mysqlStore.mysqlConfig.mysql_database,
}

const post = () => {
  axios.post('/mysql/post', config)
    .then(res => {
      console.log(res);
    })
}
</script >

<style lang="scss" scoped></style>