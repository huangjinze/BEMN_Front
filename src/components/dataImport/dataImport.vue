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
                            v-model="showdate1"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker></td>
                    <td ><h3>结束日</h3></td>
                    <td ><el-date-picker
                            v-model="showdate2"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker></td>
                    <td><el-button type="primary" round v-on:click="Intable1">导出表格</el-button></td>
                    <td><el-button type="primary" plain v-on:click="Invalue1">导出统计值</el-button></td>
                </tr>
                <tr style="height: 150px">
                    <td><h2>对比</h2></td>
                    <td><h3>开始月</h3></td>
                    <td><el-select v-model="comparemonth1" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select></td>
                    <td><h3>结束月</h3></td>
                    <td><el-select v-model="comparemonth2" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select></td>
                    <td><el-button type="primary" round v-on:click="Intable2">导出表格</el-button></td>
                    <td><el-button type="primary" plain v-on:click="Invalue2">导出统计值</el-button></td>
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
                    <td><el-button type="primary" plain v-on:click="Outdata">导入原始数据</el-button></td>
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
        showdate1: '',
        showdate2: '',
        options: [{
          value: '选项1',
          label: '1'
        }, {
          value: '选项2',
          label: '2'
        }, {
          value: '选项3',
          label: '3'
        }, {
          value: '选项4',
          label: '4'
        }, {
          value: '选项5',
          label: '5'
        }, {
          value: '选项5',
          label: '6'
        }, {
          value: '选项5',
          label: '7'
        }, {
          value: '选项5',
          label: '8'
        }, {
          value: '选项5',
          label: '9'
        }, {
          value: '选项5',
          label: '10'
        }, {
          value: '选项5',
          label: '11'
        }, {
          value: '选项5',
          label: '12'
        }],
        comparemonth1: '',
        comparemonth2: '',
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
      Intable1 () {
        alert(12)
        this.$emit('Clicka', this.showdate1)
        this.$emit('Click', this.showdate2)
      },
      Intable2 () {
        this.$emit('Click', this.showdate1)
        this.$emit('Click', this.showdate2)
      },
      Invalue1 () {
        this.$emit('Click', this.comparemonth1)
        this.$emit('Click', this.comparemonth2)
      },
      Invalue2 () {
        this.$emit('Click', this.comparemonth1)
        this.$emit('Click', this.comparemonth2)
      },
      Outdata () {
        this.$emit('Click', this.year)
      }
    },
    mounted () {
      this.restaurants = this.loadAll()
    }
  }
</script>

<style>

</style>
