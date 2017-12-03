<!--数据导出页面，具体内容通过dataImport/dataImport.vue导入-->
<template>
  <BasePage>
    <div slot="header">header</div>
    <div slot="aside"><navi></navi></div>
    <div slot="main" align="center">
      <dataImport @ClicktableData="onClickDataTable" @ClickvalueData="onClickMonthTable" @ClicktableMonth="onClickDataValue" @ClickvalueMonth="onClickMonthValue" @ClickYear="onClickyear"></dataImport>
    </div>
  </BasePage>
</template>


<script>
  import dataImport from '../components/dataImport/dataImport'
  import navi from '../components/layout/navi'
  import BasePage from '../components/BasePage'

  export default {
    components: {dataImport, navi, BasePage},
    name: 'StaiscticPage',
    data () {
      return {

      }
    },
    methods: {
      onClickDataTable (DataTable) {
        alert(DataTable)
      },
      onClickMonthTable (MonthTable) {
        alert(MonthTable)
      },
      onClickDataValue (DataValue) {
        alert(DataValue)
      },
      onClickMonthValue (MonthValue) {
        alert(MonthValue)
      },
      onClickyear (year) {
        alert(year)
      },
    }
  }
</script>

<style>

</style>
