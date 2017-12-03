<template>
  <div id="dataManager">
    <el-button @click="onClick" class="export" icon="el-icon-download">导出</el-button>
    <el-tabs type="border-card">
      <el-tab-pane v-for="nav in navs" :key="nav.value" :label="nav.label">
        <!-- 页内内容开始 -->
        <el-table ref="multipleTable" :data="nav.tableData" stripe tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50" v-if="nav.mcols">
          </el-table-column>
          <template v-for="item in nav.mcols">
            <el-table-column v-bind:key="item.value" :prop="item.prop" v-bind:label="item.label">
            </el-table-column>
          </template>
          <el-pagination
            layout="prev, pager, next"
            :total="50">
          </el-pagination>
        </el-table>
        <!-- 页内内容结束 -->
      </el-tab-pane>
    </el-tabs>
    
  </div>
</template>
<script>
  export default {
    props: {
      dataExport: Function,
      navs: {type: Array, default: []}
    },
    methods: {
      toggleSelection (rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row)
          })
        } else {
          this.$refs.multipleTable.clearSelection()
        }
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      onClick () {
        this.$emit('Click')
      }
    }
  }
</script>

<style scoped>
  .handle-box {
    margin-bottom: 20px;
  }

  .handle-select {
    width: 120px;
  }

  .handle-input {
    width: 300px;
    display: inline-block;
  }
  .export{
    position: absolute;
    right: 28px;
    z-index: 1;
  }
</style>
