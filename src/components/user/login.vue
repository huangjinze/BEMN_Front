/*

*/
<template>
  <el-form v-model="form">
    <el-form-item>
      用户名:<el-input v-model="form.email">用户名</el-input>
    </el-form-item>
    <el-form-item>
      密码:<el-input v-model="form.password">密码</el-input>
    </el-form-item>
    <el-form-item>
      验证码:<img :src="CodeUrl" @click="onRefresh"><el-input v-model="form.captcha">验证码</el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" v-on:click="onClick" >登陆</el-button>
    </el-form-item>
  </el-form>

</template>

<script>
  export default {
    components: {
    },
    name: 'login',
    props: {
      CodeUrl: String,
      value: Object,
      refreshCode: Function,
      loginClick: Function
    },
    data () {
      return {
        form: {
          email: '',
          password: '',
          captcha: ''
        }
      }
    },
    methods: {
      onClick () {
        this.$emit('input', this.form)
        console.log('login click')
        this.$emit('loginClick')
      },
      onRefresh () {
        this.$emit('refreshCode')
      }
    }
  }
</script>
<style scoped>
  #chart_container {
    height: 500px;
  }
</style>

