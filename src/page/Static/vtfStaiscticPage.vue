
<template>
  <BasePage>
    <div slot="header">header</div>
    <div slot="aside"><navi></navi></div>
    <div slot="main">
      <el-row :span="24">
        <singleSelect v-model="station"></singleSelect>
      </el-row>
      <el-row :span="24">
      <chartForm
        :targetOptions="targetOptions"
        v-model="formValue"
        @Click="onClick"
        v-loading="loading"></chartForm>
        <el-row v-for="(item, index) in chartMetaData" :key="'chart_key'+index">
          <el-col :span="18" :offset="3">
            <echart :options="item"></echart>
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

export default {
  components: {echart, navi, BasePage, chartForm, singleSelect},
  name: 'vtfStaiscticPage',
  data () {
    return {
      loading: false,
      targetOptions: [],
      station: '奥林匹克',
      formValue: {
        index: [],
        selectedType: 'a',
        model: 'mean',
        time_interval: 'day',
        start_time: '',
        end_time: ''
      },
      chartMetaData: [],
      chart_value2kind: {
        a: 'scatter',
        b: 'scatter',
        c: 'bar',
        d: 'boxplot',
        e: 'scatter'
      }
    }
  },
  watch: {
    station: function (newValue) {
      this.targetOptions.splice(0, this.targetOptions.length)
      console.log('station_change', newValue)
      getVFTIndex({station: this.station, classification: '气象', domain: '通量数据'}).then(resp => {
        console.log('get_vft_index', resp)
        let data = resp.data.data[0]
        for (let k in data) {
          let child = data[k].map(item => {
            return {'label': item, 'value': item}
          })
          console.log('get_vft_index_child', child)
          this.targetOptions.push({'label': k, 'value': k, 'children': child})
        }
        console.log('get_vft_index_finish', this.targetOptions)
      }).catch(resp => {
        this.$alert('网络差', '失败', {confirmButtonText: 'ok'})
      })
    }
  },
  mounted: function () {
    getVFTIndex({station: this.station, classification: '气象', domain: '通量数据'}).then(resp => {
      console.log('get_vft_index', resp)
      let data = resp.data.data[0]
      for (let k in data) {
        let child = data[k].map(item => {
          return {'label': item, 'value': item}
        })
        console.log('get_vft_index_child', child)
        this.targetOptions.push({'label': k, 'value': k, 'children': child})
      }
      console.log('get_vft_index_finish', this.targetOptions)
    }).catch(resp => {
      this.$alert('网络差', '失败', {confirmButtonText: 'ok'})
    })
  },
  methods: {
    onClick: function () {
      console.log('Button Click')
      this.loading = true
      getVTFData({'index': this.formValue.index[1],
        domain: '通量数据',
        station: this.station,
        classification: '气象',
        start_time: this.formValue.start_time,
        end_time: this.formValue.end_time,
        time_interval: this.formValue.time_interval,
        model: this.formValue.model}).then(resp => {
          this.chartMetaData.splice(0, this.chartMetaData.length)
          this.chartMetaData = resp.data.data.map((perIndex) => {
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
            meta.xAxis[0].data = perIndex.data.map((perData) => { return perData.x })
            meta.series.push({
              name: perIndex.index + '数据',
              type: this.chart_value2kind[this.selectedType],
              data: perIndex.data.map((dataItem) => { return dataItem.y })
            })
            meta.legend.data.push(perIndex.index + '数据')
            console.log('填充', meta.xAxis)
            return meta
          })
          this.loading = false
        }).catch(resp => {
          this.$alert('网络错误', '失败', {confirmButtonText: 'ok'}).then(aciton => {
            this.loading = false
            console.log(aciton)
          })
        })
    }
  }
}
</script>

<style scoped>

</style>
