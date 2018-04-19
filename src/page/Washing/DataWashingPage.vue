<template>
  <BasePage>
    <div slot="main" >
      <div class="top " v-loading="loading">
        <washingForm v-model="form" :stations="stations"
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
  import {getStation} from '../../model/vftData'

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
        loading: false,
        stations: []
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
      getStation({domain: '通量数据'}).then(resp => {
        if (resp.data.status === 'fail') {
          this.$alert('抱歉，您暂时没有管理的站点！', {confirmButtonText: 'ok'})
          this.form.station = '暂无'
          // this.stationName = ['']
          // this.className = ['']
        } else {
//          console.log(resp.data.data[0])
          for (let i = 0; i < resp.data.data.length; i++) {
            this.stations.push({
              'value': resp.data.data[i],
              'label': resp.data.data[i]
            })
          }
//          console.log(this.stations)
          this.form.station = resp.data.data[0]
          this.getIndexes()
        }
      }).catch(resp => {
        this.$alert('获取失败', '失败', {confirmButtonText: 'ok'})
      })
    },
    methods: {
      getIndexes () {
        this.loading = true
        this.indexes.splice(0, this.indexes.length)
        if (this.form.station !== '暂无') {
          return getWashingIndexAndRange(
            {
              domain: '通量数据',
              station: this.form.station,
              classification: '通量'}).then(resp => {
                this.loading = true
                this.indexes.splice(0, this.indexes.length)
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
        } else {
          this.indexes.push({name: '无'})
        }
      }
    }
  }
</script>

<style scoped>

</style>
