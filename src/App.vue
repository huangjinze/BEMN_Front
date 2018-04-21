<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    date () {
      return {
      }
    }
  }
</script>

<style>
  #app {
    font-family: "微软雅黑";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    min-width: 960px;
    min-height: 100%;
    border-top: 0px;
    border-bottom: 0px;
    border-left: 0px;
    border-right: 0px;
  }
  input{
    text-align: center;
  }
  body{
    margin-top: 0%;
    height: 100%;
  }
  .el-aside{
    overflow: hidden;
    width: auto!important;
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }
  #app {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }
  #container {
    min-height: 100%;
  }
  .el-container {
    display: flex;
    min-height: 100vh;
    /*flex-direction: column;*/
  }
  /*body{*/
    /*display: flex;*/
  /*}*/
</style>
