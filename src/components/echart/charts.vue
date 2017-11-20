/*

*/
<template>
  <div :class="className" :id="id">
    <div class="header">
      <p>
        <span>
          选择指标:
          <el-select v-model="headerForm.selectedTarget" placeholder="请选择">
            <el-option
              v-for="item in targetOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </span>
        <span>
          类型:
          <el-select v-model="headerForm.selectedType" placeholder="请选择">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </span>
        <span>
          开始日:
          <el-date-picker
            v-model="headerForm.startTime"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="startPickerOptions">
          </el-date-picker>
        </span>
        <span>
          结束日:
          <el-date-picker
            v-model="headerForm.endTime"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="endPickerOptions">
          </el-date-picker>
        </span>
        <el-button type="primary" icon="el-icon-edit" v-on:click="onClick">绘制</el-button>
      </p>
    </div>
    <div id="chart_container" >
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'

  export default {
    name: 'charts',
    props: {
      className: String,
      id: String,
      targetOptions: {type: Array, default: []}, // 目标选项
      typeOptions: {type: Array, default: []}, // 类型选项
      xAxis: {type: Object, default: []},     // echart xAxis 对象
      yAxis: {type: Object, default: []},     // echart yAxis 对象
      series: {type: Array, default: []}},   // echart series 列表
    mounted: function () {
      console.log(echarts)
      this.myChart = echarts.init(document.getElementById('chart_container'))
      this.initData()
    },
    data () {
      return {
        chartMeta: {
          tittle: {}
        },
        myChart: {},
        headerForm: {
          selectedTarget: ' ',
          selectedType: ' ',
          startTime: ' ',
          endTime: ' '
        },
        startPickerOptions: {
          disabledDate (time) {
            return time.getTime() > Date.now()
          }},
        endPickerOptions: {
          disabledDate (time) {
            return time.getTime() > Date.now()
          }
        }
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
      onClick (value) {
        console.log('echart Form:', this.$data.headerForm)
        this.$emit('ValueChange', this.$data.headerForm)
      }
    }
  }
</script>
<style scoped>
  #chart_container {
    height: 500px;
  }
</style>

