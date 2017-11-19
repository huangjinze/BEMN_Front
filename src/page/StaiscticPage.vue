
<template>
  <BasePage>
    <div slot="header">header</div>
    <div slot="aside"><navi></navi></div>
    <div slot="main">
      <charts class="testchart" id="1" :targetOptions="targetOptions" :typeOptions="typeOptions" @ValueChange="ValueChange"></charts>
    </div>
  </BasePage>
</template>


<<script>

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
      formValue: {}
    }
  },
  methods: {
    ValueChange (value) {
      this.$data.formValue = value
      console.log('on su')
    }
  }

}
</script>

<style scoped>

</style>
