<template>
<div v-loading.fullscreen.lock="loading">
<div v-if="showChart">
  <el-row v-for="(item, index) in chartMetaList" :key="'chart_key'+index">
    <el-col :span="18" :offset="3">
      <echart :options="item"></echart>
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="1" :offset="10">
      <el-button type="primary">确认</el-button>
    </el-col>
    <el-col :span="1" :offset="1">
      <el-button type="danger">放弃</el-button>
    </el-col>
  </el-row>
</div>

  </div>
</template>

<script>
  import {gapfillRes} from '../../model/data'
  import echart from 'vue-echarts'

  export default {
    components: {echart},
    name: 'one-chart-page',
    data () {
      return {
        loading: false,
        showChart: true,
        chartMetaList: [
          {
            title: {
              text: '数据'
            },
            dataZoom: [
              {show: true, type: 'inside'}
            ],
            tooltip: {
              trigger: 'axis'
            },
            xAxis: {},
            yAxis: {},
            series: []
          }
        ],
        station: '',
        year: '',
        fill_table: '',
        gap_table: '',
        data: []
      }
    },
    mounted: function () {
      this.station = this.$route.query.station
      this.year = this.$route.query.year
      this.fill_table = this.$route.query.fill_table
      this.gap_table = this.$route.query.gap_table
      this.data = this.$route.query.data
      this.loading = true
      gapfillRes({
        station: this.station,
        year: this.year,
        fill_table: this.fill_table,
        gap_table: this.gap_table,
        data: this.data
      }).then((resp) => {
        this.chartMetaList = resp.data.data.map((perIndex) => {
          let meta = {
            title: {
              text: perIndex.index + '数据'
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            legend: {
              data: []
            },
            animation: false,
            dataZoom: [{
              type: 'inside'
            }, {
              type: 'slider'
            }],
            tooltip: {
              trigger: 'axis'
            },
            xAxis: [{
              boundaryGap: false
            }],
            yAxis: [{ type: 'value' }],
            series: []
          }
          meta.xAxis[0].data = perIndex.raw_data.map((perData) => { return perData.x })

          meta.series.push({
            name: '原始数据',
            symbolSize: 3,
            type: 'scatter',
            large: true,
            data: perIndex.raw_data.map((dataItem) => { return dataItem.y })
          })
          meta.legend.data.push('原始数据')

          meta.series.push({
            name: '清洗后数据',
            symbolSize: 3,
            large: true,
            type: 'scatter',
            data: perIndex.gap_data.map((dataItem) => { return dataItem.y })
          })
          meta.legend.data.push('清洗后数据')

          meta.series.push({
            name: '填充后数据',
            symbolSize: 3,
            large: true,
            type: 'scatter',
            data: perIndex.fill_data.map((dataItem) => { return dataItem.y })
          })
          meta.legend.data.push('填充后数据')
          console.log('填充', meta.xAxis)

          return meta
        })

        console.log('list :', this.chartMetaList)
        this.loading = false
      })
    },
    methods: {
      onConfirmClick: function () {

      },
      onCancleClick: function () {

      }
    }
  }
</script>

<style scoped>

</style>
