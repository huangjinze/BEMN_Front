<!--数据导出页面的具体内容-->
<template>
    <div class="main">
            <el-col :span="12">
                <div class="sub-title"></div>
                <el-autocomplete
                        class="inline-input"
                        v-model="state"
                        :fetch-suggestions="querySearch"
                        placeholder="请输入内容"
                        :trigger-on-focus="false"
                        @select="handleSelect"
                ></el-autocomplete>
            </el-col>
            <table>
                <tr style="height: 150px">
                    <td width="100px"><h2>展示</h2></td>
                    <td ><h3>开始日</h3></td>
                    <td ><el-date-picker
                            v-model="StartDate"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker></td>
                    <td ><h3>结束日</h3></td>
                    <td ><el-date-picker
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
                <tr style="height: 150px">
                    <td><h2>导入</h2></td>
                    <td><h3>年份</h3></td>
                    <td><el-input-number v-model="year" @change="handleChange" :min="2012" label="描述文字"></el-input-number></td>
                    <td><h3>文件</h3></td>
                    <td><el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            multiple
                            :limit="1"
                            :on-exceed="handleExceed"
                            :file-list="fileList">
                        <el-button size="small" type="primary">选择文件</el-button>
                    </el-upload></td>
                    <td><el-button type="primary" plain v-on:click="Indata">导入原始数据</el-button></td>
                </tr>
            </table>
    </div>
</template>
<script>
  export default {
    data () {
      return {
        restaurants: [],
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
        year: 2012,
        fileList: []
      }
    },
    methods: {
      querySearch (queryString, cb) {
        var restaurants = this.restaurants
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
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
        var DataTable = new Array(2)
        DataTable.push(this.StartDate)
        DataTable.push(this.EndDate)
        this.$emit('ClicktableData', DataTable)
      },
      OuttableMonth () {
        var MonthTable = new Array(2)
        MonthTable.push(this.StartMonth)
        MonthTable.push(this.EndMonth)
        this.$emit('ClickvalueData', MonthTable)
      },
      OutvalueDate () {
        var DataValue = new Array(2)
        DataValue.push(this.StartDate)
        DataValue.push(this.EndDate)
        this.$emit('ClicktableMonth', DataValue)
      },
      OutvalueMonth () {
        var MonthValue = new Array(2)
        MonthValue.push(this.StartMonth)
        MonthValue.push(this.EndMonth)
        this.$emit('ClickvalueMonth', MonthValue)
      },
      Indata () {
        this.$emit('ClickYear', this.year)
      }
    },
    mounted () {
      this.restaurants = this.loadAll()
    }
  }
</script>

<style>

</style>
