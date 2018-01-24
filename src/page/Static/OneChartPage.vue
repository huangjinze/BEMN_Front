<template>
<div v-loading.fullscreen.lock="loading">

  <el-row>
    <el-col :span="18" :offset="3">
      <charts class="test" id="echart-1" :chartMeta="chartMetaData"></charts>
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
</template>

<script>
  import charts from '../../components/echart/charts'

  export default {
    components: {
      charts},
    name: 'one-chart-page',
    data () {
      return {
        table: '',
        loading: false,
        chartMetaData: {
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
      }
    },
    mounted: function () {
      this.table = this.$route.query.table
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
