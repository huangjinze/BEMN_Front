
<template>
  <el-container>
    <!--北京城市副中心核心区林地绿地大数据平台-->
    <el-header>
      <slot name="header">北京城市副中心核心区林地绿地大数据平台</slot>
      <el-dropdown style="float: right">
        <el-button type="text"  style="font-size: 16px;color: white">
          欢迎您！{{ msg[0][0].name }}<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item><el-button type="text" @click="info">个人信息</el-button></el-dropdown-item>
          <el-dropdown-item><el-button type="text" @click="logout">退出</el-button></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-container>
      <el-aside width="200px"><slot name="aside"></slot></el-aside>
      <el-main><slot name="main"></slot></el-main>
    </el-container>
    <el-footer>
      <slot name="footer"></slot>
      <slot name="footer-copyright"></slot>
    </el-footer>
  </el-container>

</template>
<script>
  import {mapGetters} from 'vuex'
  import {logoutUser} from '../model/user'
  export default {

    created: function () {

    },
    computed: {
      ...mapGetters({
        msg: 'GET_MSG'
      })
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
  .el-header{
    background-color: #6484b3;
    height: 75px!important;
    text-align: center;
    color: #fff;
    font-size: 24px;
  }
  .el-footer{
    background-color: #313131;
    color: #fff;
  }
  .el-main{
    overflow: hidden;
  }
  .el-header{
    padding-top: 22px;
  }
</style>

