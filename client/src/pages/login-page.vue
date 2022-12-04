<template>
  <div>
    <main class="default-container">
      <div class="login-form-box">
        <h4>登录</h4>
        <el-form ref="ruleFormRef" :label-position="labelPosition" :model="ruleForm" status-icon :rules="rules"
          label-width="5rem" class="demo-ruleForm">
          <el-form-item label="账号" prop="account">
            <el-input v-model="ruleForm.account" autocomplete="off" />
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
            <el-button @click="resetForm(ruleFormRef)">重置</el-button>
            <el-button @click="$router.push({ path: '/register' })">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import { useRouter } from 'vue-router';
import axios from '@/utils/axios';
import { useUserStore } from '@/store/user';
import axiosRequest from '@/utils/request';

const router = useRouter()

// 引入store
const userStore = useUserStore();

const ruleFormRef = ref<FormInstance>()

const labelPosition = ref('left')

const ruleForm = reactive({
  account: '',
  pass: ''
})

// 校验账号
const validateAccount = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the account'))
  }
  callback()
}

// 校验密码
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  }
  callback()
}

const rules = reactive({
  pass: [{ validator: validatePass, trigger: 'blur' }],
  account: [{ validator: validateAccount, trigger: 'blur' }]
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      // 登录请求
      tologin();
    } else {
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const tologin = () => {
  axios.post('/user/login', {
    account: ruleForm.account,
    password: ruleForm.pass
  }).then(res => {
    if (res.data.code === 200) {
      /** 
       * @TODO 封装接口 
       */
      let loginAction = {
        account: ruleForm.account,
        type: '登录',
        content: '登录成功',
      }
      // 发送行为日志
      axiosRequest.postActions(loginAction);
      // 更新状态
      userStore.$patch((state) => {
        state.checkLogin = {
          isLogin: true
        }
        state.userInfo = {
          userName: ruleForm.account,
          userId: res.data.uid,
          isAdmin: res.data.isAdmin
        }
      })
      router.push({ path: res.data.uid })
      userStore.userInfo.isAdmin ?
        ElMessage.success(`登录成功！管理员：<${ruleForm.account}>，欢迎回来！`) :
        ElMessage.success(`登录成功！用户：<${ruleForm.account}>，欢迎回来！`)
    } else {
      ElMessage.error('登录失败！')
    }
  }).catch(err => {
    ElMessage.error(err)
  })
}
</script >

<style lang="scss" scoped>
.default-container {
  display: grid;
  align-items: center;
  justify-items: center;
  height: 100vh;
  width: 100vw;
  background-color: rgb(14, 17, 19);

  .login-form-box {
    width: 20rem;
    height: 20rem;
    border: 1px solid black;
    border-radius: 0.5rem;
    padding: 1rem;
    background-color: rgb(255, 255, 255);
  }
}
</style>