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
import { reactive, ref } from 'vue';
import { useUserStore } from '@/store/user';
import axios from '@/utils/axios';

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

const saveConfig = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid: any) => {
    if (valid) {
      axios.post('/connection/mysql', {
        id: userStore.userInfo.userId,
        host: ruleForm.host,
        port: ruleForm.port,
        user: ruleForm.user,
        password: ruleForm.password,
        database: ruleForm.database,
      }).then(res => {
        if (res.data.code === 200) {
          ElNotification({
            title: 'Success',
            message: '配置保存成功！',
            type: 'success',
          })
        } else {
          ElNotification({
            title: 'Error',
            message: '配置保存失败！',
            type: 'error',
          })
        }
      }).catch(err => {
        ElNotification({
          title: 'Error',
          message: `${err}`,
          type: 'error',
        })
      })
    } else {
      return false
    }
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