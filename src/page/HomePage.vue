<template>
<BasePage>
  <div slot="header">header</div>
  <div slot="aside"><navi></navi></div>
  <div slot="main">
    <el-row class="left">
      <h2 class="">森林领域</h2>
      <el-col class="linear_gra " :span="6">
        <div class="word">气象</div>
        <div class="data" >条</div>
      </el-col>
      <el-col class="linear_gra " :span="6" :offset="6">
        <div class="word">测流堰信息</div>
        <div class="data" >条</div>
      </el-col>
      <el-col class="linear_gra " :span="6" :offset="6">
        <div class="word">生态站</div>
        <div class="data" >个站点</div>
      </el-col>
      <el-col class="linear_gra linear_gra2 col-lg-3" :span="6">
        <div class="word">水文</div>
        <div class="data" >条</div>
      </el-col>
      <el-col class="linear_gra linear_gra2 col-lg-3 col-lg-offset-1"  :span="6" :offset="6">
        <div class="word">森林健康</div>
        <div class="data" >条</div>
      </el-col>
      <el-col class="linear_gra linear_gra2 col-lg-3 col-lg-offset-1" :span="6" :offset="6">
        <div class="word">径流场信息</div>
        <div class="data" >条</div>
      </el-col>
      <el-col class="linear_gra col-lg-3" :span="6">
        <div class="word">设备信息</div>
        <div class="data" >条</div>
      </el-col>
      <el-col class="linear_gra col-lg-3 col-lg-offset-1" :span="6" :offset="6">
        <div class="word">样地信息</div>
        <div class="data" >条</div>
      </el-col>
      <el-col class="linear_gra col-lg-3 col-lg-offset-1" :span="6" :offset="6">
        <div class="word">生物</div>
        <div class="data" >条</div>
      </el-col>
      <el-col class="linear_gra linear_gra2 col-lg-3" :span="6">
        <div class="word">土壤</div>
        <div class="data" >条</div>
      </el-col>
    </el-row>
    <el-row class="left">
      <h2 class="">水土保持领域</h2>
      <el-col class="linear_gra linear_gra1" :span="6">
        <div class="word"></div>
        <div class="data" >个大类</div>
      </el-col>
    </el-row>
  </div>
</BasePage>
</template>

<script>
  import navi from '../components/layout/navi'
  import BasePage from '../components/BasePage'
  export default {
    components: {navi, BasePage}
  }
</script>

<style scoped>
  .left h2{
    font-family: 'Microsoft YaHei';
    color:#8e8e8e;
    margin-top: 40px;
    margin-left: 60px;
    font-size:30px;
    font-weight:500;
    margin-bottom:10px;
    line-height:1.1;
    text-align: left;
  }

  .linear_gra{
    background: -webkit-linear-gradient(left, #6fec9d , #38FAD7); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right,  #6fec9d , #38FAD7); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #6fec9d , #38FAD7); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #6fec9d , #38FAD7); /* 标准的语法 */
    color: white;
    height: 80px;
    line-height: 80px;
    padding-right: 20px;
    border-radius: 8px!important;
    margin-top: 14px;
    font-size: 36px;
    margin-left: 100px;
    box-shadow: 0px 0px 25px lightgray;
  }
  @media (max-width: 1400px){
    .linear_gra{
      margin-left: 60px;
    }
  }
  .linear_gra1{
    background: -webkit-linear-gradient(left, #FA7797 , #FFE241); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #FA7797 , #FFE241); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #FA7797 , #FFE241); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #FA7797 , #FFE241); /* 标准的语法 */
  }
  .linear_gra2{
    background: -webkit-linear-gradient(left, #459EF3 , #00E2FA); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #459EF3 , #00E2FA); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #459EF3 , #00E2FA); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #459EF3 , #00E2FA); /* 标准的语法 */
  }
  .word{
    float: left;
    font-size: 29px;
    margin-left: 10px;
  }
  .data{
    float: right;
    font-size: 25px;
  }
</style>
