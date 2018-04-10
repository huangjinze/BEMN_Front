<template>
  <BasePage>
    <div slot="main" class="main">
      <el-card class="left">
        <h2 class="tree">
          <i class="fa fa-tree" aria-hidden="true"></i>
          森林生态</h2>
      </el-card>
      <el-card class="left">
        <h2 class="tower">
          <i class="fa fa-bank" aria-hidden="true"></i>
          通量数据
        </h2>
        <el-col  :xs="12" :sm="8" :md="8" :lg="4" :offset="1"
                v-for="(value, index) in vftResults"
                :key="value.name">
          <el-button class="dataButton">
            <span class="dataName">
              {{value.name}}
            </span>
            <span class="dataCount">{{value.counts}}个大类</span>
          </el-button>
        </el-col>
      </el-card>
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
  .left{
    margin-top: 30px;
  }
  .left h2{
    font-family: 'Microsoft YaHei';
    color:#8e8e8e;
    margin-top: 20px;
    margin-left: 60px;
    font-size:30px;
    font-weight:500;
    margin-bottom:10px;
    line-height:1.1;
    text-align: left;
  }
  .tree .fa-tree,.tower .fa-bank{
    color: #1d9e74;
  }
  /*.tower .fa-bank{*/
    /*color: #0C2950;*/
  /*}*/
  .linear_gra{
    /*background: -webkit-linear-gradient(left, #6fec9d , #38FAD7); !* Safari 5.1 - 6.0 *!*/
    /*background: -o-linear-gradient(right,  #6fec9d , #38FAD7); !* Opera 11.1 - 12.0 *!*/
    /*background: -moz-linear-gradient(right, #6fec9d , #38FAD7); !* Firefox 3.6 - 15 *!*/
    /*background: linear-gradient(to right, #6fec9d , #38FAD7); !* 标准的语法 *!*/
    color: white;
    height: 80px;
    line-height: 80px;
    padding-right: 20px;
    border-radius: 8px!important;
    margin-top: 14px;
    font-size: 36px;
    margin-left: 100px;
    /*box-shadow: 0px 0px 25px lightgray;*/
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
    background: -webkit-linear-gradient(left, #518DD6 , #87CEFA); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #518DD6 , #87CEFA); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #518DD6 , #87CEFA); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #518DD6 , #87CEFA); /* 标准的语法 */
  }
  .dataButton {
    height: 60px;
    margin: 20px 0;
    background: #518dd6;
    color: #fff;
  }
  .dataName{
    font-size: 20px;
    padding-right: 30px;
  }
</style>
