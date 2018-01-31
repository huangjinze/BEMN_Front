<!--数据导出页面的具体内容-->
<template>
    <div class="main">
            <table>
                <tr style="height: 150px">
                    <td width="100px"><h2>展示</h2></td>
                    <td><h3>开始日</h3></td>
                    <td><el-date-picker
                            v-model="StartDate"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker></td>
                    <td><h3>结束日</h3></td>
                    <td><el-date-picker
                            v-model="EndDate"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker></td>
                    <td><el-button type="primary" round v-on:click="OuttableDate">导出表格</el-button></td>
                    <td><el-button type="primary" plain v-on:click="OutvalueDate">导出统计值</el-button></td>
                </tr>
                <tr style="height: 150px">
                    <td><h2>对比</h2></td>
                    <td><h3>开始月</h3></td>
                    <td><el-select v-model="StartMonth" placeholder="请选择">
                        <el-option
                                v-for="item in optionsMonth"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select></td>
                    <td><h3>结束月</h3></td>
                    <td><el-select v-model="EndMonth" placeholder="请选择">
                        <el-option
                                v-for="item in optionsMonth"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select></td>
                    <td><el-button type="primary" round v-on:click="OuttableMonth">导出表格</el-button></td>
                    <td><el-button type="primary" plain v-on:click="OutvalueMonth">导出统计值</el-button></td>
                </tr>
                <tr>

                    <!--<td><el-upload-->
                            <!--class="upload-demo"-->
                            <!--:action=upLoadUrl-->
                            <!--:on-preview="handlePreview"-->
                            <!--:on-remove="handleRemove"-->
                            <!--multiple-->
                            <!--:limit="1"-->
                            <!--:on-exceed="handleExceed"-->
                            <!--:file-list="fileList">-->
                        <!--<el-button size="small" type="primary" v-on:click="ChooseFile">选择文件</el-button>-->
                    <!--</el-upload></td>-->
                    <!--<td><el-button type="primary" plain v-on:click="InOridata">导入原始数据</el-button></td>-->
                </tr>
            </table>
            <el-row>
                <el-col :span="2">
                    <h2 style="margin:0">导入</h2>
                </el-col>
                <el-col :span="6">
                    <el-select v-model="form.stationSelect" clearable placeholder="请选择站点" @change="selectStation">
                        <el-option
                                v-for="item in stationList"
                                :key="item.id"
                                :label="item.text"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="6">
                    <el-select v-model="form.classSelect" clearable :disabled="isDisabled" placeholder="请选择类型" @change="selectClass">
                        <el-option
                                v-for="item in classList"
                                :key="item.id"
                                :label="item.text"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="6">
                    <el-upload
                            class="upload-demo"
                            ref="upload"
                            action="http://127.0.0.1/excel/vft/import"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :auto-upload="false"
                            :file-list="files"
                            :on-success="onSuccess">
                        <el-button slot="trigger" size="medium" type="primary">选取文件</el-button>
                        <el-button style="margin-left: 10px;" size="medium" type="success" @click="submitUpload">上传</el-button>
                    </el-upload>
                </el-col>
            </el-row>
    </div>
</template>
<script>
  export default {
    data () {
      return {
        state: '',
        StartDate: '',
        EndDate: '',
        optionsMonth: [{
          value: '1',
          label: '1'
        }, {
          value: '2',
          label: '2'
        }, {
          value: '3',
          label: '3'
        }, {
          value: '4',
          label: '4'
        }, {
          value: '5',
          label: '5'
        }, {
          value: '6',
          label: '6'
        }, {
          value: '7',
          label: '7'
        }, {
          value: '8',
          label: '8'
        }, {
          value: '9',
          label: '9'
        }, {
          value: '10',
          label: '10'
        }, {
          value: '11',
          label: '11'
        }, {
          value: '12',
          label: '12'
        }],
        StartMonth: '',
        EndMonth: '',
        isDisabled: true,
        year: 2012,
        uploadForm: new FormData(),   // 一个formdata
        form: {
          stationSelect: '',
          classSelect: ''
        },
        files: []
      }
    },
    props: {
      upLoadUrl: String,
      stationList: {
        type: Array,
        required: true
      },
      classList: {
        type: Array,
        required: true
      }
    },
    methods: {
      selectStation (value) {
        if (value) {
          this.$emit('selectStation', value)
          this.isDisabled = false
        } else {
          this.isDisabled = true
        }
      },
      selectClass () {
        this.uploadForm.append('station', this.form.stationSelect)
        this.uploadForm.append('class', this.form.classSelect)
      },
      querySearch (queryString, cb) {
        var canshuu = this.canshu
        var results = queryString ? canshuu.filter(this.createFilter(queryString)) : canshuu
        // 调用 callback 返回建议列表的数据
        cb(results)
      },
      createFilter (queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
        }
      },
      loadAll () {
        return [
          { }
        ]
      },
      handleSelect (item) {
        console.log(item)
      },
      handleChange (value) {
        console.log(value)
      },
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePreview (file) {
        console.log(file)
      },
      handleExceed (files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      },
      OuttableDate () {
        var DataTable = []
        DataTable.push(this.StartDate)
        DataTable.push(this.EndDate)
        this.$emit('ClicktableData', DataTable)
      },
      OuttableMonth () {
        var MonthTable = []
        MonthTable.push(this.StartMonth)
        MonthTable.push(this.EndMonth)
        this.$emit('ClicktableMonth', MonthTable)
      },
      OutvalueDate () {
        var DataValue = []
        DataValue.push(this.StartDate)
        DataValue.push(this.EndDate)
        this.$emit('ClickvalueData', DataValue)
      },
      OutvalueMonth () {
        var MonthValue = []
        MonthValue.push(this.StartMonth)
        MonthValue.push(this.EndMonth)
        this.$emit('ClickvalueMonth', MonthValue)
      },
      submitUpload () {
        if (this.form.stationSelect && this.form.classSelect) {
          this.$refs.upload.submit()
        } else {
          this.$alert('请选择站点和类别', '失败', {confirmButtonText: 'ok'})
        }
      },
      onSuccess (response) {
        console.log(response)
        this.uploadForm.append('path', response)
        this.$emit('twoSelect', this.uploadForm)
      }
    }
  }
</script>

<style>

</style>
