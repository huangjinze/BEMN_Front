<template>
  <div  v-loading="loading" id="dataWashing">
    <el-col :span="24">
      <el-steps :active="step" finish-status="success" simple>
        <el-step title="1 范围检查"></el-step>
        <el-step title="2 去除峰值"></el-step>
        <el-step title="3 存储通量"></el-step>
        <el-step title="4 u*选择"></el-step>
        <el-step title="5 插补缺失"></el-step>
      </el-steps>
    </el-col>

    <div v-show="step === 0">
      <el-col id="rangeCheck">
          <rangeCheck
                  :indexes="indexes"
                  v-model="form.range">
          </rangeCheck>
      </el-col>
    </div>

    <el-col :span="24" v-if="step === 1" id="zValue">
      z值：
      <el-input-number v-model="form.z">

      </el-input-number>
    </el-col>

    <el-col :span="24" v-if="step === 2" id="storage">
      <p class="el-icon-warning">对于植被较高的站点该步骤非常重要，如奥林匹克公园、八达岭等，对于低矮植被课不做此步骤，比如盐池灌木、草地等 </p>
      <el-col :span="24">
        <el-button id="skip">
          跳过
        </el-button>
      </el-col>
    </el-col>

    <el-col :span="24" v-if="step === 3">

      <charts class="testchart" id="chart_1"  :xAxis="chartMetaData.xAxis" :yAxis="chartMetaData.yAxis"
              :series="chartMetaData.series"></charts>
      请输入u*值：<el-input-number  v-model="form.u" :step="0.1"></el-input-number>
      <el-button @click="onUValueDraw" type="primary">确认</el-button>

      <div v-if="adjustChartShow">
        <charts class="chartAdjust" id="chart_2"  :xAxis="chartMetaDataUAdjust.xAxis" :yAxis="chartMetaDataUAdjust.yAxis"
                :series="chartMetaDataUAdjust.series"></charts>
      </div>

    </el-col>

    <div v-if="step === 4">
      插补方法选择 ：
      <el-select v-model="form.interpolation">
        <el-option
                v-for="item in interpolationOptions"
                :key="item.label"
                :label="item.label"
                :value="item.value">
        </el-option>
      </el-select>
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
  import charts from '../../components/echart/charts'
  import ElButton from 'element-ui/packages/button/src/button'
  import ElInputNumber from 'element-ui/packages/input-number/src/input-number'
  import {checkWashingIndexRange, despiking} from '../../model/data'

  export default {
    components: {
      ElInputNumber,
      ElButton,
      rangeCheck,
      BasePage,
      navi,
      washingForm,
      charts},
    name: 'carbonInflux',
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
        form: {
          z: 4,
          interpolation: ' ',
          range: [],
          u: 4
        },
        m_indexes: this.indexes,
        interpolationOptions: [{label: '内插', value: '内插'}, {label: '外插', value: '外插'}],
        chartUMetaData: {xAxis: {}, yAxis: {}, series: []},
        chartMetaDataUAdjust: {xAxis: {}, yAxis: {}, series: []},
        adjustChartShow: false
      }
    },
    watch: {
      m_indexes: function (newValue) {
        console.log('test')
        this.form.range.splice(0, this.form.range.length)
      }
    },
    methods: {
      onNextClick () {
        this.loading = true

        if (this.step === 0) {
          this.postIndexes().then(
            () => {
              this.loading = false
            })
        }

        if (this.step === 1) {
          despiking({
            'data': this.form.range,
            'domain': '通量数据',
            'year': this.washing_form.year,
            'station': this.washing_form.station,
            'classification': '通量',
            'user_mail': '1103232282@qq.com',
            'z': this.form.z
          }).then((resp) => {
            this.loading = false
            if (resp.data.status === 'success') {
              console.log(resp)
              alert(resp.data.data[0])
            } else {
              alert(resp.data.reason)
            }
          }).catch(() => {
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
        console.log('draw')
        this.adjustChartShow = true
      },
      postIndexes () {
        this.loading = true
        return checkWashingIndexRange(
          {
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
              alert(resp.data.reason)
            }
          }).catch(() => {
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

</style>
