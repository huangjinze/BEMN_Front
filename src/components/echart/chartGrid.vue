<template>
  <el-card class="box-card">
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="year"
        label="年份"
        >
      </el-table-column>
      <el-table-column
        prop="max"
        label="最大值"
        >
      </el-table-column>
      <el-table-column
        prop="min"
        label="最小值"
       >
      </el-table-column>
      <el-table-column
        prop="mean"
        label="平均值"
        >
      </el-table-column>
      <el-table-column
        prop="median"
        label="中位數"
        >
      </el-table-column>
      <el-table-column
        prop="std"
        label="标准差"
        >
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
    width: 95%;
  }

</style>
