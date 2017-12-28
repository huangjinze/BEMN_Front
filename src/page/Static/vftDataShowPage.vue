<!-- 该模块为:点击导航栏的“数据展示”->“水土保持领域”->“数据展示”时，显示的页面内容，注意，与forestDominPage.vue共用一套子组件-->
<<template>
    <BasePage>
        <div slot="header">header</div>
        <div slot="aside"><navi></navi></div>
        <div slot="main">
            <headGuider :initTopPartTags="stationName" :initTopSiteTags="className" :partTags="stations" :siteTags="classes" @ClickPart="parentStationListen" @ClickSite="parentClassListen"></headGuider>
            <indexChoice :indices="index" :col_name="colName" :tableData="tableData"></indexChoice>
        </div>
    </BasePage>
</template>
<script>
import navi from '../../components/layout/navi'
import BasePage from '../../components/BasePage'
import headGuider from '../../components/headGuider'
import indexChoice from '../../components/indexChoice'
import {getStation, getClass} from '../../model/vftData'
import {getVFTIndex} from '../../model/data'
export default {
  components: {navi, BasePage, headGuider, indexChoice},
  data () {
    return {
      stationName: [
        '奥林匹克'
      ],
      className: [
        '通量'
      ],
      stations: [],
      classes: [],
      index: [],
      colName: [
         {text: '样地编号', id: '1', prop: 'id'},
         {text: '森林枯落物厚度', id: '2', prop: 'thickness'},
         {text: '调查时间', id: '3', prop: 'searchTime'}
      ],
      tableData: [
         {id: 'LS-Y- 854', thickness: '2.77', searchTime: '2014-03-20'},
         {id: 'LS-Y- 855', thickness: '3.59', searchTime: '2014-03-20'},
         {id: 'LS-Y- 856', thickness: '2.77', searchTime: '2014-03-20'}
      ],
      activeNames: []
    }
  },
  mounted: function () {
    getStation().then(resp => {
      console.log(resp)
      let data = resp.data
      for (var i = 0; i < data.length; i++) {
        this.stations.push({ text: data[i], id: i + 1 })
      }
    })
  },
  methods: {
    parentStationListen (id) {
      let temp = this.stations.find(function (value, index, stations) { return value.id === id })
      getClass({station: temp.text}).then(resp => {
        console.log(resp)
        let data = resp.data
        for (var i = 0; i < data.length; i++) {
          this.classes.push({ text: data[i], id: i + 1 })
        }
      })
    },
    parentClassListen (stationName, id) {
      console.log(stationName)
      let temp = this.classes.find(function (value, index, classes) { return value.id === id })
      getVFTIndex({station: stationName, classification: temp.text, domain: '水土保持'}).then(resp => {
        console.log(resp)
        let data = resp.data.data[0]
        let i = 0
        for (let k in data) {
          this.index.push({ text: k, id: i + 1 })
          i++
        }
        console.log(data)
      }).catch(resp => {
        this.$alert('网络差', '失败', {confirmButtonText: 'ok'})
      })
    }
  }
}
</script>
<style scoped>

</style>
