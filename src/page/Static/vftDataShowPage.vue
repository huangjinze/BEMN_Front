<!-- 该模块为:点击导航栏的“数据展示”->“通量数据领域”->“数据展示”时，显示的页面内容，注意，与forestDominPage.vue共用一套子组件-->
<<template>
    <BasePage>
        <div slot="main">
          <topIndexSelect :initTopPartTags="stationName" :initTopSiteTags="className" ref="profile" :indices="index" :indexTags="indexTags" @ClickTower="parentStationListen" @ClickClass="parentClassListen" @ClickIndex="parentTabListen" @CloseStation="CloseStationListen" @CloseClass="CloseClassListen"></topIndexSelect>
          <dataManager v-if="index[0].flag == 4" :showSelect="showSelect" :navs="navs" :totalSize="totalSize" @changePage="changeDataByPage" v-on:selectValue="Svalue"></dataManager>
        </div>
    </BasePage>
</template>
<script>
import navi from '../../components/layout/navi'
import BasePage from '../../components/BasePage'
import topIndexSelect from '../../components/multiSelect/topIndexSelect'
import dataManager from '../../components/dataManager'
import {getStation, getClass, getIndexTableData, getTableCounts} from '../../model/vftData'
import {getVFTIndex} from '../../model/data'
import ElButton from '../../../node_modules/element-ui/packages/button/src/button.vue'
export default {
  components: {ElButton, navi, BasePage, topIndexSelect, dataManager},
  data () {
    return {
      stationName: [
        ''
      ],
      className: [
        ''
      ],
      stations: [],
      classes: [],
      index: [{ flag: 0 }],
      indexTags: [],
      allIndexTags: new Map(),
      navs: [],
      showSelect: true,
      currentTab: [],
      totalSize: 0,
      Type: 'level1'
    }
  },
  mounted: function () {
    getStation({domain: '通量数据'}).then(resp => {
      if (resp.data.status === 'fail') {
        this.$alert('抱歉，您暂时没有管理的站点！', {confirmButtonText: 'ok'})
        // this.stationName = ['']
        // this.className = ['']
      } else {
        let data = resp.data.data
        this.index.splice(0, this.index.length)
        this.index.push({ text: '选择站点', flag: 1 })
        for (var i = 0; i < data.length; i++) {
          this.indexTags.push({ text: data[i], id: i + 1 })
        }
        this.stations = Array.from(this.indexTags)
      }
    }).catch(resp => {
      this.$alert('获取失败', '失败', {confirmButtonText: 'ok'})
    })
  },
  methods: {
    parentStationListen (id) {
      let temp = this.stations.find(function (value, index, stations) { return value.id === id })
      getClass({domain: '通量数据', station: temp.text}).then(resp => {
        console.log(resp)
        let data = resp.data.data
        this.index.splice(0, this.index.length)
        this.index.push({ text: '选择类型', flag: 2 })
        this.indexTags.splice(0, this.indexTags.length)
        for (var i = 0; i < data.length; i++) {
          this.indexTags.push({ text: data[i], id: i + 1 })
        }
        this.stationName[0] = temp.text
        this.classes = Array.from(this.indexTags)
      }).catch(resp => {
        this.$alert('获取失败', '失败', {confirmButtonText: 'ok'})
      })
    },
    parentClassListen (id) {
      let temp = this.indexTags.find(function (value, index, classes) { return value.id === id })
      getTableCounts({station_name: this.stationName[0], class_name: temp.text, domain: '通量数据'}).then(resp => {
        this.totalSize = Number(resp.data.data)
      }).catch(resp => {
        this.$alert('数据获取失败', '失败', {confirmButtonText: 'ok'})
      })
      getVFTIndex({station: this.stationName[0], classification: temp.text, domain: '通量数据'}).then(resp => {
        let data = resp.data.data
        let i = 0
        this.index.splice(0, this.index.length)
        this.navs.splice(0, this.navs.length)
        this.allIndexTags.clear()
        for (let k of data) {
          this.index.push({text: k['category'], id: i + 1, flag: 4})
          this.navs.push({label: k['category'], mcols: [], tableData: []})
          i++
          this.allIndexTags.set(k['category'], k['index'])
        }
        this.$refs.profile.flag = 4
        this.indexTags.splice(0, this.indexTags.length)
        this.className[0] = temp.text
        this.currentTab[0] = this.index[0].text
        this.getTableData(1)
      }).catch(resp => {
        this.$alert('数据获取失败', '失败', {confirmButtonText: 'ok'})
      })
    },
    parentTabListen () {
    },
    CloseStationListen () {
      this.index.splice(0, this.index.length)
      this.index.push({ text: '选择站点', flag: 1 })
      this.indexTags = Array.from(this.stations)
    },
    CloseClassListen () {
      this.index.splice(0, this.index.length)
      this.index.push({ text: '选择类型', flag: 2 })
      this.indexTags = Array.from(this.classes)
    },
    changeDataByPage (page) {
      this.currentTab[0] = this.index[page[1]].text
      this.getTableData(page[0])
    },
    getTableData (page) {
      getIndexTableData({station: this.stationName[0], classification: this.className[0], domain: '通量数据', category: this.currentTab[0], page: page, dataType: this.Type}).then(resp => {
        var data = resp.data.data
        var category = this.currentTab[0]
        var cols = []
        for (var h = 0; h < data.title.length; h++) {
          let title = data.title[h]
          cols.push({prop: title.factor_name, label: title.factor_name})
        }
        var obj = this.navs.find(function (value, index, classes) { return value.label === category })
        this.$set(obj, 'mcols', cols)
        this.$set(obj, 'tableData', data.data)
//        this.Type = 'level1'
      }).catch(resp => {
        this.$alert('暂无此类别', {confirmButtonText: 'ok'})
//        this.Type = 'level1'
      })
    },
    Svalue: function (data) {
      console.log(data)
      this.Type = data
//      this.changeDataByPage(0)
      this.getTableData(1)
    }
  }
}
</script>
<style scoped>

</style>
