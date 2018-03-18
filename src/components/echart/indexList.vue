
<template>
  <el-card class="box-card">
    <div class="body-card">
      <li v-for="item in indexElements">
        <span :style="normal_css" v-if="item.light === true"><i class="el-icon-star-on" >{{ item.name }}</i></span>
        <span :style="highlight_css" v-else-if="item.light = false"><i class="el-icon-star-on" >{{ item.name }}</i></span>
      </li>
    </div>
  </el-card>
</template>

<script>
  import navi from '../layout/navi'
  import BasePage from '../BasePage'
  import chartForm from './vtfChartForm'
  import singleSelect from '../multiSelect/singleSelect'
  import chartGrid from './chartGrid'

  export default {
    components: {
      navi, BasePage, chartForm, singleSelect, chartGrid},
    name: 'indexList',
    props: {
      input: Object,
      indexElements: Array,
      value: Object
    },
    data () {
      return {
        indexElementsData: [],
        chooseId: 0,
        currentIndex_i: 0,
        currentIndex: {},
        highlight_css: {
          background: 'blue',
          opacity: 0.5
        },
        normal_css: {}
      }
    },
    mounted: function () {
      let index = 0
      this.indexElementsData = this.indexElements.map((item) => {
        return {id: index, name: item.name, light: false}
      })
      setTimeout(() => {
        this.ChooseIndex(this.chooseId + 1)
      }, 3000)
    },
    methods: {
      ChooseIndex: function (id) {
        if (id > this.indexElementsData.length) {
          this.chooseId = 0
        }
        this.indexElementsData[this.chooseId].light = false
        this.indexElementsData[id].light = true
        this.chooseId = id
        this.emit('input',this.indexElementsData[id])
      }
    }
  }
</script>

<style scoped>
  #print{
    text-align: center;
    margin-bottom: 20px;
    z-index: 999;
  }
  #chart{
    margin-top: 20px;
    z-index: -1;
  }
</style>
