<template>
  <div id="dataManager">
    <el-button @click="onClick" class="export" icon="el-icon-download">导出</el-button>
    <el-tabs type="border-card">
      <el-tab-pane label="森林群落结构">
        <!-- 页内内容开始 -->
        <el-table ref="multipleTable" :data="tableData3" stripe tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50">
          </el-table-column>
          <template v-for="item in cols">
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
      <el-tab-pane label="森林群落乔木层生物量和林木生长量及养分">
        配置管理
      </el-tab-pane>
      <el-tab-pane label="森林凋落物量">角色管理

      </el-tab-pane>
      <el-tab-pane label="群落的天然更新">定时任务补偿

      </el-tab-pane>
    </el-tabs>
    
  </div>
</template>
<script>
  export default {
    props: {
      dataExport: Function,
      tableData3: {type: Array, default: []},
      cols: {type: Array, default: []}
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
  @import url("//unpkg.com/element-ui@2.0.5/lib/theme-chalk/index.css");
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
