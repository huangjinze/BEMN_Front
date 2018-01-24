<template>
  <div  v-loading.fullscreen.lock="loading">
    <el-steps :active="step" finish-status="success" simple>
      <el-step title="1 范围检查"></el-step>
      <el-step title="2 去除峰值"></el-step>
      <el-step title="3 闭合分析"></el-step>
      <el-step title="4 插补选择"></el-step>
    </el-steps>

    <div v-show="step === 0">
      <el-col id="rangeCheck">
        <rangeCheck
          :indexes="indexes"
          v-model="form.range">
        </rangeCheck>
      </el-col>
    </div>

    <div v-show="step === 1"  id="zValue">
      z值：
      <el-input-number v-model="form.z">

      </el-input-number>
    </div>

    <div v-show="step === 2" id="regression">
      <el-col :span="24" id="charts">
        <charts v-show="closeChartShow" class="testchart" id="chart_1" :chartMeta="chartMetaData"></charts>
      </el-col>
      <el-col :span="24" id="drawGraph">
        <el-button @click="onUValueDraw" type="primary">生成回归图</el-button>
      </el-col>
    </div>

    <el-col :span="24" v-show="step === 3"  id="methodSelect">
        <el-col class="select">
          请选择因变量自变量
          <el-button type="primary" size="small" @click="onAddVarClick" icon="el-icon-plus" id="plus">增加</el-button>
          <el-button type="danger" size="small" @click="onDeleteVarClick" icon="el-icon-delete">删除</el-button>
        </el-col>
          <el-row :span="24" v-for="(item,index) in form.variables" :key="index+'varfor'">
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
    </el-col>

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
  import charts from '../../components/echart/charts'
  import ElButton from 'element-ui/packages/button/src/button'
  import ElInputNumber from 'element-ui/packages/input-number/src/input-number'
  import {checkWashingIndexRange, despiking, pca, Gapfill} from '../../model/data'

  export default {
    components: {
      ElInputNumber,
      ElButton,
      rangeCheck,
      BasePage,
      navi,
      washingForm,
      charts},
    name: 'Energy',
    props: {
      washing_form: {type: Object},
      indexes: {type: Array}
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
        interpolationOptions: [{label: '内插', value: '内插'}, {label: '外插', value: '外插'}],
        chartMetaData: {
          title: {
            text: '回归图'
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {},
          yAxis: {},
          series: []}
      }
    },
    mounted () {
    },
    methods: {
      onNextClick () {
        this.loading = true

        if (this.step === 0) {
          this.postIndexes()
        }

        if (this.step === 1) {
          despiking({
            'data': this.form.range,
            'domain': '通量数据',
            'year': this.washing_form.year,
            'station': this.washing_form.station,
            'user_mail': '1103232282@qq.com',
            'z': this.form.z,
            'type': '能量'
          }).then((resp) => {
            this.loading = false
            if (resp.data.status === 'success') {
              console.log(resp)
              alert(resp.data.data)
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
          let data = {xAxis: {data: []}, series: [{name: 'co2_flux', type: 'bar', data: []}]}
          pca({
            'domain': '通量数据',
            'year': this.washing_form.year,
            'station': this.washing_form.station,
            'user_mail': '1103232282@qq.com',
            'type': '能量'
          }).then((resp) => {
            this.loading = false
            console.log('net', resp)
            if (resp.data.status !== 'success') {
              this.step = this.step - 1
              this.$alert(resp.data.reason, '失败', {confirmButtonText: 'ok'})
            } else {
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
              this.chartMetaData = Object.assign(this.chartMetaData, data)
            }
          }).catch(() => {
            this.step = this.step - 1
            this.loading = false
            alert('网络差')
          })
        }

        if (this.step === 3) {
          Gapfill({
            'domain': '通量数据',
            'year': this.washing_form.year,
            'station': this.washing_form.station,
            'user_mail': '1103232282@qq.com',
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

        if (this.step >= 3) {
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
        console.log('draw')
        this.closeChartShow = true
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
            'user_mail': '1103232282@qq.com'
          }).then((resp) => {
            if (resp.data.status === 'success') {
              console.log(resp)
              alert(resp.data.data[0])
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
  #zValue,#drawGraph,#methodSelect,#charts{
    margin-top: 30px;
    text-align: center;
  }
  #methodSelect{
    margin-bottom: 30px;
  }
  .select{
    margin-bottom: 30px;
  }
  #plus{
    margin-left: 10px;
  }


</style>
