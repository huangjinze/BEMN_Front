<template>
  <div  v-loading="loading">
    <el-steps :active="step" finish-status="success" simple>
      <el-step title="1 范围检查"></el-step>
      <el-step title="2 去除峰值"></el-step>
      <el-step title="3 插补缺失"></el-step>
    </el-steps>

    <el-col v-show="step === 0">
      <el-col id="rangeCheck">
        <rangeCheck
          :indexes="indexes"
          v-model="form.range">
        </rangeCheck>
      </el-col>
    </el-col>

    <el-col v-show="step === 1"  id="zValue">
      z值：
      <el-input-number v-model="form.z">

      </el-input-number>
    </el-col>

    <el-col :span="24" v-show="step === 2" id="methodSelect">
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
  import {checkWashingIndexRange, despiking, Gapfill} from '../../model/data'
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
    name: 'Water',
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
          indexes: [],
          range: []
        },
        m_indexes: this.indexes,
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
            () => {
              this.loading = false
            })
        }

        if (this.step === 1) {
          despiking({
            'data': this.form.range,
            'domain': '水土保持',
            'year': this.washing_form.year,
            'station': this.washing_form.station,
            'user_mail': '1103232282@qq.com',
            'z': this.form.z,
            'type': '水'
          }).then((resp) => {
            this.loading = false
            if (resp.data.status === 'success') {
              console.log(resp)
              alert(resp.data.data)
            } else {
              alert(resp.data.reason)
            }
          }).catch(() => {
            this.loading = false
            alert('网络差')
          })
        }

        if (this.step === 2) {
          Gapfill({
            'domain': '水土保持',
            'year': this.washing_form.year,
            'station': this.washing_form.station,
            'user_mail': '1103232282@qq.com',
            'type': '水'
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
            'type': '水',
            'data': this.form.range,
            'domain': '水土保持',
            'year': this.washing_form.year,
            'station': this.washing_form.station,
            'user_mail': '1103232282@qq.com'
          }).then((resp) => {
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
  #zValue{
    margin-top: 30px;
    text-align: center;
  }
  #methodSelect{
    text-align: center;
    margin-top: 30px;
  }

</style>
