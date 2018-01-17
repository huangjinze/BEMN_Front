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

    <el-col v-if="step === 0">
      <el-col :span="24"  id="rangeCheck">
        <el-col :span="3">
          指标选择：
        </el-col>
        <el-col :span="5">
          <rangeCheck
                  :indexes="form.indexes"
                  v-model="form.range">
          </rangeCheck>
        </el-col>
      </el-col>
    </el-col>

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
      <el-col :span="24" id="charts">
        <charts class="testchart" id="chart_1"  :xAxis="chartMetaData.xAxis" :yAxis="chartMetaData.yAxis"
                :series="chartMetaData.series">
        </charts>
      </el-col>

      <el-col :span="24" id="selectU">
        请输入u*值：
        <el-input-number  v-model="form.u" :step="0.1"></el-input-number>
        <el-button @click="onUValueDraw" type="primary">确认</el-button>
      </el-col>

      <div v-if="adjustChartShow">
        <charts class="chartAdjust" id="chart_2"  :xAxis="chartMetaDataUAdjust.xAxis" :yAxis="chartMetaDataUAdjust.yAxis"
                :series="chartMetaDataUAdjust.series"></charts>
      </div>

    </el-col>

    <el-col :span="24" v-if="step === 4" id="methodSelect">
      插补方法选择 ：
      <el-select v-model="form.interpolation">
        <el-option
          v-for="item in interpolationOptions"
          :key="item.label"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
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
  import {getWashingIndexAndRange} from '../../model/data'

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
    data () {
      return {
        step: 0,
        preDisable: true,
        nextDisable: false,
        loading: false,
        form: {
          z: 4,
          interpolation: ' ',
          indexes: [],
          range: [],
          u: 4
        },
        interpolationOptions: [{label: '内插', value: '内插'}, {label: '外插', value: '外插'}],
        chartMetaData: {xAxis: {}, yAxis: {}, series: []},
        chartMetaDataUAdjust: {xAxis: {}, yAxis: {}, series: []},
        adjustChartShow: false
      }
    },
    mounted () {
      getWashingIndexAndRange(
        {
          domain: '水土保持',
          station: '盐池_1',
          classification: '通量'}).then(resp => {
            this.loading = true
            resp.data.data[0].map(item => {
              let index = {
                name: item.name,
                high: isNaN(parseFloat(item.max_default_value)) ? 0 : parseFloat(item.max_default_value),
                low: isNaN(parseFloat(item.min_default_value)) ? 0 : parseFloat(item.min_default_value),
                isShow: true
              }
              console.log(index)
              this.form.indexes.push(index)
            })
            this.loading = false
          })
    },
    methods: {
      onNextClick () {
        this.loading = true

        this.step = this.step + 1
        if (this.step >= 4) {
          this.nextDisable = true
        }
        this.preDisable = false

        this.loading = false
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
      }
    }
  }
</script>

<style scoped>
  #rangeCheck{
    text-align: center;
    margin: 30px 0 24px 30%;
  }
  #dataWashing{
    margin-top: 24px;
  }
  .bottom-op{
    float: right;
  }
  #zValue,#methodSelect,#storage{
    margin-top: 30px;
    text-align: center;
  }
  #skip{
    background-color: #5b8ecf;
    color: white;
  }
  #charts{
    margin-top: 30px;
  }
  #selectU{
    text-align: center;
  }
  #selectU .el-input-number{
    margin-right: 17px;
  }
</style>
