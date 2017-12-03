<template>
  <BasePage>
    <div slot="header">header</div>
    <div slot="aside">
      <navi></navi>
    </div>
    <div slot="main">
      <dataManager :navs="navs" @Click="dataExport">
      </dataManager>
    </div>
  </BasePage>
</template>

<script>
  import navi from '../components/layout/navi'
  import BasePage from '../components/BasePage'
  import dataManager from '../components/dataManager'
  export default {
    components: {
      navi,
      BasePage,
      dataManager
    },
    methods: {
      dataExport: function () {
        console.log('Button Click')
      }
    },
    data () {
      return {
        navs: [{
          label: '森林群落结构',
          mcols: [{
            prop: 'age',
            label: '森林群落的年龄（a）'
          }, {
            prop: 'origin',
            label: '森林群落的起源'
          }, {
            prop: 'ave_height',
            label: '森林群落的平均树高（m）'
          }, {
            prop: 'ave_DBH',
            label: '森林群落的胸径（cm）'
          }, {
            prop: 'ave_density',
            label: '森林群落的密度（株／hm2）'
          }, {
            prop: 'Acomposition',
            label: '森林群落的树种组成'
          }, {
            prop: 'breed',
            label: '森林群落的动植物种类'
          }, {
            prop: 'propagation',
            label: '森林群落的动植物数量'
          }, {
            prop: 'coverage',
            label: '森林群落的郁闭度'
          }, {
            prop: 'area',
            label: '森林群落主林层的叶面积指数'
          }, {
            prop: 'qm_height',
            label: '林下植被（亚乔木）平均高度(m)'
          }, {
            prop: 'gm_height',
            label: '林下植被（灌木）平均高度(m)'
          }, {
            prop: 'cb_height',
            label: '林下植被（草本）平均高度(m)'
          }, {
            prop: 'cover',
            label: '林下植被总盖度（%）'
          }, {
            prop: 'date',
            label: '调查时间'
          }],
          tableData: [{
            age: '9614', // 年龄
            origin: '1937', // 起源
            ave_height: '22.3', // 平均树高（m）
            ave_DBH: '77.3', // 胸径（cm）
            ave_density: '37830.1', // 密度（株／hm2）
            Acomposition: '红松林', // 树种组成
            breed: '8909', // 动植物种类
            propagation: '126936', // 动植物数量
            coverage: '0.4', // 郁闭度
            area: '0.96', // 主林层的叶面积指数
            qm_height: '1.4', // 林下植被（亚乔木）平均高度
            gm_height: '0.5', // 灌木
            cb_height: '0.1', // 草本
            cover: '85.1', // 总盖度（%）
            date: '2014-02-04' // 调查时间
          }, {
            age: '9614',
            origin: '1937',
            ave_height: '22.3',
            ave_DBH: '77.3',
            ave_density: '37830.1',
            Acomposition: '红松林',
            breed: '8909',
            propagation: '126936',
            coverage: '0.4',
            area: '0.96',
            qm_height: '1.4',
            gm_height: '0.5',
            cb_height: '0.1',
            cover: '85.1',
            date: '2014-02-04'
          }, {
            age: '9614',
            origin: '1937',
            ave_height: '22.3',
            ave_DBH: '77.3',
            ave_density: '37830.1',
            Acomposition: '红松林',
            breed: '8909',
            propagation: '126936',
            coverage: '0.4',
            area: '0.96',
            qm_height: '1.4',
            gm_height: '0.5',
            cb_height: '0.1',
            cover: '85.1',
            date: '2014-02-04'
          }, {
            age: '9614',
            origin: '1937',
            ave_height: '22.3',
            ave_DBH: '77.3',
            ave_density: '37830.1',
            Acomposition: '红松林',
            breed: '8909',
            propagation: '126936',
            coverage: '0.4',
            area: '0.96',
            qm_height: '1.4',
            gm_height: '0.5',
            cb_height: '0.1',
            cover: '85.1',
            date: '2014-02-04'
          }, {
            age: '9614',
            origin: '1937',
            ave_height: '22.3',
            ave_DBH: '77.3',
            ave_density: '37830.1',
            Acomposition: '红松林',
            breed: '8909',
            propagation: '126936',
            coverage: '0.4',
            area: '0.96',
            qm_height: '1.4',
            gm_height: '0.5',
            cb_height: '0.1',
            cover: '85.1',
            date: '2014-02-04'
          }]
        }, {
          label: '森林群落乔木层生物量和林木生长量及养分'
        }, {
          label: '森林凋落物量'
        }, {
          label: '群落的天然更新'
        }]
      }
    }
  }
</script>

<style scoped>


</style>
