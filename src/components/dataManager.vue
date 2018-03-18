<template>
  <div id="dataManager">
    <el-select v-if="showSelect === true" v-model="value" style="margin-left: 60%;z-index: 1;position: absolute">
      <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
      </el-option>
    </el-select>
    <el-button @click="onClick" class="export" icon="el-icon-download">导出</el-button>
    <el-tabs type="border-card" @tab-click="handleClick">
      <el-tab-pane v-for="nav in navs" :key="nav.value" :label="nav.label">
        <!-- 页内内容开始 -->
        <el-table ref="multipleTable" :data="nav.tableData" stripe tooltip-effect="dark" style="width: 100%" max-height="450" @selection-change="handleSelectionChange">
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
            :total="totalSize">
          </el-pagination>
        </div>
        <!-- 页内内容结束 -->
      </el-tab-pane>
    </el-tabs>

  </div>
</template>
<script>
  import ElInput from '../../node_modules/element-ui/packages/input/src/input.vue'
  import ElButton from '../../node_modules/element-ui/packages/button/src/button.vue'

  export default {
    components: {
      ElButton,
      ElInput},
    data () {
      return {
        tab2: '0',
        options: [{
          value: 'level1',
          label: 'level1'
        }, {
          value: 'level2',
          label: 'level2'
        }, {
          value: 'level3',
          label: 'level3'
        }],
        value: 'level1'
      }
    },
    props: {
      dataExport: Function,
      navs: {type: Array, default: []},
      totalSize: 0,
      showSelect: true
    },
    methods: {
      handleClick (tab, event) {
        this.$emit('changePage', ['1', tab.index])
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
        this.$emit('changePage', [val, this.tab2])
        // tab[0]为分页组件的当前页数，tab[1]为便签页组件的当前索引
      }
    },
    watch: {
      value: function (val) {
//        console.log(val)
        this.$emit('selectValue', val)
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
