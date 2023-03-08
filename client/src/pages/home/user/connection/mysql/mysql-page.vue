<template>
  <div>
    <img class="bg-img"
      src="@/assets/imgs/src=http___img2020.cnblogs.com_blog_2288776_202103_2288776-20210312222857763-88082277.png&refer=http___img2020.cnblogs.webp">
    <item>
      <el-form ref="ruleFormRef" :rules="rules" :inline="true" :model="ruleForm" label-width="16rem"
        class="demo-ruleForm">
        <el-form-item label="HOST" prop="host" :required="true">
          <el-input v-model="ruleForm.host" placeholder="数据库地址" />
        </el-form-item>
        <el-form-item label="PORT" prop="port" :required="true">
          <el-input v-model="ruleForm.port" placeholder="端口号" />
        </el-form-item>
        <el-form-item label="USER" prop="user" :required="true">
          <el-input v-model="ruleForm.user" placeholder="用户名" />
        </el-form-item>
        <el-form-item label="PASSWORD" prop="password" :required="true">
          <el-input v-model="ruleForm.password" placeholder="登录密码" />
        </el-form-item>
        <el-form-item label="DATABASE" prop="database" :required="true">
          <el-input v-model="ruleForm.database" placeholder="要操作的数据库名" />
        </el-form-item>
      </el-form>
      <div class="center-container">
        <el-button v-if="mysqlStore.mysqlStatus?.isConnected" @click="release" type="danger">断开连接</el-button>
        <el-button v-if="!mysqlStore.mysqlStatus?.isConnected" @click="newInstance(ruleFormRef)"
          type="primary">新建实例</el-button>
        <el-button @click="saveConfig(ruleFormRef)" type="primary" plain>保存配置</el-button>
      </div>
    </item>
  </div>
</template>

<script lang="ts" setup>
import item from '@/components/item-container.vue'
import { ElMessage, ElNotification, FormInstance } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';
import { useUserStore } from '@/store/user';
import { useMysqlStore } from '@/store/mysql';
import { MysqlConfiguration } from '@/types/configuration';
import axios from '@/utils/axios';
import axiosRequest from '@/utils/request';
import { throttle } from 'lodash';

// 引入store
const userStore = useUserStore();
const mysqlStore = useMysqlStore();

const ruleFormRef = ref<FormInstance>()

const validate = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('必填项'))
  }
  callback()
}

let ruleForm = reactive({
  host: '',
  port: '',
  user: '',
  password: '',
  database: '',
})

const rules = reactive({
  host: [{ validator: validate, trigger: 'blur' }],
  port: [{ validator: validate, trigger: 'blur' }],
  user: [{ validator: validate, trigger: 'blur' }],
  password: [{ validator: validate, trigger: 'blur' }],
  database: [{ validator: validate, trigger: 'blur' }],
})

onMounted(() => {
  getMysqlConfig();
})

// 新建实例
const newInstance = ((formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid: any) => {
    if (valid) {
      toNewInstance();
    } else {
      return false
    }
  })
})

const toNewInstance = () => {
  const config: MysqlConfiguration = {
    id: userStore.userInfo.userId,
    host: ruleForm.host,
    port: ruleForm.port,
    user: ruleForm.user,
    password: ruleForm.password,
    database: ruleForm.database,
  }
  // 更新store
  mysqlStore.$patch((state) => {
    state.mysqlConfig = {
      mysql_host: ruleForm.host,
      mysql_port: ruleForm.port,
      mysql_user: ruleForm.user,
      mysql_password: ruleForm.password,
      mysql_database: ruleForm.database,
    }
  })
  axios.post('/connection/mysql/instance', config)
    .then(res => {
      if (res.data.code === 200) {
        mysqlStore.mysqlStatus.isConnected = true;
        axiosRequest.postActions({
          account: userStore.userInfo.userName,
          type: '新建实例',
          content: `新建实例,地址:${config.host},端口:${config.port},用户名:${config.user},密码:${config.password},数据库:${config.database}`,
        })
        ElNotification({
          title: 'Success',
          message: '新建实例成功！',
          type: 'success',
        })
      } else {
        axiosRequest.postException({
          account: userStore.userInfo.userName,
          type: '新建实例',
          code: res.data.code,
          content: '新建实例失败',
        })
        ElNotification({
          title: 'Error',
          message: '新建实例失败！',
          type: 'error',
        })
      }
    }).catch(err => {
      axiosRequest.postException({
        account: userStore.userInfo.userName,
        type: '新建实例',
        code: err.response.status,
        content: `${err}`,
      })
      ElNotification({
        title: 'Error',
        message: `${err}`,
        type: 'error',
      })
    })
}

// 断开连接
const release = () => {
  const config: MysqlConfiguration = {
    id: userStore.userInfo.userId,
    host: ruleForm.host,
    port: ruleForm.port,
    user: ruleForm.user,
    password: ruleForm.password,
    database: ruleForm.database,
  }
  axios.post('/connection/mysql/release', config)
    .then(res => {
      if (res.data.code === 200) {
        mysqlStore.mysqlStatus.isConnected = false;
        axiosRequest.postActions({
          account: userStore.userInfo.userName,
          type: '断开连接',
          content: '已断开远程服务器连接',
        })
        ElNotification({
          title: 'Success',
          message: '已断开连接！',
          type: 'success',
        })
      } else {
        axiosRequest.postException({
          account: userStore.userInfo.userName,
          type: '断开连接',
          code: res.data.code,
          content: '断开连接失败',
        })
        ElNotification({
          title: 'Error',
          message: '断开连接失败！',
          type: 'error',
        })
      }
    }).catch(err => {
      axiosRequest.postException({
        account: userStore.userInfo.userName,
        type: '断开连接',
        code: err.response.status,
        content: `${err}`,
      })
      ElNotification({
        title: 'Error',
        message: `${err}`,
        type: 'error',
      })
    })
}

// 保存设置(节流)
const saveConfig = throttle((formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid: any) => {
    if (valid) {
      toSaveConfig();
    } else {
      return false
    }
  })
}, 1000)

const toSaveConfig = () => {
  const config: MysqlConfiguration = {
    id: userStore.userInfo.userId,
    host: ruleForm.host,
    port: ruleForm.port,
    user: ruleForm.user,
    password: ruleForm.password,
    database: ruleForm.database,
  }
  axios.post('/connection/mysql/config', config)
    .then(res => {
      if (res.data.code === 200) {
        axiosRequest.postActions({
          account: userStore.userInfo.userName,
          type: '修改配置',
          content: `修改配置为,地址:${config.host},端口:${config.port},用户名:${config.user},密码:${config.password},数据库:${config.database}`,
        })
        ElNotification({
          title: 'Success',
          message: '配置保存成功！',
          type: 'success',
        })
      } else {
        axiosRequest.postException({
          account: userStore.userInfo.userName,
          type: '修改配置',
          code: res.data.code,
          content: '修改配置失败',
        })
        ElNotification({
          title: 'Error',
          message: '配置保存失败！',
          type: 'error',
        })
      }
    }).catch(err => {
      axiosRequest.postException({
        account: userStore.userInfo.userName,
        type: '修改配置',
        code: err.response.status,
        content: `${err}`,
      })
      ElNotification({
        title: 'Error',
        message: `${err}`,
        type: 'error',
      })
    })
}

const getMysqlConfig = () => {
  axios.get(`/connection/mysql/config/${userStore.userInfo.userId}`)
    .then(res => {
      /* mysqlStore.$subscribe((mutation, state) => {
        ruleForm = Object.assign(ruleForm, {
          host: res.data.props.mysql_host,
          port: res.data.props.mysql_port,
          user: res.data.props.mysql_user,
          password: res.data.props.mysql_password,
          database: res.data.props.mysql_database,
        })
        console.log(res.data.props);
        console.log(mysqlStore.mysqlConfig);
      }) */
      if (res.data.code === 200) {
        // 更新store
        mysqlStore.$patch((state) => {
          state.mysqlConfig = {
            mysql_host: res.data.props.mysql_host,
            mysql_port: res.data.props.mysql_port,
            mysql_user: res.data.props.mysql_user,
            mysql_password: res.data.props.mysql_password,
            mysql_database: res.data.props.mysql_database,
          }
        })
        ruleForm = Object.assign(ruleForm, {
          host: res.data.props.mysql_host,
          port: res.data.props.mysql_port,
          user: res.data.props.mysql_user,
          password: res.data.props.mysql_password,
          database: res.data.props.mysql_database,
        })
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
.bg-img {
  display: block;
  width: 15rem;
  height: auto;
  margin: 1rem auto;
  background-repeat: no-repeat;
}

.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>