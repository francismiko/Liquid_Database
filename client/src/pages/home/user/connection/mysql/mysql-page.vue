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
        <el-button type="primary">新建实例</el-button>
        <el-button @click="saveConfig(ruleFormRef)" type="primary" plain>保存配置</el-button>
      </div>
    </item>
  </div>
</template>

<script lang="ts" setup>
import item from '@/components/item-container.vue'
import { ElNotification, FormInstance } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';
import { useUserStore } from '@/store/user';
import { MysqlConfiguration } from '@/types/configuration';
import axios from '@/utils/axios';
import axiosRequest from '@/utils/request';

// 引入store
const userStore = useUserStore();

const ruleFormRef = ref<FormInstance>()

const validate = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('必填项'))
  }
  callback()
}

const ruleForm = reactive({
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
  getActionLogs()
})

const getActionLogs = () => {
  axios.get('/connection/mysql/config')
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

const saveConfig = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid: any) => {
    if (valid) {
      toSaveConfig();
    } else {
      return false
    }
  })
}

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