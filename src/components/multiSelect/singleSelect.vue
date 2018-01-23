<template>
    <topIndexSelect :initTopPartTags="stationName" :initTopSiteTags="className" ref="profile" :indices="index" :indexTags="indexTags" @ClickIndexClass="parentIndexClassListen" @ClickTower="parentStationListen" @ClickClass="parentClassListen" @ClickIndex="parentIndexListen" @CloseStation="CloseStationListen" @CloseClass="CloseClassListen"></topIndexSelect>
</template>
<script>
import topIndexSelect from './topIndexSelect'
import {getStation} from '../../model/vftData'
export default {
  components: {topIndexSelect},
  data () {
    return {
      stationName: [
        '奥林匹克'
      ],
      className: [],
      indexName: [],
      stations: [],
      classes: [],
      index: [],
      indexTags: []
    }
  },
  props: {
    station: {type: String, default: ''}
  },
  mounted: function () {
    getStation({domain: '通量数据'}).then(resp => {
      let data = resp.data.data
      this.index.splice(0, this.index.length)
      this.index.push({ text: '选择站点', flag: 1 })
      for (var i = 0; i < data.length; i++) {
        this.indexTags.push({ text: data[i], id: i + 1 })
      }
      this.stations = Array.from(this.indexTags)
    }).catch(resp => {
      this.$alert('获取失败', '失败', {confirmButtonText: 'ok'})
    })
  },
  methods: {
    parentStationListen (id) {
      var temp = this.stations.find(function (value) { return value.id === id })
      this.station = temp.text
      this.$refs.profile.flag = 4
    },
    parentClassListen (id) {},
    parentIndexClassListen (id) {},
    parentIndexListen (id) {},
    CloseStationListen () {
      this.index.splice(0, this.index.length)
      this.index.push({ text: '选择站点', flag: 1 })
      this.indexTags = Array.from(this.stations)
    },
    CloseClassListen () {}
  },
  name: 'singleSelect'
}
</script>
<style scoped>

</style>