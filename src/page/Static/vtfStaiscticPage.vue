
<template>
  <BasePage>
    <div slot="header">header</div>
    <div slot="aside"><navi></navi></div>
    <div slot="main" v-loading="loading">
      <el-row :span="24">
        <singleSelect v-model="station"></singleSelect>
      </el-row>
      <el-row :span="24">
      <chartForm
        :indexesOptions="indexesOptions"
        v-model="formValue"></chartForm>
        <el-button @click="onDrawClick" type="primary" icon="el-icon-edit">绘制</el-button>
        <el-row>
          <el-col :span="18" :offset="3">
            <echart :options="chartMeta"></echart>
          </el-col>
          <el-col  :offset="3">
              <chartGrid :tableData="gridData"></chartGrid>
          </el-col>
        </el-row>
      </el-row>
    </div>
  </BasePage>
</template>

<script>

import navi from '../../components/layout/navi'
import BasePage from '../../components/BasePage'
import chartForm from '../../components/echart/vtfChartForm'
import {getVTFData, getVFTIndex} from '../../model/data'
import singleSelect from '../../components/multiSelect/singleSelect'
import echart from 'vue-echarts'
import chartGrid from '../../components/echart/chartGrid'

export default {
  components: {
    echart, navi, BasePage, chartForm, singleSelect, chartGrid},
  name: 'vtfStaiscticPage',
  data () {
    return {
      loading: false,
      formValue: {
        index: '',
        type: '',
        startTime: '',
        endTime: '',
        timeInterval: '',
        intervalUnit: '',
        model: ''
      },
      station: '奥林匹克  ',
      chartMeta: {},
      indexesOptions: [],
      gridData: []
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
      this.loading = true
      getVTFData({
        domain: '通量数据',
        station: this.station,
        classification: '通量',
        index: this.formValue.index,
        start_time: this.formValue.startTime,
        end_time: this.formValue.endTime,
        num: this.formValue.timeInterval,
        time_interval: this.formValue.intervalUnit,
        model: this.formValue.model,
        draw_type: this.formValue.type
      }).then((resp) => {
        if (resp.data.status !== 'success') {
          alert(resp.data.reason)
          return
        }
        let data = resp.data.data

        let meta = {
          title: {
            text: data[0].name + '数据'
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
          dataZoom: [
            {show: true, type: 'inside'}
          ],
          tooltip: {
            trigger: 'axis'
          },
          xAxis: [{
            boundaryGap: false
          }],
          yAxis: [{ type: 'value' }],
          series: []
        }
        meta.xAxis[0].data = data[0].data.map((item) => {
          return item.x
        })
        console.log(data)
        meta.series = data.map((perData) => {
          console.log(perData.data)
          this.gridData.push(perData.stats_data)
          if (this.formValue.type === 'scatter') {
            return {
              name: perData.name,
              symbolSize: 3,
              large: true,
              type: 'scatter',
              data: perData.data.map((dataItem) => { return dataItem.y })
            }
          } else if (this.formValue.type === 'compare') {
            return {
              name: perData.year + perData.name,
              symbolSize: 3,
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

</style>
