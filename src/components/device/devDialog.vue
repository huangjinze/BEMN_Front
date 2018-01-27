//  设备管理部分设备故障信息的对话模拟框
<template >
    <div :class="className" :id="id">
        <el-dialog :title="faultyDeviceName" :visible.sync="dialogVisible">
            <div class="block" style="margin-bottom: 20px">
                <el-date-picker
                        v-model="time"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>
                <el-button style="margin-left: 40px" type="primary"  @click="onSelectErrorByTime" plain>筛选</el-button>
            </div>
            <el-table :data="errorData">
                <el-table-column property="alertName" label="型号强度"></el-table-column>
                <el-table-column property="deviceClass" label="设备类型"></el-table-column>
                <el-table-column property="firstBreak" label="第一次故障时间" width="200"></el-table-column>
                <el-table-column property="lastBreak" label="第二次故障时间" width="200"></el-table-column>
                <el-table-column property="describe" label="描述"></el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>
<script>
  import moment from 'moment'
  export default {
    props: {
      className: String,
      id: String,
      dialogErrorVisible: {type: Boolean, default: false},
      errorData: {
        type: Array,
        required: true
      },
      faultyDeviceName: {type: String, default: ''},
      dialogClose: {type: Function},
      selectErrorInfoByTime: {type: Function}
    },
    data () {
      return {
        time: '',
        dialogVisible: this.dialogErrorVisible
      }
    },
    watch: {
      dialogErrorVisible (val) {
        this.dialogVisible = val
      },
      dialogVisible (val) {
        this.$emit('dialogClose', val)
      }
    },
    methods: {
      onSelectErrorByTime () {
        var startTime = moment(this.time[0]).format('YYYY-MM-DD')
        var endTime = moment(this.time[1]).format('YYYY-MM-DD')
        this.$emit('selectErrorInfoByTime', [startTime, endTime])
      }
    },
    name: 'devDialog'
  }
</script>
<style scoped>

</style>
