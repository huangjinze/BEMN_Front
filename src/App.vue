<template>
  <div id="app">
    <div >
      <router-view></router-view>
    </div>

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
  }
  input{
    text-align: center;
  }
  body{
    margin-top: 0%;
    height: 100%;
  }
</style>
