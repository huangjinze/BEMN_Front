/*

*/
<template>
  <div id="loginform">
    <el-row>
      <el-col :span="6" :offset="9">
        <div class="grid-content bg-purple-light">
          <el-form v-model="form">
            <el-form-item>
              <i class="el-icon-edit"></i>
              <el-input v-model="form.email" placeholder="用户名" ></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="form.password" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item>
              <img :src="CodeUrl" @click="onRefresh"><el-input v-model="form.captcha" placeholder="验证码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" v-on:click="onClick" icon="el-icon-d-arrow-right">登陆</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
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
  #loginform{
    margin-top: 150px;
  }
</style>

