/*

*/
<template>
  <div>
    <div :id="id" class="chart_container">
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'

  export default {
    components: {
    },
    name: 'charts',
    props: {
      xAxis: {type: Object, default: []},     // echart xAxis 对象
      yAxis: {type: Object, default: []},     // echart yAxis 对象
      series: {type: Array, default: []},
      id: String},
    mounted: function () {
      console.log(echarts)
      this.myChart = echarts.init(document.getElementById(this.id))
      this.initData()
      window.addEventListener('resize', this.windowResize)
    },
    data () {
      return {
        chartMeta: {
          tittle: {}
        },
        myChart: {}
      }
    },
    watch: {
      xAxis: function (value) {
        console.log('xAxis Change', value)
        this.updateData()
      },
      yAxis: function () {
        console.log('yAxis Change')
        this.updateData()
      },
      series: function (value) {
        console.log('series Change', value)
        this.updateData()
      }
    },
    methods: {
      initData () {
        /* 此方法用来初始化echart */
//        const colors = ['#d14a61', '#5793f3', '#675bba', '#13CE66']
        const option = {
          title: {
            text: 'ECharts 入门示例'
          },
          tooltip: {},
          legend: {
          },
          xAxis: {
          },
          yAxis: {},
          series: []
        }
        this.myChart.setOption(option)
      },
      updateData () {
        /* 检测到props变化调用此方法 */
        const option = {
          xAxis: this.$props.xAxis,
          yAxis: this.$props.yAxis,
          series: this.$props.series
        }
        console.log('updata', option)
        this.myChart.setOption(option, true)
        console.log('updata finsh', this.myChart)
      },
      windowResize () {
        this.myChart.resize()
      }
    }
  }
</script>
<style scoped>
  .chart_container {
    height: 500px;
  }
</style>

