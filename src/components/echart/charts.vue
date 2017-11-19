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
    props: ['className', 'id', 'targetOptions', 'typeOptions'],
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
        series: [],
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
    methods: {
      initData () {
//        const colors = ['#d14a61', '#5793f3', '#675bba', '#13CE66']
        const option = {
          title: {
            text: 'ECharts 入门示例'
          },
          tooltip: {},
          legend: {
            data: ['销量']
          },
          xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }]
        }
        console.log('Option:', option)
        this.myChart.setOption(option)
        console.log(this.myChart)
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

