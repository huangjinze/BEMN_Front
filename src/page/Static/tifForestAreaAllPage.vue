<!-- 该模块为:点击导航栏的“数据展示”->“森林领域”->“全部”时，显示的页面内容-->
<<template>
    <BasePage>
        <div slot="header">header</div>
        <div slot="aside"><navi></navi></div>
        <div slot="main" class="main">
            <el-row  class="row" :gutter="24" >
                <el-col class="fourPart" :span="6">
                    <div class="line11 line1 colorblock">
                        <div class="indicator">水文</div>
                        <div class="data" >共{{hydrology}}条记录</div>
                    </div>
                </el-col>
                <el-col class="fourPart" :span="6" :offset="6">
                    <div class="line12 line1 colorblock">
                        <div class="indicator">土壤</div>
                        <div class="data" >共{{soil}}条记录</div>
                    </div>
                </el-col>
                <el-col class="fourPart " :span="6" :offset="6">
                    <div class="line13 line1 colorblock">
                        <div class="indicator">生物</div>
                        <div class="data" >共{{ biology}}条记录</div>
                    </div>
                </el-col>
                <el-col class="fourPart " :span="6" :offset="6">
                    <div class="line14 line1 colorblock">
                        <div class="indicator">气象</div>
                        <div class="data" >共{{ Meteorology }}条记录</div>
                    </div>
                </el-col>
            </el-row>
            <div class="clearfix"></div>
            <el-row class="row">
                <el-col class="bordleft col-lg-6 col-md-6 col-sm-6 col-xs-12" :span="12">
                    <div class="line2 colorblock" style="background-color: #F8D844;">
                        <div class="indicator1">样地信息</div>
                        <div class="data1" >共{{ sample_areas }}条记录</div>
                    </div>
                </el-col>
                <el-col class="bordright col-lg-6 col-md-6 col-sm-6 col-xs-12" :span="12" :offset="12">
                    <div class="line2 colorblock" style="background-color: #5DCE4E;">
                        <div class="indicator1">森林健康</div>
                        <div class="data">共{{ forestry }}条记录</div>
                    </div>
                </el-col>
            </el-row>
            <el-row class="row">
                <el-col class="bordleft col-lg-6 col-md-6 col-sm-6 col-xs-12" :span="12">
                    <div class="line2 colorblock" style="background-color:#9FC5F5;">
                        <div class="indicator1">径流场信息</div>
                        <div class="data" >共{{ catchment }}条记录</div>
                    </div>
                </el-col>
                <el-col class="bordright col-lg-6 col-md-6 col-sm-6 col-xs-12" :span="12" :offset="12">
                    <div class="line2 colorblock" style="background-color:#8E7AF8;">
                        <div class="indicator1">测流堰信息</div>
                        <div class="data" >共{{ flow }}条记录</div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </BasePage>
</template>
<<script>
    import navi from '../../components/layout/navi'
    import BasePage from '../../components/BasePage'
    import {getTIFCounts} from '../../model/tifData'
    export default {
      components: {navi, BasePage},
      data () {
        return {
          hydrology: '0',
          soil: '0',
          biology: '0',
          Meteorology: '2460',
          sample_areas: '119',
          forestry: '346',
          catchment: '138',
          flow: '111'
        }
      },
      mounted: function () {
        getTIFCounts().then(resp => {
          let data = resp.data[0]
          console.log(data)
          this.hydrology = data['hydrology']
          this.soil = data['soil']
          this.biology = data['biology']
          this.Meteorology = data['Meteorology']
          this.sample_areas = data['sample_areas']
          this.forestry = data['forestry']
          this.catchment = data['catchment']
          this.flow = data['flow']
          console.log('get_TIF_counts')
        }).catch(resp => {
          this.$alert('网络差', '失败', {confirmButtonText: 'ok'})
        })
      }
    }
</script>
<style scoped>
    .fourPart{
        padding-left: 15px;
        padding-right: 15px;
    }
    .bordleft{
        padding-right:15px ;
    }
    .bordright{
        padding-left:15px ;
    }
    .el-col-offset-6,.el-col-offset-12{
        margin-left: 0;
    }
    .line1{
        height: 210px;
        background-repeat: no-repeat;
        background-position: center;
        color: white;
        text-align: center;
        /*line-height: 180px;*/
        cursor: pointer;
    }
    .line2{
        height: 125px;
        font-size: 36px;
        color: white;
        text-align: center;
        /*line-height: 125px;*/
        cursor: pointer;
    }
    .line3{
        height: 125px;
        font-size: 36px;
        color: white;
        text-align: center;
        line-height: 125px;
        cursor: pointer;
    }
    .line11{
        background-color: #9FC5F5;
        background-image: url("../../assets/water.png");
    }
    .line12{
        background-color: #F8D844;
        background-image: url("../../assets/mountain.png");
    }
    .line13{
        background-color: #5DCE4E;
        background-image: url("../../assets/leaf.png");
    }
    .line14{
        background-color: #8E7AF8;
        background-image: url("../../assets/globe.png");
    }
    .row{
        margin-top: 20px;
    }
    .data{
        padding-top: 6px;
        font-size: 20px;
        font-weight: 500;
    }
    .data1{
        padding-top: 3px;
        font-size: 20px;
        font-weight: 500;
    }
    .indicator{
        font-size: 40px;
        padding-top: 60px;
        font-weight: 500;
    }
    .indicator1{
        font-size: 40px;
        padding-top: 16px;
        font-weight: 500;
    }
</style>
