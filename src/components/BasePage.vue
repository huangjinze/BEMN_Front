
<template>
  <el-container>
    <el-header><slot name="header">北京城市副中心核心区林地绿地大数据平台</slot></el-header>
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

