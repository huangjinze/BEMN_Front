<template>
  <div  v-loading.fullscreen.lock="loading" id="dataWashing">
    <el-col :span="24">
      <el-steps :active="step" finish-status="success" simple style="width: 82%!important;">
        <el-step title="1 范围检查"></el-step>
        <el-step title="2 去除峰值"></el-step>
        <el-step title="3 存储通量"></el-step>
        <el-step title="4 u*选择"></el-step>
        <el-step title="5 插补缺失"></el-step>
      </el-steps>
    </el-col>

    <div v-show="step === 0">
      <!--范围检查-->
      <el-col id="rangeCheck">
          <rangeCheck
                  :indexes="indexes"
                  v-model="form.range">
          </rangeCheck>
      </el-col>
    </div>

    <el-col :span="24" v-if="step === 1" id="zValue">
      <!--峰值去除-->
      z值：
      <el-input-number v-model="form.z">

      </el-input-number>

      <el-button @click="drawDespiking">提交Z值</el-button>

      <el-row v-for="(item, index) in chartIndexesMetaList" :key="'chart_key'+index">
        <el-col >
          <echart :options="item" style="width: 100%"></echart>
        </el-col>
      </el-row>



    </el-col>

    <el-col :span="24" v-if="step === 2" id="storage">
      <p class="el-icon-warning">对于植被较高的站点该步骤非常重要，如奥林匹克公园、八达岭等，对于低矮植被课不做此步骤，比如盐池灌木、草地等 </p>
      <el-col :span="24">
        <el-button id="skip" @click="onSkipClick">
          跳过
        </el-button>
      </el-col>
      <br /> <br /> <br />
      <el-row v-for="(item, index) in chartIndexesMetaList" :key="'chart_key'+index">
        <el-col>
          <echart :options="item"></echart>
        </el-col>
      </el-row>
    </el-col>

    <el-col :span="24" v-if="step === 3">
      <!--U*-->
      <echart :options="chartUMetaData"></echart>
      <span><el-input-number v-model="form.u"></el-input-number></span>
      <el-button @click="onUAdjustValueDraw" type="primary">确认</el-button>

      <div v-if="adjustChartShow" v-loading="loading">
        <echart :options="chartMetaDataUAdjust"></echart>
      </div>

      <!--<el-row v-for="(item, index) in chartIndexesMetaList" :key="'chart_key'+index">-->
        <!--<el-col>-->
          <!--<echart :options="item"></echart>-->
        <!--</el-col>-->
      <!--</el-row>-->
    </el-col>

    <div v-if="step === 4">
      插补方法选择 ：
      <el-select v-model="form.variables[0].method">
        <el-option
                v-for="item in interpolationOptions"
                :key="item.label"
                :label="item.label"
                :value="item.value">
        </el-option>
      </el-select>

      <el-row v-for="(item, index) in chartIndexesMetaList" :key="'chart_key'+index">
        <el-col class="echart-align">
          <echart :options="item"></echart>
        </el-col>
      </el-row>
    </div>

    <div v-if="step === 5">
      <i class="el-icon-success">数据QAQC完成</i>
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
  import ElButton from 'element-ui/packages/button/src/button'
  import ElInputNumber from 'element-ui/packages/input-number/src/input-number'
  import {ustarRes, checkWashingIndexRange, despiking, CStore, UStar, Gapfill} from '../../model/data'
  import echart from 'vue-echarts'
  import {mapGetters} from 'vuex'

  export default {
    components: {
      ElInputNumber,
      ElButton,
      rangeCheck,
      BasePage,
      navi,
      washingForm,
      echart},
    name: 'carbonInflux',
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
        form: {
          z: 4,
          method: ' ',
          range: [],
          u: 0.18,
          variables: [{method: ''}]
        },
        m_indexes: this.indexes,
        interpolationOptions: [{label: '平均昼夜模型', value: 'MDT'}, {label: '光温度相应模型', value: 'lr_tr'}],
        chartUMetaData: {
          title: {
            text: 'U*数据'
          },
          tooltip: {
            trigger: 'axis'
          },
          dataZoom: [{show: true, type: 'inside'}],
          animationEasing: 'elasticOut',
          animationDelayUpdate: function (idx) {
            return idx * 5
          },
          xAxis: {type: 'value'},
          yAxis: {},
          series: []
        },
        chartMetaDataUAdjust: {
          title: {
            text: 'U*调整数据'
          },
          dataZoom: [
            {show: true, type: 'inside'}
          ],
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {},
          yAxis: {},
          series: []
        },
        chartIndexesMetaList: [], // 逐个指标的图标
        adjustChartShow: false  //
      }
    },
    watch: {
      m_indexes: function (newValue) {
        console.log('test')
        if (typeof (this.form.range) !== 'undefined') {
          this.form.range.splice(0, this.form.range.length)
        }
      },
      step: function (newValue) {
        if (newValue === 3) {
          let data = {xAxis: { data: [] }, series: [{name: 'co2_flux', type: 'bar', data: []}]}
          this.loading = true
          UStar({
            'domain': '通量数据',
            'year': this.washing_form.year,
            'station': this.washing_form.station,
            'user_mail': this.msg[0][0].email,
            'type': '碳通量',
            'ustarc': this.form.u
          }).then((resp) => {
            console.log('net ustar', resp)
            console.log('net ustas step', this.step)
            if (resp.data.status !== 'success') {
              this.$alert(resp.data.reason, '失败', {confirmButtonText: 'ok'})
            } else {
              this.loading = false
              if (resp.data.data.length !== 0) {
                data.xAxis.data = resp.data.data[0].data.map((item) => {
                  return item.x
                })
                data.series = resp.data.data.map((item) => {
                  return {
                    symbolSize: 3,
                    large: true,
                    type: 'scatter',
                    name: item.name,
                    data: item.data.map((dataItem) => {
                      return dataItem.y
                    })}
                })
                this.chartIndexesMetaList.splice(0, this.chartIndexesMetaList.length)
                this.chartIndexesMetaList = resp.data.data.map((perIndex) => {
                  let meta = {
                    title: {
                      text: perIndex.name + '数据'
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
                    type: 'scatter',
                    data: perIndex.data.map((dataItem) => { return dataItem.y })
                  })
                  meta.legend.data.push('原始数据')

                  console.log('填充', meta.xAxis)

                  return meta
                })
                console.log('chart', data)
              }
              this.chartUMetaData = Object.assign(this.chartUMetaData, data)
            }
          }).catch(() => {
            this.loading = false
            alert('网络差')
          })
        }
      }
    },
    methods: {
      onSkipClick () {
        this.step = this.step + 1
      },
      onNextClick () {
        // 此处理解成 step 页面下一步点击的时候干什么
        this.loading = true

        if (this.step === 0) {
          this.postIndexes().then(
            (resp) => {
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
            }).catch(() => {
              this.step = this.step - 1
              this.loading = false
              alert('网络差')
            })
        }

        if (this.step === 1) {
          despiking({
            'data': this.form.range,
            'domain': '通量数据',
            'year': this.washing_form.year,
            'station': this.washing_form.station,
            'classification': '通量',
            'user_mail': this.msg[0][0].email,
            'z': this.form.z,
            'type': '碳通量'
          }).then((resp) => {
            if (resp.data.status === 'success') {
              this.loading = false
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

        if (this.step === 2) {
          this.chartIndexesMetaList.splice(0, this.chartIndexesMetaList.length)
          CStore({
            'domain': '通量数据',
            'year': this.washing_form.year,
            'station': this.washing_form.station,
            'user_mail': this.msg[0][0].email,
            'type': '碳通量'
          }).then((resp) => {
            this.loading = false
            if (resp.data.status === 'success') {
              this.loading = false
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
              alert(resp.data.reason)
              this.step = this.step - 1
            }
          }).catch(() => {
            this.loading = false
            alert('网络差')
            this.step = this.step - 1
          })
        }

        if (this.step === 3) {
          console.log('ustar res stepddawdwa:', this.step)
          ustarRes({
            'domain': '通量数据',
            'year': this.washing_form.year,
            'station': this.washing_form.station,
            'user_mail': this.msg[0][0].email
          }).then((resp) => {
            this.loading = false
            if (resp.data.status === 'success') {
              console.log('ustar res', resp)
              console.log('ustar res step:', this.step)
              this.loading = false
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
              alert(resp.data.reason)
              this.step = this.step - 1
            }
          }).catch(() => {
            this.loading = false
            alert('网络差')
            this.step = this.step - 1
          })
        }

        if (this.step === 4) {
          Gapfill({
            'domain': '通量数据',
            'year': this.washing_form.year,
            'station': this.washing_form.station,
            'user_mail': this.msg[0][0].email,
            'type': '碳通量',
            'variables': this.form.variables
          }).then((resp) => {
            this.loading = false
            if (resp.data.status === 'success') {
              this.loading = false
              console.log('step 4:', resp)
              alert(resp.data.data[0])
            } else {
              alert(resp.data.reason)
              this.step = this.step - 1
            }
          }).catch(() => {
            this.loading = false
            alert('网络差')
            this.step = this.step - 1
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
        this.preDisable = this.step <= 0
        this.nextDisable = false

        this.loading = false
      },
      onUAdjustValueDraw () {
        console.log('draw')
        let data = {xAxis: {data: []}, series: [{name: 'co2_flux', type: 'bar', data: []}]}
        this.loading = true
        UStar({
          'domain': '通量数据',
          'year': this.washing_form.year,
          'station': this.washing_form.station,
          'user_mail': this.msg[0][0].email,
          'type': '碳通量',
          'ustarc': this.form.u
        }).then((resp) => {
          this.loading = false
          console.log('net adjust', resp)
          if (resp.data.status !== 'success') {
            this.step = this.step - 1
            this.$alert(resp.data.reason, '失败', {confirmButtonText: 'ok'})
          } else {
            this.loading = false
            if (resp.data.data.length !== 0) {
              data.xAxis.data = resp.data.data[0].data.map((item) => {
                return item.x
              })
              data.series = resp.data.data.map((item) => {
                return {
                  name: item.name,
                  type: 'line',
                  data: item.data.map((dataItem) => {
                    return dataItem.y
                  })}
              })
              console.log('chart', data)
            }
            this.chartMetaDataUAdjust = Object.assign(this.chartMetaDataUAdjust, data)
          }
        }).catch(() => {
          this.step = this.step - 1
          alert('网络差')
        })
        this.adjustChartShow = true
      },
      postIndexes () {
        this.loading = true
        return checkWashingIndexRange(
          {
            'type': '碳通量',
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
          }).catch(() => {
            this.step = this.step - 1
            alert('网络差')
          })
      },
      drawDespiking () {
        this.loading = true
        despiking({
          'data': this.form.range,
          'domain': '通量数据',
          'year': this.washing_form.year,
          'station': this.washing_form.station,
          'classification': '通量',
          'user_mail': this.msg[0][0].email,
          'z': this.form.z,
          'type': '碳通量'
        }).then((resp) => {
          if (resp.data.status === 'success') {
            this.loading = false
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

  #rangeCheck{
    text-align: center;
    margin: 30px 0 24px 0;
    float: left;
  }
  /*.rangeCheck{*/
    /*float: left;*/
  /*}*/
  .indexSelect{
    text-align: right;
    margin-top: 8px;
  }
  #dataWashing{
    /*border-bottom: solid 1px #c4c6cb;*/
    margin-top: 24px;
  }
  .bottom-op{
    float: right;
  }
  #zValue{
    margin-top: 30px;
    text-align: center;
  }
  #storage{
    margin-top: 30px;
    text-align: center;
  }
  #skip{
    background-color: #5b8ecf;
    color: white;
  }
  .echart div{
    width: 100%!important;
  }
  .echart-align{
    text-align: center;
  }
  .echarts {
    width: 100%;
  }
</style>
