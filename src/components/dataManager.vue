<template>
  <div id="dataManager">
    <el-button @click="onClick" class="export" icon="el-icon-download">导出</el-button>
    <el-tabs type="border-card" @tab-click="handleClick">
      <el-tab-pane v-for="nav in navs" :key="nav.value" :label="nav.label">
        <!-- 页内内容开始 -->
        <el-table ref="multipleTable" :data="nav.tableData" stripe tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50" v-if="nav.mcols">
          </el-table-column>
          <template v-for="item in nav.mcols">
            <el-table-column v-bind:key="item.value" :prop="item.prop" v-bind:label="item.label">
            </el-table-column>
          </template>
        </el-table>
        <div align="center">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-size="15"
            layout="prev, pager, next, jumper"
            :total="1000">
          </el-pagination>
        </div>
        <!-- 页内内容结束 -->
      </el-tab-pane>
    </el-tabs>
    
  </div>
</template>
<script>
  var tab1 = 'A'
  var tab2 = '0'
  export default {
    props: {
      dataExport: Function,
      navs: {type: Array, default: []}
    },
    methods: {
      handleClick (tab, event) {
        console.log(tab, event)
        this.$emit('changePage', [tab.label, '1', tab.index])
        tab1 = tab.label
        tab2 = tab.index
      },
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
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
        this.$emit('changePage', [tab1, val, tab2])
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
