
<template>
  <BasePage>
    <div slot="main" v-loading="loading">
      <el-row :span="24">
        <singleSelect v-model="station"></singleSelect>
      </el-row>
      <el-row :span="24">
        <chartForm
          :indexesOptions="indexesOptions"
          v-model="formValue"></chartForm>
        <el-col :span="24" id="print">
          <el-button @click="onDrawClick" type="primary" icon="el-icon-edit">绘制</el-button>
        </el-col>
        <el-row v-if="showChart" id="chart">
          <el-col :span="20" >
            <echart :options="chartMeta" style="width: 100%"></echart>
          </el-col>
          <!--<el-col >-->
            <!--<chartGrid :tableData="gridData"></chartGrid>-->
          <!--</el-col>-->
        </el-row>
      </el-row>
    </div>
  </BasePage>
</template>

<script>
  import navi from '../../components/layout/navi'
  import BasePage from '../../components/BasePage'
  import chartForm from '../../components/echart/vftShowChart'
  import {getShowStaticData, getVFTIndex} from '../../model/data'
  import singleSelect from '../../components/multiSelect/singleSelect'
  import echart from 'vue-echarts'
  import chartGrid from '../../components/echart/chartGrid'

  export default {
    components: {
      echart, navi, BasePage, chartForm, singleSelect, chartGrid},
    name: 'vtfShowStaiscticPage',
    data () {
      return {
        loading: false,
        formValue: {
          index: '',
          type: '',
          startTime: '',
          endTime: ''
        },
        station: '奥林匹克  ',
        chartMeta: {},
        indexesOptions: [],
        gridData: [],
        showChart: false
      }
    },
    watch: {
      station: {
        handler: function (val) {
          this.getIndexes()
        }
      }
    },
    mounted () {
      this.getIndexes()
    },
    methods: {
      clearAttr: function () {
        this.chartMeta = {}
        this.indexesOptions.length = 0
        this.gridData.length = 0
      },
      getIndexes: function () {
        this.loading = true
        getVFTIndex({
          domain: '通量数据',
          station: this.station,
          classification: '通量'
        }).then((resp) => {
          if (resp.data.status !== 'success') {
            alert('ail')
            return
          }
          let data = resp.data.data
          this.indexesOptions = data.map((item) => {
            return {
              value: item.category,
              label: item.category,
              children: item.index.map((perIndex) => {
                return {
                  value: perIndex,
                  label: perIndex
                }
              })
            }
          })
          this.loading = false
        }).catch((e) => {
          this.loading = false
          alert(e)
        })
      },
      onDrawClick: function () {
        this.clearAttr()
        this.loading = true
        getShowStaticData({
          domain: '通量数据',
          station: this.station,
          classification: '通量',
          index: this.formValue.index,
          start_time: this.formValue.startTime,
          end_time: this.formValue.endTime
        }).then((resp) => {
          if (resp.data.status !== 'success') {
            alert(resp.data.reason)
            this.loading = false
            return
          }
          let data = resp.data.data

          console.log('first', data)

          let meta = {
            title: {
              text: data[0].index + '数据'
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            legend: {
              data: [],
              show: true
            },
            toolbox: {
              show: true,
              feature: {
                saveAsImage: {}
              }
            },
            animation: false,
            dataZoom: [
              {show: true, type: 'inside'},
              {
                show: true,
                realtime: true,
                xAxisIndex: [0],
                type: 'slider'
              }
            ],
            tooltip: {
              trigger: 'axis'
            },
            xAxis: [{
              boundaryGap: false
            }],
            yAxis: [
              {
                type: 'value',
                splitArea: {
                  show: true
                }
              }],
            series: []
          }
          meta.xAxis[0].data = data[0].data.map((item) => {
            return item.x
          })
          console.log(data)
          meta.series = data.map((perData) => {
            this.gridData.push(perData.stats_data)
            if (this.formValue.type === 'scatter') {
              return {
                name: perData.name,
                symbolSize: 5,
                large: true,
                type: 'scatter',
                data: perData.data.map((dataItem) => { return dataItem.y })
              }
            } else if (this.formValue.type === 'compare') {
              console.log(perData.data)
              perData.stats_data.year = perData.year
              meta.legend.data.push(perData.year + perData.name)
              return {
                name: perData.year + perData.name,
                large: true,
                type: 'scatter',
                data: perData.data.map((dataItem) => { return dataItem.y })
              }
            } else if (this.formValue.type === 'line_sum') {
              return {
                name: perData.name,
                type: 'line',
                data: perData.sum_data.map((dataItem) => { return dataItem.y })
              }
            } else if (this.formValue.type === 'bar') {
              return {
                name: perData.name,
                type: this.formValue.type,
                barWidth: '60%',
                data: perData.data.map((dataItem) => { return dataItem.y })
              }
            } else if (this.formValue.type === 'boxplot') {
              return {
                name: perData.name,
                type: 'boxplot',
                data: perData.data.map((dataItem) => { return dataItem.y })
              }
            } else {
              return {
                name: perData.name,
                type: this.formValue.type,
                data: perData.data.map((dataItem) => { return dataItem.y })
              }
            }
          })

          this.chartMeta = meta
          this.loading = false
          this.showChart = true
        }).catch((e) => {
          this.loading = false
          alert(e)
          console.log(e)
        })
      }
    }
  }
</script>

<style scoped>
#print{
  text-align: center;
  margin-bottom: 20px;
  z-index: 999;
}
  #print .el-button{
    width: 180px;
  }
  #chart{
    text-align: center;
     margin-top: 20px;
   }
</style>
