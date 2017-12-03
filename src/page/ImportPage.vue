<!--数据导出页面，具体内容通过dataImport/dataImport.vue导入-->
<template>
  <BasePage>
    <div slot="header">header</div>
    <div slot="aside"><navi></navi></div>
    <div slot="main" align="center">
      <dataImport @Clicka="onClicka" @Clickb="onClickb" @Clickc="onClickc" @Clickd="onClickd" @Clicke="onClicke"></dataImport>
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
      onClicka (ShowDataT1) {
        alert(ShowDataT1)
      },
      onClickb (ShowDataT2) {
        alert(ShowDataT2)
      },
      onClickc (ShowDataV1) {
        alert(ShowDataV1)
      },
      onClickd (ShowDataV2) {
        alert(ShowDataV2)
      },
      onClicke (year) {
        alert(year)
      },
    }
  }
</script>

<style>

</style>
