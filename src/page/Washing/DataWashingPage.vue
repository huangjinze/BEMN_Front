<template>
  <BasePage>
    <div slot="header">header</div>
    <div slot="aside"><navi></navi></div>
    <div slot="main" >
      <div class="top "><washingForm :form="form"></washingForm></div>


      <div class="content-form" >

        <el-col :span="24"  v-if="form.classification == 'co2'">
          <CarbonInflux>
          </CarbonInflux>
        </el-col>

        <div  v-if="form.classification == 'water'">
        <Water>
        </Water>
        </div>

        <div  v-if="form.classification == 'weather'">
          <Weather></Weather>
        </div>

        <div  v-if="form.classification == 'energy'">
          <Energy></Energy>
        </div>

      </div>


    </div>

  </BasePage>
</template>

<script>
  import rangeCheck from '../../components/datawashing/rangeCheck'
  import BasePage from '../../components/BasePage'
  import navi from '../../components/layout/navi'
  import washingForm from '../../components/datawashing/washingForm'
  import charts from '../../components/echart/charts'
  import CarbonInflux from './CarbonInflux'
  import Water from './Water'
  import Weather from './Weather'
  import Energy from './Energy'

  export default {
    components: {
      rangeCheck,
      BasePage,
      navi,
      washingForm,
      charts,
      CarbonInflux,
      Water,
      Weather,
      Energy},
    name: 'DataWashingPage',
    data () {
      return {
        form: {
          classification: 'co2',
          year: '',
          station: '',
          indexes: []
        }
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
