<template>
  <div  v-loading.fullscreen.lock="loading">
    <el-steps :active="step" finish-status="success" simple  style="width: 82%!important;">
      <el-step title="1 范围检查"></el-step>
      <el-step title="2 去除峰值"></el-step>
      <el-step title="3 闭合分析"></el-step>
      <el-step title="4 插补选择"></el-step>
    </el-steps>

    <div v-show="step === 0">
      <el-col id="rangeCheck" ref="regressionGraph">
        <rangeCheck
          :indexes="indexes"
          v-model="form.range">
        </rangeCheck>
      </el-col>
    </div>

    <div v-show="step === 1"  id="zValue">
      z值：
      <!--计算图的宽度-->
      <!--{{regressionGraphWidth}}-->

      <el-input-number v-model="form.z">
      </el-input-number>


      <el-button @click="drawDespiking">绘图</el-button>

      <el-row v-for="(item, index) in chartIndexesMetaList" :key="'chart_key'+index">
        <el-col :span="24">
          <echart :options="item" :style="{width: regressionGraphWidth + 'px'}"></echart>
        </el-col>
      </el-row>
    </div>

    <div v-show="step === 2" id="regressionGraph">
      <el-row>
        <el-col :span="24" id="charts">
          <echart v-show="closeChartShow" :options="chartMetaData" :style="{width: regressionGraphWidth + 'px'}"></echart>
        </el-col>
      </el-row>
      <br /> <br />
      <el-row>
        <el-col :span="24" id="drawGraph">
          <el-button @click="onUValueDraw" type="primary">生成回归图</el-button>
        </el-col>
      </el-row>
      <br /> <br />
      <el-row v-for="(item, index) in chartIndexesMetaList" :key="'chart_key'+index" >
        <el-col :span="24">
          <echart :options="item" :style="{width: regressionGraphWidth + 'px'}"></echart>
        </el-col>
      </el-row>
    </div>

    <el-row :span="24" v-show="step === 3"  id="methodSelect">
      <el-row class="select">
        请选择因变量自变量
        <el-button type="primary" size="small" @click="onAddVarClick" icon="el-icon-plus" id="plus">增加</el-button>
        <el-button type="danger" size="small" @click="onDeleteVarClick" icon="el-icon-delete">删除</el-button>
      </el-row>
      <br /> <br />

      <el-row :span="24" v-for="(item,index) in form.variables" :key="index+'varfor'" style="margin-bottom: 15px;">
        <el-col :span="8">
          因变量:
          <el-select v-model="item.independent_var">
            <el-option
              v-for="item in form.range"
              :key="item.name+'independent'"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          自变量:
          <el-select v-model="item.dependent_var">
            <el-option
              v-for="item in form.range"
              :key="item.name+'ubd'"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          插补方法选择 ：
          <el-select v-model="item.method">
            <el-option
              v-for="item in interpolationOptions"
              :key="item.label"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <br /> <br />

      <el-row v-for="(item, index) in chartIndexesMetaList" :key="'chart_key'+index">
        <el-col :span="18">
          <echart :options="item" :style="{width: regressionGraphWidth + 'px'}"></echart>
        </el-col>
      </el-row>
    </el-row>

    <div v-if="step === 4">
      <i class="el-icon-success">能量闭合分析完成</i>
    </div>


    <div class="bottom-op">
      <el-button-group>
        <el-button type="primary" @click="onPreClick" :disabled="preDisable">前一步</el-button>
        <el-button type="primary" @click="onNextClick" :disabled="nextDisable">后一步</el-button>
      </el-button-group>
    </div>
  </div>
</template>

<script>
  import rangeCheck from '../../components/datawashing/rangeCheck'
  import BasePage from '../../components/BasePage'
  import navi from '../../components/layout/navi'
  import washingForm from '../../components/datawashing/washingForm'
  import echart from 'vue-echarts'
  import ElButton from 'element-ui/packages/button/src/button'
  import ElInputNumber from 'element-ui/packages/input-number/src/input-number'
  import {checkWashingIndexRange, despiking, pca, Gapfill} from '../../model/data'
  import {mapGetters} from 'vuex'

  export default {
    components: {
      echart,
      ElInputNumber,
      ElButton,
      rangeCheck,
      BasePage,
      navi,
      washingForm},
    name: 'Energy',
    props: {
      washing_form: {type: Object},
      indexes: {type: Array}
    },
    computed: {
      ...mapGetters({
        msg: 'GET_MSG'
      })
    },
    data () {
      return {
        step: 0,
        preDisable: true,
        nextDisable: false,
        loading: false,
        closeChartShow: false,
        m_indexes: this.indexes,
        form: {
          z: 4,
          indexes: [],
          range: [],
          u: 4,
          variables: [{independent_var: '', dependent_var: '', method: ''}]
        },
        interpolationOptions: [{label: '内插', value: '内插'}],
        chartMetaData: {
          title: {
            text: '回归图'
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {},
          yAxis: {},
          series: []},
        chartIndexesMetaList: [],
        regressionGraphWidth: document.documentElement.clientWidth * 0.8
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.regressionGraphWidth = this.$refs.regressionGraph.$el.clientWidth
      })
    },
    methods: {
      onNextClick () {
        console.log(this.step)
        this.loading = true
        // 选择完指标点击下一步时，step==0，此时进行绘图,绘图完成后，step+1=1
        if (this.step === 0) {
          this.postIndexes().then(
            (resp) => {
              /*
               对每个指标进行画图, data=>data(状态码同级)[array], 使用map函数进行遍历，
               index: 是指标名称
               datax: 数据
                */
              console.log('indexess', resp)
              this.chartIndexesMetaList.splice(0, this.chartIndexesMetaList.length)
              this.chartIndexesMetaList = resp.data.data.map((perIndex) => {
                let meta = {
                  title: {
                    text: perIndex.index + '数据'
                  },
                  grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                  },
                  legend: {
                    data: []
                  },
                  animation: false,
                  dataZoom: [
                    {show: true, type: 'inside'}
                  ],
                  tooltip: {
                    trigger: 'axis'
                  },
                  xAxis: [{
                    boundaryGap: false
                  }],
                  yAxis: [{ type: 'value' }],
                  series: []
                }
                meta.xAxis[0].data = perIndex.data.map((perData) => { return perData.x })

                meta.series.push({
                  name: '原始数据',
                  symbolSize: 3,
                  large: true,
                  type: 'scatter',
                  data: perIndex.data.map((dataItem) => { return dataItem.y })
                })
                meta.legend.data.push('原始数据')

                console.log('填充', meta.xAxis)

                return meta
              })
              this.loading = false
            })
        }
        // 第一步范围检查完成，step==1，进行z值控制，完成后step+1=2
        if (this.step === 1) {
          despiking({
            'data': this.form.range,
            'domain': '通量数据',
            'year': this.washing_form.year,
            'station': this.washing_form.station,
            'user_mail': this.msg[0][0].email,
            'z': this.form.z,
            'type': '能量'
          }).then((resp) => {
            this.loading = false
            if (resp.data.status === 'success') {
              console.log(resp)
              this.chartIndexesMetaList.splice(0, this.chartIndexesMetaList.length)
              this.chartIndexesMetaList = resp.data.data.map((perIndex) => {
                let meta = {
                  title: {
                    text: perIndex.index + '数据'
                  },
                  grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                  },
                  legend: {
                    data: []
                  },
                  animation: false,
                  dataZoom: [
                    {show: true, type: 'inside'}
                  ],
                  tooltip: {
                    trigger: 'axis'
                  },
                  xAxis: [{
                    boundaryGap: false
                  }],
                  yAxis: [{ type: 'value' }],
                  series: []
                }
                meta.xAxis[0].data = perIndex.data.map((perData) => { return perData.x })

                meta.series.push({
                  name: '原始数据',
                  symbolSize: 3,
                  large: true,
                  type: 'scatter',
                  data: perIndex.data.map((dataItem) => { return dataItem.y })
                })
                meta.legend.data.push('原始数据')

                console.log('去除峰值', meta.xAxis)

                return meta
              })
            } else {
              // 如果返回状态失败，则倒退回上一步，step-1，弹出错误原因
              this.step = this.step - 1
              alert(resp.data.reason)
            }
            this.loading = false
          }).catch(() => {
            this.step = this.step - 1
            this.loading = false
            alert('网络差')
          })
        }
        // 第二步去除尖峰值，step==2，点击生成回归图，点击下一步，step+1=3
        if (this.step === 2) {
          this.loading = false
        }
        // 第三步缺失数据补全
        if (this.step === 3) {
          Gapfill({
            'domain': '通量数据',
            'year': this.washing_form.year,
            'station': this.washing_form.station,
            'user_mail': this.msg[0][0].email,
            'type': '能量',
            'variables': this.form.variables
          }).then((resp) => {
            this.loading = false
            if (resp.data.status === 'success') {
              console.log(resp)
              alert(resp.data.data[0])
            } else {
              this.step = this.step - 1
              alert(resp.data.reason)
            }
          }).catch(() => {
            this.step = this.step - 1
            this.loading = false
            alert('网络差')
          })
        }
        if (this.step >= 4) {
          this.nextDisable = true
        }
        this.preDisable = false
        this.step = this.step + 1
      },
      onPreClick () {
        this.loading = true

        this.step = this.step - 1
        this.preDisable = false
        if (this.step <= 0) {
          this.preDisable = true
        }
        this.nextDisable = false

        this.loading = false
      },
      onUValueDraw () {
        this.loading = true
        // 设置能量闭合分析图的宽度
        console.log('draw')
        pca({
          'domain': '通量数据',
          'year': this.washing_form.year,
          'station': this.washing_form.station,
          'user_mail': this.msg[0][0].email,
          'type': '能量'
        }).then((resp) => {
          console.log('net', resp)
          if (resp.data.status !== 'success') {
            this.step = this.step - 1
            this.$alert(resp.data.reason, '失败', {confirmButtonText: 'ok'})
          } else {
            this.loading = false
            console.log('success')
            // 把拟合的直线绘制出来
            let LineData = resp.data.data[0]
            let LineKValue = resp.data.data[1].gradient
            let LineBValue = resp.data.data[2].intercept
            let meta = {
              title: {
                text: '能量-水闭合分析' + '斜率：' + LineKValue + '  截距：' + LineBValue
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              legend: {
                data: []
              },
              animation: false,
              dataZoom: [
                {show: true, type: 'inside'}
              ],
              tooltip: {
                trigger: 'axis'
              },
              xAxis: [{
                boundaryGap: false
              }],
              yAxis: [{ type: 'value' }],
              series: []
            }
            meta.xAxis[0].data = LineData.data.map((perData) => { return perData.x })
            meta.series.push({
              name: '拟合结果',
              symbolSize: 3,
              large: true,
              type: 'line',
              data: LineData.data.map((dataItem) => { return dataItem.y })
            })
            meta.legend.data.push('原始数据')

            console.log('能量闭合分析', meta.xAxis)
            this.closeChartShow = true
            this.chartMetaData = meta
            this.loading = false
          }
        }).catch(() => {
          this.step = this.step - 1
          this.loading = false
          alert('网络差')
        })
      },
      postIndexes () {
        this.loading = true
        return checkWashingIndexRange(
          {
            'type': '能量',
            'data': this.form.range,
            'domain': '通量数据',
            'year': this.washing_form.year,
            'station': this.washing_form.station,
            'classification': '通量',
            'user_mail': this.msg[0][0].email
          }).then((resp) => {
            if (resp.data.status === 'success') {
              this.loading = false
              console.log(resp)
              return resp
            } else {
              this.step = this.step - 1
              alert(resp.data.reason)
            }
            this.loading = false
          }).catch(() => {
            this.step = this.step - 1
            this.loading = false
            alert('网络差')
          })
      },
      onAddVarClick () {
        this.form.variables.push({independent_var: '', dependent_var: '', method: ''})
      },
      onDeleteVarClick () {
        this.form.variables.pop()
      },
      drawDespiking () {
        this.loading = true
        despiking({
          'data': this.form.range,
          'domain': '通量数据',
          'year': this.washing_form.year,
          'station': this.washing_form.station,
          'user_mail': this.msg[0][0].email,
          'z': this.form.z,
          'type': '能量'
        }).then((resp) => {
          this.loading = false
          if (resp.data.status === 'success') {
            console.log(resp)
            this.chartIndexesMetaList.splice(0, this.chartIndexesMetaList.length)
            this.chartIndexesMetaList = resp.data.data.map((perIndex) => {
              let meta = {
                title: {
                  text: perIndex.index + '数据'
                },
                grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '3%',
                  containLabel: true
                },
                legend: {
                  data: []
                },
                animation: false,
                dataZoom: [
                  {show: true, type: 'inside'}
                ],
                tooltip: {
                  trigger: 'axis'
                },
                xAxis: [{
                  boundaryGap: false
                }],
                yAxis: [{ type: 'value' }],
                series: []
              }
              meta.xAxis[0].data = perIndex.data.map((perData) => { return perData.x })

              meta.series.push({
                name: '原始数据',
                symbolSize: 3,
                large: true,
                type: 'scatter',
                data: perIndex.data.map((dataItem) => { return dataItem.y })
              })
              meta.legend.data.push('原始数据')

              console.log('填充', meta.xAxis)

              return meta
            })
          } else {
            this.step = this.step - 1
            alert(resp.data.reason)
          }
          this.loading = false
        }).catch(() => {
          this.step = this.step - 1
          this.loading = false
          alert('网络差')
        })
      }
    }
  }
</script>

<style scoped>
  .bottom-op{
    float: right;
  }
  #rangeCheck{
    text-align: center;
    margin: 30px 0 24px 0;
  }
  #zValue,#drawGraph,#methodSelect{
    margin-top: 30px;
    text-align: center;
  }
  /*#regressionGraph .echarts{*/
    /*width: 100%;*/
  /*}*/
  /*.echart div{*/
    /*width: 100%!important;*/
  /*}*/
  /*#charts{*/
    /*text-align: center;*/
    /*width: 100%;*/
   /*}*/
  /*#methodSelect{*/
    /*margin-bottom: 30px;*/
  /*}*/
  /*.select{*/
    /*margin-bottom: 30px;*/
  /*}*/
  /*#plus{*/
    /*margin-left: 10px;*/
  /*}*/


</style>
