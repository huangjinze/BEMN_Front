<template>
    <topIndexSelect :initTopPartTags="stationName" :initTopSiteTags="className" ref="profile" :indices="index" :indexTags="indexTags" @ClickIndexClass="parentIndexClassListen" @ClickTower="parentStationListen" @ClickClass="parentClassListen" @ClickIndex="parentIndexListen" @CloseStation="CloseStationListen" @CloseClass="CloseClassListen"></topIndexSelect>
</template>
<script>
import topIndexSelect from './topIndexSelect'
import {getStation} from '../../model/vftData'
export default {
  components: {topIndexSelect},
  props: {
    value: {type: String, default: ''}
  },
  data () {
    return {
      stationName: [
        ''
      ],
      className: [null],
      indexName: [],
      stations: [],
      classes: [],
      index: [],
      indexTags: []
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
      var temp = this.stations.find(function (value) { return value.id === id })
      this.$emit('input', temp.text)
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
