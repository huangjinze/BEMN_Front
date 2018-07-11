<!--数据导出页面，具体内容通过dataImport/dataImport.vue导入-->
<template>
  <BasePage>
    <div slot="main">
      <!--<headGuider :initTopPartTags="stationName" :initTopSiteTags="className" ref="profile" :partTags="stations" :siteTags="classes" @ClickPart="parentStationListen" @ClickSite="parentClassListen" @CloseIndex="closeIndexListen"></headGuider>-->
      <!--<indexSelect :indices="index" :indexTags="indexTags" @ClickIndexClass="parentIndexClassListen" @ClickIndex="parentIndexListen"></indexSelect>-->
      <topIndexSelect :initTopPartTags="stationName" :initTopSiteTags="className" ref="profile" :indices="index" :indexTags="indexTags" @ClickIndexClass="parentIndexClassListen" @ClickTower="parentStationListen" @ClickClass="parentClassListen" @ClickIndex="parentIndexListen" @CloseStation="CloseStationListen" @CloseClass="CloseClassListen"></topIndexSelect>
      <dataImport :stationList="stations" :classList="dataImport_classList" @twoSelect="twoSelect" @selectStation="select_station"  @ClicktableData="onClickDataTable" @ClicktableMonth="onClickMonthTable" @ClickvalueData="onClickDataValue" @ClickvalueMonth="onClickMonthValue" :upLoadUrl="upLoadUrl" ></dataImport>
      <el-card class="box-card" shadow="hover" style="width:20%;position: absolute;top: 37%;right: 1%">
        <div slot="header" class="clearfix">
          <span>批量导入导出——指标列表</span>

        </div>
        <div  class="text item" style="width: 100%">
          <el-tag closable
                  v-for="tag in factorTags"
                  :key="tag.text"
                  :type="tag.type"
                  @close="handleFactorTagClose(tag)"
          style="margin: 5px">{{tag.text}}</el-tag>
        </div>
      </el-card>
    </div>
  </BasePage>
</template>



<script>
  import dataImport from '../components/dataImport/dataImport'
//  import indexSelect from '../components/dataImport/indexSelect'
  import topIndexSelect from '../components/multiSelect/topIndexSelect'
  import navi from '../components/layout/navi'
//  import headGuider from '../components/headGuider'
  import BasePage from '../components/BasePage'
  import moment from 'moment'
  import {getStation, getClass, submitTwoSelect, showExport, downloadUrl, compareStatistics, compareExport, showStatistics} from '../model/vftData'
  import {getVFTIndex} from '../model/data'
//  import { host } from '../model/data'
  export default {
    components: {dataImport, navi, BasePage, topIndexSelect},
    name: 'StaiscticPage',
    data () {
      return {
        upLoadUrl: 'url',
        stationName: [
          ''
        ],
        className: [
          ''
        ],
        indexName: [],
        stations: [],
        classes: [],
        index: [],
        allIndexTags: new Map(),
        indexTags: [],
        dataImport_classList: [],
        factorTags: []
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
          //  console.log(resp)
          let data = resp.data.data
          console.log(resp.data)
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
        getVFTIndex({station: this.stationName[0], classification: temp.text, domain: '通量数据'}).then(resp => {
          let data = resp.data.data
          console.log('f', data)
          let i = 0
          this.index.splice(0, this.index.length)
          this.allIndexTags.clear()
          for (let k of data) {
            this.index.push({text: k['category'], id: i + 1, flag: 3})
            i++
            this.allIndexTags.set(k['category'], k['index'])
          }
          this.indexTags.splice(0, this.indexTags.length)
          var tagsArray = this.allIndexTags.get(this.index[0].text)
          for (var j = 0; j < tagsArray.length; j++) {
            this.indexTags.push({ text: tagsArray[j], id: j + 1 })
          }
          console.log(this.indexTags)
          this.className[0] = temp.text
        }).catch(resp => {
          this.$alert('指标获取失败', '失败', {confirmButtonText: 'ok'})
        })
      },
      parentIndexClassListen (id) {
        let text = this.index[id].text
        this.indexTags.splice(0, this.indexTags.length)
        for (var j = 0; j < this.allIndexTags.get(text).length; j++) {
          this.indexTags.push({ text: this.allIndexTags.get(text)[j], id: j + 1 })
        }
      },
      parentIndexListen (id) {
        let temp = this.indexTags.find(function (value, index, classes) { return value.id === id })
        this.indexName[0] = temp.text
        if (!this.factorTags.find(function (value, index, classes) { return value.text === temp.text })) {
          this.factorTags.push({ text: temp.text, type: 'success', class: this.className[0] })
        }
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
      onClickDataTable (DataTable) {
        console.log(DataTable)
        let topTag = this.$refs.profile.topIndexTags[0]
        if (DataTable[0] && DataTable[1] && topTag && DataTable[2]) {
          let startDate = moment(DataTable[0]).format('YYYY-MM-DD')
          let endDate = moment(DataTable[1]).format('YYYY-MM-DD')
          let dataType = DataTable[2]
          let domain = '通量数据'
          let stationName = this.stationName[0]
          let className = []
          var factorList = []
          for (var factor of this.factorTags) {
            factorList.push(factor['text'])
            className.push(factor['class'])
          }
          showExport({domain: domain,
            station_name: stationName,
            clickIndex: factorList,
            startTime: startDate,
            endTime: endDate,
            dataType: dataType,
            class_name: className}).then(resp => {
              if (resp.headers && (resp.headers['content-type'] === 'application/x-msdownload' || resp.headers['content-type'] === 'application/vnd.ms-excel')) {
                downloadUrl(resp.request.responseURL)
                return 0
              }
            })
        } else if (!topTag) {
          this.$message({
            message: '请先选择指标',
            type: 'warning'
          })
        } else {
          this.$message({
            message: '开始日与结束日不应为空',
            type: 'warning'
          })
        }
      },
      onClickMonthTable (MonthTable) {
        let topTag = this.$refs.profile.topIndexTags[0]
        if (MonthTable[0] && MonthTable[1] && topTag && MonthTable[2]) {
          let startDate = MonthTable[0]
          let endDate = MonthTable[1]
          let dataType = MonthTable[2]
          let domain = '通量数据'
          let stationName = this.stationName[0]
          let className = []
          var factorList = []
          for (var factor of this.factorTags) {
            factorList.push(factor['text'])
            className.push(factor['class'])
          }
          compareExport({domain: domain,
            station_name: stationName,
            clickIndex: factorList,
            startTime: startDate,
            endTime: endDate,
            dataType: dataType,
            class_name: className}).then(resp => {
              if (resp.headers && (resp.headers['content-type'] === 'application/x-msdownload' || resp.headers['content-type'] === 'application/vnd.ms-excel')) {
                downloadUrl(resp.request.responseURL)
                return 0
              }
            })
        } else if (!topTag) {
          this.$message({
            message: '请先选择指标',
            type: 'warning'
          })
        } else {
          this.$message({
            message: '开始月与结束月不应为空',
            type: 'warning'
          })
        }
      },
      onClickDataValue (DataValue) {
        let topTag = this.$refs.profile.topIndexTags[0]
        if (DataValue[0] && DataValue[1] && topTag && DataValue[2]) {
          let startDate = moment(DataValue[0]).format('YYYY-MM-DD')
          let endDate = moment(DataValue[1]).format('YYYY-MM-DD')
          let dataType = DataValue[2]
          let domain = '通量数据'
          let stationName = this.stationName[0]
          var factorList = []
          let className = []
          for (var factor of this.factorTags) {
            factorList.push(factor['text'])
            className.push(factor['class'])
          }
          showStatistics({domain: domain,
            station_name: stationName,
            clickIndex: factorList,
            startTime: startDate,
            endTime: endDate,
            dataType: dataType,
            class_name: className}).then(resp => {
              if (resp.headers && (resp.headers['content-type'] === 'application/x-msdownload' || resp.headers['content-type'] === 'application/vnd.ms-excel')) {
                downloadUrl(resp.request.responseURL)
                return 0
              }
            })
        } else if (!topTag) {
          this.$message({
            message: '请先选择指标',
            type: 'warning'
          })
        } else {
          this.$message({
            message: '开始日与结束日不应为空',
            type: 'warning'
          })
        }
      },
      onClickMonthValue (MonthValue) {
        let topTag = this.$refs.profile.topIndexTags[0]
        if (MonthValue[0] && MonthValue[1] && topTag && MonthValue[2]) {
          let startDate = MonthValue[0]
          let endDate = MonthValue[1]
          let dataType = MonthValue[2]
          let domain = '通量数据'
          let stationName = this.stationName[0]
          var factorList = []
          let className = []
          for (var factor of this.factorTags) {
            factorList.push(factor['text'])
            className.push(factor['class'])
          }
          compareStatistics({domain: domain,
            station_name: stationName,
            clickIndex: factorList,
            startTime: startDate,
            endTime: endDate,
            dataType: dataType,
            class_name: className}).then(resp => {
              if (resp.headers && (resp.headers['content-type'] === 'application/x-msdownload' || resp.headers['content-type'] === 'application/vnd.ms-excel')) {
                downloadUrl(resp.request.responseURL)
                return 0
              }
            })
        } else if (!topTag) {
          this.$message({
            message: '请先选择指标',
            type: 'warning'
          })
        } else {
          this.$message({
            message: '开始月与结束月不应为空',
            type: 'warning'
          })
        }
      },
      select_station (stationId) {
        let temp = this.stations.find(function (value, index, stations) { return value.id === stationId })
        getClass({domain: '通量数据', station: temp.text}).then(resp => {
          //  console.log(resp)
          let data = resp.data.data
          console.log(resp.data)
          this.dataImport_classList.splice(0, this.dataImport_classList.length)
          for (var i = 0; i < data.length; i++) {
            this.dataImport_classList.push({ text: data[i], id: i + 1 })
          }
        }).catch(resp => {
          this.$alert('获取失败', '失败', {confirmButtonText: 'ok'})
        })
      },
      twoSelect (uploadForm) {
        var i = uploadForm.get('station')
        var j = uploadForm.get('class')
        var stationName = this.stations.find(function (value) { return value.id === Number(i) })
        var className = this.dataImport_classList.find(function (value) { return value.id === Number(j) })
        submitTwoSelect({'station': stationName.text, 'class': className.text, 'domain': '通量数据', 'path': uploadForm.get('path')}).then(resp => {
          console.log(resp)
        }).catch(resp => {
          this.$alert('上传失败', '失败', {confirmButtonText: 'ok'})
        })
      },
      handleFactorTagClose (tag) {
        console.log(this.factorTags.indexOf(tag))
        this.factorTags.splice(this.factorTags.indexOf(tag), 1)
      }
    }
  }
</script>

<style>

</style>
