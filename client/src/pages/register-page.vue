<template>
  <div>
    <main class="default-container">
      <div class="login-form-box">
        <h4>注册</h4>
        <el-form ref="ruleFormRef" :label-position="labelPosition" :model="ruleForm" status-icon :rules="rules"
          label-width="5rem" class="demo-ruleForm">
          <el-form-item label="账号" prop="account">
            <el-input v-model="ruleForm.account" autocomplete="off" />
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
            <el-button @click="resetForm(ruleFormRef)">重置</el-button>
            <el-button @click="$router.push({ path: '/login' })">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import router from '@/routers';
import axios from '@/utils/axios';

const ruleFormRef = ref<FormInstance>()

const labelPosition = ref('left')

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (ruleForm.checkPass !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass', () => null)
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== ruleForm.pass) {
    callback(new Error("两次密码不匹配"))
  } else {
    callback()
  }
}

const validateAccount = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入账号'))
  }
  callback()
}

const ruleForm = reactive({
  account: '',
  pass: '',
  checkPass: ''
})

const rules = reactive({
  account: [{ validator: validateAccount, trigger: 'blur' }],
  pass: [{ validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }]
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      axios.post('/user/register', {
        account: ruleForm.account,
        password: ruleForm.pass
      }).then(res => {
        if (res.data.code === 200) {
          ElMessage({
            message: '注册成功！',
            type: 'success'
          })
          router.push({ path: '/login' })
        } else {
          ElMessage({
            message: '注册失败！',
            type: 'error'
          })
        }
      }).catch(err => {
        ElMessage({
          message: `${err}`,
          type: 'error'
        })
        console.error(err);
      })
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
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