
<template>
  <el-card class="box-card">
    <div class="body-card">
      <li v-for="item in indexElementsData">
        <span class="normal_item_css"  v-if="item.light === false"><i class="el-icon-star-on" > {{ item.name }} </i></span>
        <span class="highlight_item_css" v-if="item.light === true"><i class="el-icon-star-on" > {{ item.name }} </i></span>
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
        currentIndex: {},
        tasker: ''
      }
    },
    watch: {
      indexElements: {
        handler: function (val) {
          this.indexElementsData.length = 0
          for (let indexI in val) {
            this.indexElementsData.push({id: indexI, name: val[indexI], light: false})
          }
          this.chooseId = 0
          this.indexElementsData[this.chooseId].light = true
          this.ChooseIndex(this.chooseId)
          this.tasker = setInterval(() => {
            this.ChooseIndex(this.chooseId + 1)
          }, 10000)
          console.log(this.tasker)
        },
        deep: true
      }
    },
    mounted: function () {
      this.chooseId = 0
    },
    methods: {
      ChooseIndex: function (id) {
        console.log('itemer', id)
        if (this.indexElementsData.length === 0) {
          return
        }
        if (id === this.indexElementsData.length) {
          id = 0
        }
        this.indexElementsData[this.chooseId].light = false
        this.indexElementsData[id].light = true
        this.chooseId = id
        console.log('trigger', this.indexElements[id])
        this.$emit('input', this.indexElements[id])
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
  .normal_item_css{

  }
  .highlight_item_css{
    background: #82ccdd;
    opacity: 0.3
  }
</style>
