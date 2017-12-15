/*

*/
<template>
  <div>
    <div id="loginform" >
      <el-row>
        <el-col :span="6" :offset="9">
          <div class="grid-content bg-purple-light">
            <el-form v-model="form">
              <el-row :gutter="20">
                <el-col :span="24">
                  <div class="logo" align="center" style="width:120%;">
                    <h1 style="color:#42DCA3;font-weight:bold;text-shadow:#333 1px 1px 1px;font-size: 40px">林业生态大数据平台</h1>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24">
                  <div class="grid-content bg-purple">
                    <el-form-item>
                      <el-input v-model="form.email" placeholder="用户名" ></el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24">
                  <div class="grid-content bg-purple">
                    <el-form-item>
                      <el-input v-model="form.password" placeholder="密码"></el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="16">
                  <div class="grid-content bg-purple">
                    <div class="grid-content bg-purple">
                      <el-input v-model="form.captcha" placeholder="验证码"></el-input>
                    </div>

                  </div>
                </el-col>
                <el-col :span="8">
                  <el-form-item>
                    <img :src="CodeUrl" @click="onRefresh">
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item>
                <el-button type="primary" v-on:click="onClick" icon="el-icon-d-arrow-right">登陆</el-button>
              </el-form-item>


            </el-form>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>

</template>

<script>
//  import * as THREE from 'three'
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
//  renderer = new THREE.CanvasRenderer()
</script>
<style scoped>
  #chart_container {
    height: 500px;
  }
  #loginform{
    margin-top: 16%;
  }
</style>

