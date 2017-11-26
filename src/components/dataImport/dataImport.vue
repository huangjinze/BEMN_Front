<!--数据导出页面的具体内容-->
<template>
    <div>
    <el-col :span="12">
        <div class="sub-title"></div>
        <el-autocomplete
                class="inline-input"
                v-model="state2"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
                :trigger-on-focus="false"
                @select="handleSelect"
        ></el-autocomplete>
    </el-col>
    <table>
        <tr>
            <td width="100px"><h2>展示</h2></td>
            <td ><h3>开始日</h3></td>
            <td ><month></month></td>
            <td ><h3>结束日</h3></td>
            <td ><month></month></td>
            <td><el-button type="primary" round>导出表格</el-button></td>
            <td><el-button type="primary" plain>导出统计值</el-button></td>
        </tr>
        <tr>
            <td><h2>对比</h2></td>
            <td><h3>开始月</h3></td>
            <td><selecter></selecter></td>
            <td><h3>结束月</h3></td>
            <td><selecter></selecter></td>
            <td><el-button type="primary" round>导出表格</el-button></td>
            <td><el-button type="primary" plain>导出统计值</el-button></td>
        </tr>
        <tr>
            <td><h2>导入</h2></td>
            <td><h3>年份</h3></td>
            <td><counter></counter></td>
            <td><h3>文件</h3></td>
            <td><upfile></upfile></td>
            <td><el-button type="primary" plain>导入原始数据</el-button></td>
        </tr>
    </table>
    </div>
</template>



<script>
  import month from '../month.vue'
  import selecter from '../selecter.vue'
  import upfile from '../upfile.vue'
  import counter from '../counter.vue'
  export default {
    components: {month, selecter, upfile, counter},
    data () {
      return {
        restaurants: [],
        state2: ''
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
          { 'value': '三全鲜食（北新泾店）' }
        ]
      },
      handleSelect (item) {
        console.log(item)
      }
    },
    mounted () {
      this.restaurants = this.loadAll()
    }
  }
</script>

<style>

</style>
