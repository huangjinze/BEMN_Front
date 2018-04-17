<template>
  <BasePage>
    <div slot="main" >
      <div class="top " v-loading="loading">
        <washingForm v-model="form"
                     @StationChange="getIndexes"></washingForm>
      </div>


      <div class="content-form" >

        <el-col :span="24"  v-if="form.classification === 'co2'">
          <CarbonInflux :washing_form="form" :indexes="indexes">
          </CarbonInflux>
        </el-col>

        <div  v-if="form.classification === 'water'">
        <Water :washing_form="form" :indexes="indexes">
        </Water>
        </div>

        <div  v-if="form.classification === 'weather'">
          <Weather :washing_form="form" :indexes="indexes"></Weather>
        </div>

        <div  v-if="form.classification === 'energy'">
          <Energy :washing_form="form" :indexes="indexes"></Energy>
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
        indexes: [],
        loading: false
      }
    },
    watch: {
      form: {
        handler: function (val) {
          this.loading = true
          this.getIndexes()
        },
        deep: true
      }
    },
    mounted () {
      this.getIndexes()
    },
    methods: {
      getIndexes () {
        this.loading = true
        this.indexes.length = 0
        return getWashingIndexAndRange(
          {
            domain: '通量数据',
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
