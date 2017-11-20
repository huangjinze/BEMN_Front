
<template>
  <BasePage>
    <div slot="header">header</div>
    <div slot="aside"><navi></navi></div>
    <div slot="main">
      <charts class="testchart" id="1" :targetOptions="targetOptions" :typeOptions="typeOptions"
              @ValueChange="ValueChange" :xAxis="chartMetaData.xAxis" :yAxis="chartMetaData.yAxis"
      :series="chartMetaData.series"></charts>
    </div>
  </BasePage>
</template>

<script>

import charts from '../components/echart/charts.vue'
import navi from '../components/layout/navi'
import BasePage from '../components/BasePage'

export default {
  components: {charts, navi, BasePage},
  name: 'StaiscticPage',
  data () {
    return {
      targetOptions: [
        {value: '1', label: '1'},
        {value: '2', label: '2'},
        {value: '3', label: '3'},
        {value: '4', label: '4'}],
      typeOptions: [
        {value: 'a', label: 'a'},
        {value: 'b', label: 'b'}],
      formValue: {},
      chartMetaData: {
        xAxis: {},
        yAxis: {},
        series: []
      }
    }
  },
  mounted: function () {
    Object.assign(this.chartMetaData, {xAxis: {data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]})
  },
  methods: {
    ValueChange (value) {
      this.$data.formValue = value
      console.log('on su')
      Object.assign(this.chartMetaData, {
        series: [{
          name: '销量',
          type: 'bar',
          data: [20, 2, 23, 5, 15, 24]
        }]})
    }
  }

}
</script>

<style scoped>

</style>
