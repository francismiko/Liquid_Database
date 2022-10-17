<template>
  <div>
    <main class="default-container">
      <div class="login-form-box">
        <p>Login</p>
        <el-form
          ref="ruleFormRef"
          :label-position="labelPosition"
          :model="ruleForm"
          status-icon
          :rules="rules"
          label-width="5rem"
          class="demo-ruleForm"
        >
          <el-form-item label="Accuont" prop="account">
            <el-input v-model="ruleForm.account" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Password" prop="pass">
            <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)"
              >Submit</el-button
            >
            <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
          </el-form-item>
        </el-form>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'

const ruleFormRef = ref<FormInstance>()

const labelPosition = ref('left')

const validateAccount = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the account'))
  } 
  callback()
}

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } 
  callback()
}

const ruleForm = reactive({
  account: '',
  pass: ''
})

const rules = reactive({
  pass: [{ validator: validatePass, trigger: 'blur' }],
  account: [{ validator: validateAccount, trigger: 'blur' }]
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
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

<style lang="scss">
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