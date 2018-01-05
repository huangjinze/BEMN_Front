<template>
  <div  v-loading="loading">
    <el-steps :active="step" finish-status="success" simple>
      <el-step title="1 范围检查"></el-step>
      <el-step title="2 去除峰值"></el-step>
      <el-step title="3 插补缺失"></el-step>
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
        <el-button type="primary" @click="onPreClick" :disabled="preDisable">pre</el-button>
        <el-button type="primary" @click="onNextClick" :disabled="nextDisable">next</el-button>
      </el-button-group>
    </div>
  </div>
</template>

<script>
  import rangeCheck from '../../components/datawashing/rangeCheck'
  import BasePage from '../../components/BasePage'
  import navi from '../../components/layout/navi'
  import washingForm from '../../components/datawashing/washingForm'

  export default {
    components: {
      rangeCheck,
      BasePage,
      navi,
      washingForm},
    name: 'Weather',
    data () {
      return {
        step: 0,
        preDisable: true,
        nextDisable: false,
        loading: false,
        form: {
          z: 4,
          interpolation: ' '
        },
        interpolationOptions: [{label: '内插', value: '内插'}, {label: '外插', value: '外插'}]
      }
    },
    methods: {
      onNextClick () {
        this.loading = true

        this.step = this.step + 1
        if (this.step >= 2) {
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
      }
    }
  }
</script>

<style scoped>

</style>
