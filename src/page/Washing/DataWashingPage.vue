<template>
  <BasePage>
    <div slot="aside"><navi></navi></div>
    <div slot="main" >
      <div class="top ">
        <washingForm v-model="form"
                     @StationChange="getIndexes"></washingForm>
      </div>


      <div class="content-form" >

        <el-col :span="24"  v-if="form.classification == 'co2'">
          <CarbonInflux :washing_form="form" :indexes="indexes">
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
  import {getWashingIndexAndRange} from '../../model/data.js'

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
        form: {},
        indexes: []
      }
    },
    mounted () {
      getWashingIndexAndRange(
        {
          domain: '水土保持',
          station: this.form.station,
          classification: '通量'}).then(resp => {
            this.loading = true
            resp.data.data.map(item => {
              let index = {
                name: item.name,
                max_default_value: isNaN(parseFloat(item.max_default_value)) ? 0 : parseFloat(item.max_default_value),
                min_default_value: isNaN(parseFloat(item.min_default_value)) ? 0 : parseFloat(item.min_default_value),
                isShow: true
              }
              console.log(index)
              this.indexes.push(index)
            })
            this.loading = false
          })
    },
    methods: {
      getIndexes () {
        getWashingIndexAndRange(
          {
            domain: '水土保持',
            station: this.form.station,
            classification: '通量'}).then(resp => {
              this.loading = true
              resp.data.data.map(item => {
                let index = {
                  name: item.name,
                  max_default_value: isNaN(parseFloat(item.max_default_value)) ? 0 : parseFloat(item.max_default_value),
                  min_default_value: isNaN(parseFloat(item.min_default_value)) ? 0 : parseFloat(item.min_default_value),
                  isShow: true
                }
                console.log(index)
                this.indexes.push(index)
              })
              this.loading = false
            })
      }
    }
  }
</script>

<style scoped>

</style>
