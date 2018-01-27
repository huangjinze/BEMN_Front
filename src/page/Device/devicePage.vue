<!--设备管理表格页面-->
<template>
    <BasePage>
        <div slot="header">header</div>
        <div slot="aside"><navi></navi></div>
        <div slot="main">
            <topIndexSelect :initTopPartTags="stationName" :initTopSiteTags="className" ref="profile" :indices="index" :indexTags="indexTags" @ClickIndexClass="parentIndexClassListen" @ClickTower="parentStationListen" @ClickClass="parentClassListen" @ClickIndex="parentIndexListen" @CloseStation="CloseStationListen" @CloseClass="CloseClassListen"></topIndexSelect>
            <devDataTable :tableData="tableData" :tableName="tableName" :statusControl="faultyList" @errorDialog="errorDialog" @addInfoDialog="addInfoDialog" @addDevice="onAddDevice" @editClick="onEditClick"></devDataTable>
            <devDialog :faultyDeviceName="faultyDeviceName" :dialogErrorVisible="dialogErrorVisible" :dialogAddVisible="dialogAddVisible" :errorData="errorData" @selectErrorInfoByTime="onSelectErrorByTime" @dialogClose="onErrorInfoDialogClose"></devDialog>
            <deviceAdding :dialogAddingVisible="dialogAddVisible" @dialogClose="onAddingDialogClose"></deviceAdding>
          <editDevDialog :dialogEditingVisible="dialogEditVisible" :editInfo="editInfo" :tags="tagsArray" @dialogClose="onEditDialogClose"></editDevDialog>
        </div>
    </BasePage>
</template>
<script>
import navi from '../../components/layout/navi'
import BasePage from '../../components/BasePage'
import devDataTable from '../../components/device/devDataTable'
import editDevDialog from '../../components/device/editDevDialog'
import devDialog from '../../components/device/devDialog'
import topIndexSelect from '../../components/multiSelect/topIndexSelect'
import deviceAdding from './deviceAdding'
import {getStation, getDevice, getIndexByDevice, getDeviceErrorInfo, getDeviceErrorInfoByTime} from '../../model/vftData'
export default {
  components: {navi, BasePage, devDataTable, topIndexSelect, devDialog, deviceAdding, editDevDialog},
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
      dialogEditVisible: false,
      errorData: [],
      faultyDeviceName: '',
      faultyDeviceId: '',
      tableName: '设备信息表',
      factorsList: [],
      editInfo: {},
      tagsArray: []
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
      if (temp[2] === '异常') {
        this.faultyDeviceName = temp[1]
        this.faultyDeviceId = temp[0]
        getDeviceErrorInfo({device_id: temp[0]}).then(resp => {
          let data = resp.data.data
          this.errorData.splice(0, this.errorData.length)
          for(var item of data){
            this.errorData.push({deviceName: this.faultyDeviceName, status: item.status, alertType: item.alert_type, occurrence: item.occurrence, remarks: item.remarks})
          }
          this.dialogErrorVisible = true
        }).catch(resp => {
          this.$alert('获取失败', '失败', {confirmButtonText: 'ok'})
        })
      }
    },
    addInfoDialog () {
      this.dialogAddVisible = true
    },
    onSelectErrorByTime (time) {
      getDeviceErrorInfoByTime({device_id: this.faultyDeviceId, start_date: time[0], end_date: time[1]}).then(resp => {
        let data = resp.data.data
        this.errorData.splice(0, this.errorData.length)
        for(var item of data){
          this.errorData.push({deviceName: this.faultyDeviceName, status: item.status, alertType: item.alert_type, occurrence: item.occurrence, remarks: item.remarks})
        }
      }).catch(resp => {
        this.$alert('故障信息获取失败', '失败', {confirmButtonText: 'ok'})
      })
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
    onEditClick (dev_id) {
      var item = this.tableData.find(function (value) { return value.device_id === dev_id })
      this.editInfo['stationSelect'] = this.stationName
      this.editInfo['classSelect'] = item.className
      this.editInfo['devName'] = item.device
      this.editInfo['factorTags'] = {}
      this.editInfo['facturer'] = item.facturer
      this.editInfo['price'] = item.price
      this.editInfo['number'] = item.standard
      this.editInfo['telephone'] = item.telephone
      this.editInfo['place_introduction'] = item.placeIntroduction
      this.editInfo['introduction'] = item.remarks
      this.tagsArray = Array.from(item.factors)
      this.dialogEditVisible = true
      console.log(this.dialogEditVisible)
    },
    onEditDialogClose (val) {
      this.dialogEditVisible = val
    },
    getDevice (stationName, domainName) {
      getDevice({station: stationName, domain: domainName}).then(resp => {
        this.tableData =Array.from(resp.data.data)
      }).catch(resp => {
        this.$alert('获取失败', '失败', {confirmButtonText: 'ok'})
      })
    }
  }
}
</script>