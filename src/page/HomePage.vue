<template>
<BasePage>
  <div slot="header">header</div>
  <div slot="aside"><navi></navi></div>
  <div slot="main" class="main">
    <el-row class="left">
      <h2 class="">森林生态</h2>

    </el-row>
    <el-row class="left">
      <h2 class="">通量数据</h2>
      <el-col class="linear_gra linear_gra1" :span="6"
              v-for="(value, index) in vftResults"
              :key="value.name">
        <div class="word">{{value.name}}</div>
        <div class="data" >{{value.counts}}个大类</div>
      </el-col>
    </el-row>
  </div>
</BasePage>
</template>

<script>
  import navi from '../components/layout/navi'
  import BasePage from '../components/BasePage'
 // import {getTIFCounts} from '../model/tifData'
  import {getVFTCounts} from '../model/vftData'
  export default {
    components: {navi, BasePage},
    data () {
      return {
        tifCounts: [],
        vftResults: []
      }
    },
    mounted: function () {
//      getTIFCounts().then(resp => {
//        let data = resp.data[0]
//        this.tifCounts.push({ 'hydrology': data['hydrology'],
//          'stationNum': data['stationNum'],
//          'device': data['device'],
//          'soil': data['soil'],
//          'biology': data['biology'],
//          'Meteorology': data['Meteorology'],
//          'sample_areas': data['sample_areas'],
//          'forestry': data['forestry'],
//          'catchment': data['catchment'],
//          'flow': data['flow']
//        })
//        console.log(this.tifCounts)
//      }).catch(resp => {
//        this.$alert('网络差', '失败', {confirmButtonText: 'ok'})
//      })
      getVFTCounts().then(resp => {
        console.log(resp)
        let name = resp.data.data[0][0]
        let counts = resp.data.data[0][1]
        console.log(counts)
        for (var index = 0; index < name.length; index++) {
          this.vftResults.push({ name: name[index], counts: counts[index] })
        }
        console.log(this.vftResults)
      }).catch(resp => {
        this.$alert('网络差', '失败', {confirmButtonText: 'ok'})
      })
    }
  }
</script>

<style scoped>
  .main{
    background: url("../assets/pattern.png") repeat;
  }
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
