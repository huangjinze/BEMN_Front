
<template>
  <el-container>
    <el-aside width="200px"><slot name="aside"></slot></el-aside>
    <el-container>
      <el-header><slot name="header"></slot></el-header>
      <el-main><slot name="main"></slot></el-main>
    </el-container>
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
  @import url("//unpkg.com/element-ui@2.0.5/lib/theme-chalk/index.css");
</style>

