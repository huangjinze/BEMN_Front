<!--设备管理表格页面-->
<template>
    <BasePage>
        <div slot="header">header</div>
        <div slot="aside"><navi></navi></div>
        <div slot="main">
            <topIndexSelect :initTopPartTags="stationName" :initTopSiteTags="className" ref="profile" :indices="index" :indexTags="indexTags" @ClickIndexClass="parentIndexClassListen" @ClickTower="parentStationListen" @ClickClass="parentClassListen" @ClickIndex="parentIndexListen" @CloseStation="CloseStationListen" @CloseClass="CloseClassListen"></topIndexSelect>
            <devDataTable :tableData="tableData" :tableName="tableName" :statusControl="faultyList" @errorDialog="errorDialog" @addInfoDialog="addInfoDialog" @addDevice="onAddDevice"></devDataTable>
            <devDialog :faultyDeviceName="faultyDeviceName" :dialogErrorVisible="dialogErrorVisible" :dialogAddVisible="dialogAddVisible" :errorData="errorData" @selectErrorInfoByTime="onSelectErrorByTime" @dialogClose="onErrorInfoDialogClose"></devDialog>
            <deviceAdding :dialogAddingVisible="dialogAddVisible" @dialogClose="onAddingDialogClose"></deviceAdding>
        </div>
    </BasePage>
</template>
<script>
import navi from '../../components/layout/navi'
import BasePage from '../../components/BasePage'
import devDataTable from '../../components/device/devDataTable'
import devDialog from '../../components/device/devDialog'
import topIndexSelect from '../../components/multiSelect/topIndexSelect'
import deviceAdding from './deviceAdding'
import {getStation, getDevice, getIndexByDevice} from '../../model/vftData'
export default {
  components: {navi, BasePage, devDataTable, topIndexSelect, devDialog, deviceAdding},
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
      allIndexTags: new Map(),
      indexTags: [],
      tableData: [],
      faultyList: [{
        rowIndex: 0,
        errorMessage: {
          alertName: '信号强度',
          deviceClass: 'LI_7500',
          firstBreak: '2012-07-06-15:38:28',
          lastBreak: '2015-07-06-15:38:28',
          describe: 'ddddddddddddd'
        }
      },
      {
        rowIndex: 1,
        errorMessage: {
          alertName: '信号强度',
          deviceClass: 'LI_7500',
          firstBreak: '2012-07-06-15:38:28',
          lastBreak: '2015-07-06-15:38:28',
          describe: 'ddddddddddddd'
        }
      }],
      dialogErrorVisible: false,
      dialogAddVisible: false,
      errorData: [],
      faultyDeviceName: '',
      tableName: '设备信息表',
      factorsList: []
    }
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
    this.getDevice(this.stationName[0], '通量数据')
  },
  methods: {
    errorDialog (temp) {
      this.faultyDeviceName = temp[1]
      var deviceId = this.tableData.findIndex(function (value) { return value.class === temp[0] && value.dev === temp[1] })
      var obj = this.faultyList.find(function (value) { return value.rowIndex === deviceId })
      if (obj && temp[2] === '异常') {
        this.errorData.pop()
        this.errorData.push(obj.errorMessage)
        this.dialogErrorVisible = true
      }
    },
    addInfoDialog () {
      this.dialogAddVisible = true
    },
    onSelectErrorByTime (time) {
      console.log(time)
    },
    parentStationListen (id) {
      var temp = this.stations.find(function (value) { return value.id === id })
      this.getDevice(temp.text, '通量数据')
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
    CloseClassListen () {},
    onErrorInfoDialogClose (val) {
      this.dialogErrorVisible = val
    },
    onAddingDialogClose (val) {
      this.dialogAddVisible = val
    },
    onAddDevice () {
      this.dialogAddVisible = true
    },
    getDevice (stationName, domainName) {
      getDevice({station: stationName, domain: domainName}).then(resp => {
        let data = resp.data.data
        this.tableData.splice(0, this.tableData.length)
        for (let item of data) {
          this.tableData.push({class: item.className, dev: item.device, factors: item.factors, status: '正常'})
        //  this.getFactorsByDevice(this.stationName[0], item.className, '通量数据', item.device)
        }
      }).catch(resp => {
        this.$alert('获取失败', '失败', {confirmButtonText: 'ok'})
      })
    },
    getFactorsByDevice (stationName, className, domainName, deviceName) {
      getIndexByDevice({station: stationName, class: className, domain: domainName, device: deviceName}).then(resp => {
        this.factorsList = Array.from(resp.data.data)
      }).catch(resp => {
        this.$alert('获取失败', '失败', {confirmButtonText: 'ok'})
      })
    }
  }
}
</script>