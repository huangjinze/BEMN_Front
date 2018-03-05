<template>
  <el-card class="box-card">

    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="year"
        label="年份"
        width="180">
      </el-table-column>
      <el-table-column
        prop="max"
        label="最大值"
        width="160">
      </el-table-column>
      <el-table-column
        prop="min"
        label="最小值"
        width="160">
      </el-table-column>
      <el-table-column
        prop="mean"
        label="平均值"
        width="160">
      </el-table-column>
      <el-table-column
        prop="median"
        label="中位數"
        width="160">
      </el-table-column>
      <el-table-column
        prop="std"
        label="标准差"
        width="160">
      </el-table-column>
    </el-table>

  </el-card>
</template>

<script>
  /* eslint-disable standard/object-curly-even-spacing */
  export default {
    components: {},
    name: 'chartGrid',
    props: {
      tableData: Array
    }
  }
</script>

<style scoped>

  .box-card {
    width: 1080px;
  }

</style>
