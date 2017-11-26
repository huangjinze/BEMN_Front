<template>
<BasePage>
  <div slot="header">header</div>
  <div slot="aside"><navi></navi></div>
  <div slot="main"><dataManager></dataManager></div>
</BasePage>
</template>

<script>
  import navi from '../components/layout/navi'
  import BasePage from '../components/BasePage'
  import dataManager from '../components/dataManager'
  export default {
    components: {navi, BasePage, dataManager}
  }
</script>

<style scoped>

</style>
