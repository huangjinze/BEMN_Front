<template>
  <div  v-loading="loading">
    <el-steps :active="step" finish-status="success" simple>
      <el-step title="1 范围检查"></el-step>
      <el-step title="2 去除峰值"></el-step>
      <el-step title="3 存储通量"></el-step>
      <el-step title="4 u*选择"></el-step>
      <el-step title="5 插补缺失"></el-step>
    </el-steps>

    <div v-if="step === 0">
      <rangeCheck></rangeCheck>
    </div>

    <div v-if="step === 1">
      z值：
      <el-input-number v-model="form.z">

      </el-input-number>
    </div>

    <div v-if="step === 2">
      <i class="el-icon-warning">对于植被较高的站点该步骤非常重要，如奥林匹克公园、八达岭等，对于低矮植被课不做此步骤，比如盐池灌木、草地等 </i>
    </div>

    <div v-if="step === 3">
      <charts class="testchart" id="1"  :xAxis="chartMetaData.xAxis" :yAxis="chartMetaData.yAxis"
              :series="chartMetaData.series"></charts>
    </div>

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
        <el-button type="primary" @click="onPreClick">pre</el-button>
        <el-button type="primary" @click="onNextClick">next</el-button>
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

  export default {
    components: {
      rangeCheck,
      BasePage,
      navi,
      washingForm,
      charts},
    name: 'carbonInflux',
    data () {
      return {
        step: 0,
        loading: false,
        form: {
          z: 4,
          interpolation: '',
          u: 4
        },
        interpolationOptions: [{label: '内插', value: '内插'}, {label: '外插', value: '外插'}],
        chartMetaData: {xAxis: {}, yAxis: {}, series: []}
      }
    },
    methods: {
      onNextClick () {
        this.loading = true
        this.step = this.step + 1
        this.loading = false
      },
      onPreClick () {
        this.loading = true
        this.step = this.step - 1
        if (this.step < 0) {
          this.step = 0
        }
        this.loading = false
      }
    }
  }
</script>

<style scoped>

</style>
