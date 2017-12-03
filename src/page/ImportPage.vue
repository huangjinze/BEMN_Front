<!--数据导出页面，具体内容通过dataImport/dataImport.vue导入-->
<template>
  <BasePage>
    <div slot="header">header</div>
    <div slot="aside"><navi></navi></div>
    <div slot="main" align="center">
      <dataImport @Clicka="onClick"></dataImport>
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
      onClick (showdate1) {
        alert(showdate1)
      }
    }
  }
</script>

<style>

</style>
