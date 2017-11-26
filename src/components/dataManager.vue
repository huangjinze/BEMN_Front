<template>
  <div id="dataManager">
    <el-tabs type="border-card">
      <el-tab-pane label="森林群落结构">
        <!-- 页内内容开始 -->
        <el-table ref="multipleTable" :data="tableData3" stripe tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50">
          </el-table-column>
          <el-table-column prop="age" label="森林群落的年龄（a）">
          </el-table-column>
          <el-table-column prop="origin" label="森林群落的起源">
          </el-table-column>
          <el-table-column prop="ave_height" label="森林群落的平均树高（m）">
          </el-table-column>
          <el-table-column prop="ave_DBH" label="森林群落的胸径（cm）" >
          </el-table-column>
          <el-table-column prop="ave_density" label="森林群落的密度（株／hm2）" >
          </el-table-column>
          <el-table-column prop="Acomposition" label="森林群落的树种组成" >
          </el-table-column>
          <el-table-column prop="breed" label="森林群落的动植物种类" >
          </el-table-column>
          <el-table-column prop="propagation" label="森林群落的动植物数量" >
          </el-table-column>
          <el-table-column prop="coverage" label="森林群落的郁闭度" >
          </el-table-column>
          <el-table-column prop="area" label="森林群落主林层的叶面积指数" >
          </el-table-column>
          <el-table-column prop="qm_height" label="林下植被（亚乔木）平均高度(m)" >
          </el-table-column>
          <el-table-column prop="gm_height" label="林下植被（灌木）平均高度(m)" >
          </el-table-column>
          <el-table-column prop="cb_height" label="林下植被（草本）平均高度(m)" >
          </el-table-column>
          <el-table-column prop="cover" label="林下植被总盖度（%）" >
          </el-table-column>
          <el-table-column prop="date" label="调查时间" >
          </el-table-column>
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
    data () {
      return {
        tableData3: [{
          age: '9614',
          origin: '1937',
          ave_height: '22.3',
          ave_DBH: '77.3',
          ave_density: '37830.1',
          Acomposition: '红松林',
          breed: '8909',
          propagation: '126936',
          coverage: '0.4',
          area: '0.96',
          pm_height: '1.4',
          gm_height: '0.5',
          cb_height: '0.1',
          cover: '85.1',
          date: '2014-02-04'
        }, {
          age: '9614',
          origin: '1937',
          ave_height: '22.3',
          ave_DBH: '77.3',
          ave_density: '37830.1',
          Acomposition: '红松林',
          breed: '8909',
          propagation: '126936',
          coverage: '0.4',
          area: '0.96',
          pm_height: '1.4',
          gm_height: '0.5',
          cb_height: '0.1',
          cover: '85.1',
          date: '2014-02-04'
        }, {
          age: '9614',
          origin: '1937',
          ave_height: '22.3',
          ave_DBH: '77.3',
          ave_density: '37830.1',
          Acomposition: '红松林',
          breed: '8909',
          propagation: '126936',
          coverage: '0.4',
          area: '0.96',
          pm_height: '1.4',
          gm_height: '0.5',
          cb_height: '0.1',
          cover: '85.1',
          date: '2014-02-04'
        }, {
          age: '9614',
          origin: '1937',
          ave_height: '22.3',
          ave_DBH: '77.3',
          ave_density: '37830.1',
          Acomposition: '红松林',
          breed: '8909',
          propagation: '126936',
          coverage: '0.4',
          area: '0.96',
          pm_height: '1.4',
          gm_height: '0.5',
          cb_height: '0.1',
          cover: '85.1',
          date: '2014-02-04'
        }, {
          age: '9614',
          origin: '1937',
          ave_height: '22.3',
          ave_DBH: '77.3',
          ave_density: '37830.1',
          Acomposition: '红松林',
          breed: '8909',
          propagation: '126936',
          coverage: '0.4',
          area: '0.96',
          pm_height: '1.4',
          gm_height: '0.5',
          cb_height: '0.1',
          cover: '85.1',
          date: '2014-02-04'
        }],
        multipleSelection: []
      }
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

  </style>
