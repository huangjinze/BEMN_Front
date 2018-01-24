
<template>
  <BasePage>
    <div slot="header">header</div>
    <div slot="aside"><navi></navi></div>
    <div slot="main">
      <el-row :span="24">
        <singleSelect v-model="formValue.station"></singleSelect>
      </el-row>
      <el-row :span="24">
      <chartForm
        :targetOptions="targetOptions"
        v-model="formValue"
        @Click="onClick"
        v-loading="loading"></chartForm>
      <charts class="testchart" id="1"  :chartMeta="chartMetaData"></charts>
      </el-row>
    </div>
  </BasePage>
</template>

<script>

import charts from '../../components/echart/charts.vue'
import navi from '../../components/layout/navi'
import BasePage from '../../components/BasePage'
import chartForm from '../../components/echart/vtfChartForm'
import {getVTFData, getVFTIndex} from '../../model/data'
import singleSelect from '../../components/multiSelect/singleSelect'

export default {
  components: {charts, navi, BasePage, chartForm, singleSelect},
  name: 'vtfStaiscticPage',
  data () {
    return {
      loading: false,
      targetOptions: [],
      formValue: {
        station: '奥林匹克',
        index: [],
        selectedType: 'a',
        model: 'mean',
        time_interval: 'day',
        start_time: '',
        end_time: ''
      },
      chartMetaData: {
        title: {
          text: '通量数据'
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
      },
      chart_value2kind: {
        a: 'scatter',
        b: 'scatter',
        c: 'bar',
        d: 'boxplot',
        e: 'scatter'
      }
    }
  },
  mounted: function () {
    getVFTIndex({station: '盐池_1', classification: '气象', domain: '通量数据'}).then(resp => {
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
      let data = {xAxis: {data: []}, series: [{name: 'co2_flux', type: 'bar', data: []}]}
      getVTFData({'index': this.formValue.index[1],
        domain: '通量数据',
        station: this.formValue.station,
        classification: '气象',
        start_time: this.formValue.start_time,
        end_time: this.formValue.end_time,
        time_interval: this.formValue.time_interval,
        model: this.formValue.model}).then(resp => {
          console.log('net', resp)
          console.log(data)
          if (resp.data.status !== 'success') {
            this.$alert(resp.data.reason, '失败', {confirmButtonText: 'ok'})
            return
          }
          let series = resp.data.data[0]
          for (let k in series) {
            data.xAxis.data.push(k)
            data.series[0].data.push(series[k])
            data.series[0].type = this.chart_value2kind[this.formValue.selectedType]
          }
          console.log('net finish', resp.data.data)
          this.chartMetaData = Object.assign(this.chartMetaData, data)
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
