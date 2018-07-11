// 设备添加功能，数据处理模块
<template>
    <addDevDialog :stationList="stationList" :classList="classList" :dialogAddingVisible="dialogVisible" @selectStation="onSelectStation" @dialogClose="closeDialog" @devAddUpload="onDevAddUpload"></addDevDialog>
</template>
<script>
import addDevDialog from '../../components/device/addDevDialog'
import {getStation, getClass, addDeviceInfo} from '../../model/vftData'
export default {
  components: {addDevDialog},
  props: {
    dialogAddingVisible: {type: Boolean, default: false},
    dialogClose: {type: Function}
  },
  data () {
    return {
      dialogVisible: this.dialogAddingVisible,
      stationList: [],
      classList: []
    }
  },
  mounted: function () {
    getStation({domain: '通量数据'}).then(resp => {
      let data = resp.data.data
      for (var i = 0; i < data.length; i++) {
        this.stationList.push({ text: data[i], id: i + 1 })
      }
    }).catch(resp => {
      this.$alert('获取失败', '失败', {confirmButtonText: 'ok'})
    })
  },
  watch: {
    dialogAddingVisible (val) {
      this.dialogVisible = val
    },
    dialogVisible (val) {
      this.$emit('dialogClose', val)
    }
  },
  methods: {
    onSelectStation (id) {
      let temp = this.stationList.find(function (value) { return value.id === id })
      getClass({domain: '通量数据', station: temp.text}).then(resp => {
        let data = resp.data.data
        this.classList.splice(0, this.classList.length)
        for (var i = 0; i < data.length; i++) {
          this.classList.push({ text: data[i], id: i + 1 })
        }
      }).catch(resp => {
        this.$alert('获取失败', '失败', {confirmButtonText: 'ok'})
      })
    },
    closeDialog (val) {
      this.dialogVisible = val
    },
    onDevAddUpload (formData) {
      var i = this.stationList.findIndex(function (value) { return value.id === formData.stationSelect })
      var j = this.classList.findIndex(function (value) { return value.id === formData.classSelect })
      formData.stationSelect = this.stationList[i].text
      formData.classSelect = this.classList[j].text
      addDeviceInfo(formData).then(resp => {
        this.dialogVisible = false
        if (resp.data.status === 'success') {
          this.$message({
            message: '添加成功！',
            type: 'success'
          })
          this.$emit('onUploadAdding')
        }
      }).catch(resp => {
        this.$alert('添加失败', '失败', {confirmButtonText: 'ok'})
      })
    }
  },
  name: 'deviceAdding'
}
</script>
