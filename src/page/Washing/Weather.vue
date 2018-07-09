<template>
  <div  v-loading.fullscreen.lock="loading">
    <el-steps :active="step" finish-status="success" simple style="width: 82%!important;">
      <el-step title="1 范围检查"></el-step>
      <el-step title="2 去除峰值"></el-step>
      <el-step title="3 插补缺失"></el-step>
    </el-steps>

    <div v-show="step === 0">
      <el-col id="rangeCheck">
        <rangeCheck
          :indexes="indexes"
          v-model="form.range">
        </rangeCheck>
      </el-col>
    </div>

    <div v-show="step === 1" id="zValue">
      z值：
      <el-input-number v-model="form.z">

      </el-input-number>
      <el-row>
        <el-button @click="drawDespiking">绘图</el-button>
      </el-row>

      <el-row v-for="(item, index) in chartIndexesMetaList" :key="'chart_key'+index">
        <el-col :span="18" :offset="3">
          <echart :options="item"></echart>
        </el-col>
      </el-row>
    </div>

    <div v-show="step === 2" id="methodSelect">
        <el-row class="select">
          请选择因变量自变量
          <el-button type="primary" size="small" @click="onAddVarClick" icon="el-icon-plus" id="plus">增加</el-button>
          <el-button type="danger" size="small" @click="onDeleteVarClick"  icon="el-icon-delete">删除</el-button>
        </el-row>
          <el-row :span="24" v-for="(item,index) in form.variables" :key="index+'varfor'"  style="margin-bottom: 15px;">
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

      <el-row v-for="(item, index) in chartIndexesMetaList" :key="'chart_key'+index">
        <el-col :span="18" :offset="3">
          <echart :options="item"></echart>
        </el-col>
      </el-row>
    </div>

    <div v-if="step === 3">
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
  import {checkWashingIndexRange, despiking, Gapfill} from '../../model/data'
  import rangeCheck from '../../components/datawashing/rangeCheck'
  import BasePage from '../../components/BasePage'
  import navi from '../../components/layout/navi'
  import washingForm from '../../components/datawashing/washingForm'
  import {mapGetters} from 'vuex'
  import echart from 'vue-echarts'

  export default {
    components: {
      rangeCheck,
      BasePage,
      navi,
      washingForm,
      echart
    },
    name: 'Weather',
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
          indexes: [],
          range: [],
          variables: [{independent_var: '', dependent_var: '', method: ''}]
        },
        m_indexes: this.indexes,
        chartIndexesMetaList: [],
        interpolationOptions: [{label: '内插', value: '内插'}, {label: '外插', value: '外插'}]
      }
    },
    watch: {
      m_indexes: function (newValue) {
        console.log('test')
        if (typeof (this.form.range) !== 'undefined') {
          this.form.range.splice(0, this.form.range.length)
        }
      }
    },
    methods: {
      onNextClick () {
        this.loading = true

        if (this.step === 0) {
          this.postIndexes().then(
            (resp) => {
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
              this.loading = false
            })
        }

        if (this.step === 1) {
          this.drawDespiking()
        }

        if (this.step === 2) {
          Gapfill({
            'domain': '通量数据',
            'year': this.washing_form.year,
            'station': this.washing_form.station,
            'user_mail': this.msg[0][0].email,
            'type': '气象',
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
            this.loading = false
            this.step = this.step - 1
            alert('网络差')
          })
        }

        if (this.step >= 2) {
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
      postIndexes () {
        this.loading = true
        return checkWashingIndexRange(
          {
            'type': '气象',
            'data': this.form.range,
            'domain': '通量数据',
            'year': this.washing_form.year,
            'station': this.washing_form.station,
            'user_mail': this.msg[0][0].email
          }).then((resp) => {
            this.loading = false
            if (resp.data.status === 'success') {
              console.log(resp)
              return resp
            } else {
              this.step = this.step - 1
              alert(resp.data.reason)
            }
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
        despiking({
          'data': this.form.range,
          'domain': '通量数据',
          'year': this.washing_form.year,
          'station': this.washing_form.station,
          'user_mail': this.msg[0][0].email,
          'z': this.form.z,
          'type': '气象'
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
        }).catch(() => {
          this.loading = false
          this.step = this.step - 1
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
  #zValue,#methodSelect{
    text-align: center;
    margin: 30px 0;
  }
  .select{
    margin-bottom: 30px;
  }
  #plus{
    margin-left: 10px;
  }

</style>
