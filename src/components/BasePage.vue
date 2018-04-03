
<template>
  <el-container class="app_container_view">
    <el-aside style="background-color: #314254" width="190px"><transition name="slideLeft"><navi ></navi></transition></el-aside>
    <el-container>
      <el-header height="10%">
        <transition name="slideDown">
        <el-card class="header-box-card" v-show="showMain">
          <span style="color: #696969">北京城市副中心核心区林地绿地大数据平台</span>
          <el-dropdown style="float: right"  class="user_info">
            <el-button type="text"  style="font-size: 16px;color: #518DD6">
              欢迎您！{{ msg[0][0].name }}<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><el-button type="text" @click="info">个人信息</el-button></el-dropdown-item>
              <el-dropdown-item><el-button type="text" @click="logout">退出</el-button></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-card>
        </transition>
      </el-header>
      <el-main>
        <transition name="fadeUp">
          <el-card class="main-box-card" v-show="showMain"><slot name="main"></slot> </el-card>
        </transition></el-main>
      <el-footer>Footer</el-footer>
    </el-container>

  </el-container>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {logoutUser} from '../model/user'
  import navi from './layout/navi'

  export default {
    components: {
      navi
    },
    created: function () {

    },
    data () {
      return {
        showMain: false
      }
    },
    computed: {
      ...mapGetters({
        msg: 'GET_MSG'
      })
    },
    mounted: function () {
      this.showMain = true
    },
    methods: {
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      },
      info () {
        this.$router.push({path: '/personalinfo'})
      },
      logout () {
        logoutUser().then(resp => {
          if (resp.data.status === 'success') {
            this.$router.push({path: '/index'})
          } else {
            alert('退出失败')
          }
        }).catch(resp => {
          this.$alert('网络差', '失败', {confirmButtonText: 'ok'})
        })
      }
    }
  }
</script>
<style scoped>
  .app_container_view{
    padding: 0px;
    height: 900px;
  }
  .el-header{
    background-color: #fff;
    text-align: center;
    color: #696969;
    font-size: 24px;
  }
  .el-footer{
    background-color: #313131;
    color: #fff;
  }
  .el-main{

  }
  .el-header{
    padding-top: 2px;
    padding-bottom: 50px;
    padding-left: 0px;
    padding-right: 0px;
  }
  .header-box-card{
    width: 100%;
  }

  .main-box-card{
    width: 100%;
  }
  .user_info {
    margin-bottom: 2px;
  }
</style>
