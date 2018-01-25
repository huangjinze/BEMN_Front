<template>
  <BasePage>
    <div slot="header">header</div>
    <div slot="aside">
      <navi></navi>
    </div>
    <div slot="main">
      <dataManager :navs="navs" @Click="dataExport" @changePage="dataSource">
      </dataManager>
    </div>
  </BasePage>
</template>

<script>
  import {getDataManager} from '../model/data'
  import navi from '../components/layout/navi'
  import BasePage from '../components/BasePage'
  import dataManager from '../components/dataManager'
  export default {
    mounted () {
      this.dataSource()
    },
    components: {
      navi,
      BasePage,
      dataManager
    },
    methods: {
      dataExport (val) {
        console.log('dataExport Click')
      },
      dataSource () {
        getDataManager({station: '奥林匹克', classification: '通量', domain: '通量数据', category: 'A', page: 1}).then(resp => {
          console.log(resp)
        }).catch(resp => {
          this.$alert('网络差', '失败', {confirmButtonText: 'ok'})
        })
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
          label: '森林群落乔木层生物量和林木生长量及养分',
          mcols: [{
            prop: 'yearHeight',
            label: '树高年生长量（m）'
          },
          {
            prop: 'yearArround',
            label: '胸径年生长量（cm）'
          },
          {
            prop: 'qm_g_sw',
            label: '乔木层干的生物量（kg/hm2）'
          },
          {
            prop: 'qm_z_sw',
            label: '乔木层枝的生物量（kg/hm2）'
          },
          {
            prop: 'qm_y_sw',
            label: '乔木层叶的生物量（kg/hm2）'
          },
          {
            prop: 'qm_g_sw',
            label: '乔木层果的生物量（kg/hm2）'
          },
          {
            prop: 'qm_h_sw',
            label: '乔木层花的生物量（kg/hm2）'
          },
          {
            prop: 'qm_root_sw',
            label: '乔木层根的生物量（kg/hm2）'
          },
          {
            prop: 'qm_g_c',
            label: '乔木层干的碳密度（kg/hm2）'
          },
          {
            prop: 'qm_z_c',
            label: '乔木层枝的碳密度（kg/hm2）'
          },
          {
            prop: 'qm_y_c',
            label: '乔木层叶的碳密度（kg/hm2）'
          },
          {
            prop: 'qm_g_c',
            label: '乔木层果的碳密度（kg/hm2）'
          },
          {
            prop: 'qm_h_c',
            label: '乔木层花的碳密度（kg/hm2）'
          },
          {
            prop: 'qm_root_c',
            label: '乔木层根的碳密度（kg/hm2）'
          },
          {
            prop: 'qm_g_N',
            label: '乔木层干的含氮量（kg/hm2）'
          },
          {
            prop: 'qm_z_N',
            label: '乔木层枝的含氮量（kg/hm2）'
          },
          {
            prop: 'qm_y_N',
            label: '乔木层叶的含氮量（kg/hm2）'
          },
          {
            prop: 'qm_g_N',
            label: '乔木层果的含氮量（kg/hm2）'
          },
          {
            prop: 'qm_h_N',
            label: '乔木层花的含氮量（kg/hm2）'
          },
          {
            prop: 'qm_root_N',
            label: '乔木层根的含氮量（kg/hm2）'
          },
          {
            prop: 'qm_g_P',
            label: '乔木层干的含磷量（kg/hm2）'
          },
          {
            prop: 'qm_z_P',
            label: '乔木层枝的含磷量（kg/hm2）'
          },
          {
            prop: 'qm_y_P',
            label: '乔木层叶的含磷量（kg/hm2）'
          },
          {
            prop: 'qm_g_P',
            label: '乔木层果的含磷量（kg/hm2）'
          },
          {
            prop: 'qm_h_P',
            label: '乔木层花的含磷量（kg/hm2）'
          },
          {
            prop: 'qm_root_P',
            label: '乔木层根的含磷量（kg/hm2）'
          },
          {
            prop: 'qm_g_K',
            label: '乔木层干的含钾量（kg/hm2）'
          },
          {
            prop: 'qm_z_K',
            label: '乔木层枝的含钾量（kg/hm2）'
          },
          {
            prop: 'qm_y_K',
            label: '乔木层叶的含钾量（kg/hm2）'
          },
          {
            prop: 'qm_g_K',
            label: '乔木层果的含钾量（kg/hm2）'
          },
          {
            prop: 'qm_h_K',
            label: '乔木层花的含钾量（kg/hm2）'
          },
          {
            prop: 'qm_root_K',
            label: '乔木层根的含钾量（kg/hm2）'
          },
          {
            prop: 'gm_top_sw',
            label: '灌木层地上部分生物量（kg/hm2）'
          },
          {
            prop: 'gm_down_sw',
            label: '灌木层地下部分生物量（kg/hm2）'
          },
          {
            prop: 'cb_top_sw',
            label: '草本层地上部分生物量（kg/hm2）'
          },
          {
            prop: 'cb_down_sw',
            label: '草本层地下部分生物量（kg/hm2）'
          },
          {
            prop: 'gm_top_N',
            label: '灌木层地上部分含氮量（kg/hm2）'
          },
          {
            prop: 'gm_down_N',
            label: '灌木层地下部分含氮量（kg/hm2）'
          },
          {
            prop: 'cb_top_N',
            label: '草本层地上部分含氮量（kg/hm2）'
          },
          {
            prop: 'cb_down_N',
            label: '草本层地下部分含氮量（kg/hm2）'
          },
          {
            prop: 'gm_top_P',
            label: '灌木层地上部分含磷量（kg/hm2）'
          },
          {
            prop: 'gm_down_P',
            label: '灌木层地下部分含磷量（kg/hm2）'
          },
          {
            prop: 'cb_top_P',
            label: '草本层地上部分含磷量（kg/hm2）'
          },
          {
            prop: 'cb_down_P',
            label: '草本层地下部分含磷量（kg/hm2）'
          },
          {
            prop: 'gm_top_K',
            label: '灌木层地上部分含钾量（kg/hm2）'
          },
          {
            prop: 'gm_down_K',
            label: '灌木层地下部分含钾量（kg/hm2）'
          },
          {
            prop: 'cb_top_K',
            label: '草本层地上部分含钾量（kg/hm2）'
          },
          {
            prop: 'cb_down_K',
            label: '草本层地下部分含钾量（kg/hm2）'
          },
          {
            prop: 'seacherTime',
            label: '调查时间'
          }],
          tableData: [{
          }]
        }, {
          label: '森林凋落物量',
          mcols: [{
            prop: 'yearDrop',
            label: '林地当年凋落物量（kg/hm2）'
          },
          {
            prop: 'seacherTime',
            label: '调查时间'
          }],
          tableData: [{
          }]
        }, {
          label: '群落的天然更新',
          mcols: [{
            prop: 'update_shuzhong',
            label: '更新树种'
          },
          {
            prop: 'update_midu',
            label: '更新密度（株/hm2）'
          },
          {
            prop: 'update_num',
            label: '更新数量（株）'
          },
          {
            prop: 'update_height',
            label: '更新苗高（cm）'
          },
          {
            prop: 'seacherTime',
            label: '调查时间'
          }],
          tableData: [{
          }]
        }]
      }
    }
  }
</script>

<style scoped>


</style>
