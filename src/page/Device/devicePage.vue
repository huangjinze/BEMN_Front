<!--设备管理表格页面-->
<template>
    <BasePage>
        <div slot="main">
            <topIndexSelect :initTopPartTags="stationName" :initTopSiteTags="className" ref="profile" :indices="index" :indexTags="indexTags" @ClickIndexClass="parentIndexClassListen" @ClickTower="parentStationListen" @ClickClass="parentClassListen" @ClickIndex="parentIndexListen" @CloseStation="CloseStationListen" @CloseClass="CloseClassListen"></topIndexSelect>
            <devDataTable :totalSize="totalSize" :tableData="tableData" :tableName="tableName" :statusControl="faultyList" @errorDialog="errorDialog" @addInfoDialog="addInfoDialog" @addDevice="onAddDevice" @editClick="onEditClick" @deleteClick="onDeleteClick" @changePage="onChangePage"></devDataTable>
            <devDialog :faultyDeviceName="faultyDeviceName" :dialogErrorVisible="dialogErrorVisible" :dialogAddVisible="dialogAddVisible" :errorData="errorData" @selectErrorInfoByTime="onSelectErrorByTime" @dialogClose="onErrorInfoDialogClose"></devDialog>
            <deviceAdding :dialogAddingVisible="dialogAddVisible" @dialogClose="onAddingDialogClose" @onUploadAdding="onUploadAdding"></deviceAdding>
          <editDevDialog :dialogEditingVisible="dialogEditVisible" :editInfo="editInfo" :tags="tagsArray" :stationList="stations" :classList="selectClassList" :valueClass="valueClassList" @dialogClose="onEditDialogClose" @selectStation="onSelectStation" @devEditUpload="onDevEditUpload"></editDevDialog>
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
import {getStation, getDevice, getClass, getDeviceErrorInfo, getDeviceErrorInfoByTime, getIndexByDevice, updateDeviceInfo, getDeviceConts, deleteDevice} from '../../model/vftData'
export default {
  components: {navi, BasePage, devDataTable, topIndexSelect, devDialog, deviceAdding, editDevDialog},
  data () {
    return {
      stationName: [],
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
      tagsArray: [],
      selectClassList: [],
      valueClassList: [],
      totalSize: 0
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
    getDeviceConts({stationName: this.stationName[0], domain: '通量数据'}).then(resp => {
      if (resp.data.status === 'success') {
        this.totalSize = resp.data.data
      }
    }).catch(resp => {
      this.$alert('表格行数获取失败', '失败', {confirmButtonText: 'ok'})
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
          console.log('fff', data)
          this.errorData.splice(0, this.errorData.length)
          for (var item of data) {
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
        for (var item of data) {
          this.errorData.push({deviceName: this.faultyDeviceName, status: item.status, alertType: item.alert_type, occurrence: item.occurrence, remarks: item.remarks})
        }
      }).catch(resp => {
        this.$alert('故障信息获取失败', '失败', {confirmButtonText: 'ok'})
      })
    },
    parentStationListen (id) {
      var temp = this.stations.find(function (value) { return value.id === id })
      getDeviceConts({stationName: temp.text, domain: '通量数据'}).then(resp => {
        this.totalSize = resp.data.data
      }).catch(resp => {
        this.$alert('表格行数获取失败', '失败', {confirmButtonText: 'ok'})
      })
      this.getDevice(temp.text, '通量数据', 1)
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
    onEditClick (devId) {
      var currentStation = this.$refs.profile.topPartTags[0].text
      var tower = this.stations.find(function (value) { return value.text === currentStation })
      var item = this.tableData.find(function (value) { return value.device_id === devId })
      this.onSelectStation(tower.id)
      this.editInfo['device_id'] = devId
      this.editInfo['stationSelect'] = tower.id
      this.editInfo['classSelect'] = Array.from(item.className)
      this.valueClassList = Array.from(item.className)
      this.editInfo['devName'] = item.device
      this.editInfo['factorTags'] = {}
      this.getFactorsByDevice(devId)
      this.tagsArray.splice(0, this.tagsArray.length)
      for (let temp of item.factors) {
        console.log('g', item.factors)
        this.tagsArray.push(temp.factor_name)
      }
      this.editInfo['facturer'] = item.facturer
      this.editInfo['price'] = item.price
      this.editInfo['number'] = item.standard
      this.editInfo['telephone'] = item.telephone
      this.editInfo['place_introduction'] = item.placeIntroduction
      this.editInfo['introduction'] = item.remarks
      this.editInfo['currentTags'] = Array.from(this.tagsArray)
      this.dialogEditVisible = true
    },
    onEditDialogClose (val) {
      this.dialogEditVisible = val
    },
    onDevEditUpload (formData) {
      var i = this.stations.findIndex(function (value) { return value.id === formData.stationSelect })
      formData.stationName = this.stations[i].text
      console.log('ooo', formData.stationSelect)
      console.log('ooo', formData)
      updateDeviceInfo(formData).then(resp => {
        this.dialogEditVisible = false
        if (resp.data.status === 'success') {
          this.$message({
            message: '修改成功！',
            type: 'success'
          })
          var towerName = this.$refs.profile.topPartTags[0].text
          console.log(towerName)
        }
        this.getDevice(towerName, '通量数据', 1)
      }).catch(resp => {
        this.$alert('修改失败', '失败', {confirmButtonText: 'ok'})
      })
    },
    onSelectStation (id) {
      let temp = this.stations.find(function (value) { return value.id === id })
      getClass({domain: '通量数据', station: temp.text}).then(resp => {
        let data = resp.data.data
        this.selectClassList.splice(0, this.selectClassList.length)
        for (var i = 0; i < data.length; i++) {
          this.selectClassList.push({ text: data[i], id: i + 1 })
        }
      }).catch(resp => {
        this.$alert('获取失败', '失败', {confirmButtonText: 'ok'})
      })
    },
    onChangePage (page) {
      var currentStation = this.$refs.profile.topPartTags[0].text
      this.getDevice(currentStation, '通量数据', page)
    },
    getDevice (stationName, domainName, page) {
      console.log(stationName, domainName, page)
      getDevice({station: stationName, domain: domainName, page: page}).then(resp => {
        if (resp.data.status === 'success') {
          this.tableData = Array.from(resp.data.data)
        }
      }).catch(resp => {
        this.$alert('获取失败', '失败', {confirmButtonText: 'ok'})
      })
    },
    getFactorsByDevice (devId) {
      getIndexByDevice({device_id: devId}).then(resp => {
        var data = resp.data.data
        var obj = this.editInfo['factorTags']
        for (let item of data) {
          obj[item.factor_name] = item
        }
      }).catch(resp => {
        this.$alert('获取失败', '失败', {confirmButtonText: 'ok'})
      })
    },
    onUploadAdding () {
      var towerName = this.$refs.profile.topPartTags[0].text
      this.getDevice(towerName, '通量数据', 1)
    },
    onDeleteClick (devId) {
      this.$confirm('此操作将删除该设备记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        deleteDevice({devId: devId}).then(resp => {
          if (resp.data.status === 'success') {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            var towerName = this.$refs.profile.topPartTags[0].text
            this.getDevice(towerName, '通量数据', 1)
          }
        }).catch(resp => {
          this.$alert('删除失败', '失败', {confirmButtonText: 'ok'})
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
