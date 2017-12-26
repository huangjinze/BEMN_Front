
<template>
  <el-container>
    <el-header><slot name="header"></slot></el-header>
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
  export default {
    methods: {
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>
<style scoped>
/*  @import url("//unpkg.com/element-ui@2.0.5/lib/theme-chalk/index.css");
  @import "../assets/font/font-awesome-4.7.0/css/font-awesome.min.css";*/
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
</style>

