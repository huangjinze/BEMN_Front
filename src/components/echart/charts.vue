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
      chartMeta: {type: Object, default: {xAxis: {}, yAxis: {}, series: []}},
      id: String},
    mounted: function () {
      this.myChart = echarts.init(document.getElementById(this.id))
      this.initData()
      window.addEventListener('resize', this.windowResize)
    },
    data () {
      return {
      }
    },
    watch: {
      chartMeta: {
        handler: function (val) {
          console.log('echar mata change', val)
          this.updateData()
        },
        deep: true
      }
    },
    methods: {
      initData () {
        /* 此方法用来初始化echart */
//        const colors = ['#d14a61', '#5793f3', '#675bba', '#13CE66']
        const option = {
          title: {
            text: ''
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
        this.myChart.setOption(this.chartMeta, true)
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

