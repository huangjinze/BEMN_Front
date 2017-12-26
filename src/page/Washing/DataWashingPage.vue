<template>
  <BasePage>
    <div slot="header">header</div>
    <div slot="aside"><navi></navi></div>
    <div slot="main" >
      <div class="top "><washingForm></washingForm></div>


      <div class="content-form" >
        <CarbonInflux>
        </CarbonInflux>
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

  export default {
    components: {
      rangeCheck,
      BasePage,
      navi,
      washingForm,
      charts,
      CarbonInflux},
    name: 'DataWashingPage',
    data () {
      return {

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
