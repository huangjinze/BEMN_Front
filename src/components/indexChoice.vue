<!-- 该组件为:多指标选择的标签页，标签页内为表格-->
<template>
    <div :class="className" :id="id">
        <el-tabs v-model="activeName2" type="card" @tab-click="handleClick" id="tabs">
            <el-tab-pane
                    v-for="(value, index) in indices"
                    :key="value.text"
                    :label="value.text">
                <el-table
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                    <el-table-column
                            type="selection"
                            >
                    </el-table-column>
                    <el-table-column
                            v-for="(value, index) in col_name"
                            :key="value.text"
                            :label="value.text"
                            :prop="value.prop"
                            >
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
    </div>

</template>

<script>
    export default {
      components: {
      },
      data () {
        return {

        }
      },
      props: {
        indices: {
          type: Array,
          required: true
        },
        col_name: {
          type: Array,
          required: true
        },
        tableData: {
          type: Array,
          required: true
        }
      },
      mounted: function () {
        this.$nextTick(function () {
        })
      },
      methods: {

      },
      name: 'indexChoice'
    }
</script>
<style scoped>
#tabs{
    margin-top: 50px;
}
</style>

