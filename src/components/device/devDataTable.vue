//  设备管理部分的表格
<template>
    <el-card :header="tableName">
            <el-button style="position: absolute;top: 10px;right: 20px" @click="addDevice" type="primary">添加设备</el-button>
        <el-table
                :data="tableData"
                height="500"
                size="medium"
                style="width: 100%"
                :cell-style="cellStyle"
                @cell-click="cellClick">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="table-expand">
                        <el-form-item label="生产厂商：">
                            <span>{{ props.row.facturer }}</span>
                        </el-form-item>
                        <el-form-item label="设备规模：">
                            <span>{{ props.row.standard }}</span>
                        </el-form-item>
                        <el-form-item label="设备单价：">
                            <span>{{ props.row.price }}</span>
                        </el-form-item>
                        <el-form-item label="站点设备介绍：">
                            <span>{{ props.row.placeIntroduction }}</span>
                        </el-form-item>
                        <el-form-item label="联系电话：">
                            <span>{{ props.row.telephone }}</span>
                        </el-form-item>
                        <el-form-item label="介绍：">
                            <span>{{ props.row.remarks }}</span>
                        </el-form-item>
                        <el-form-item style="width:100%" label="检测指标：">
                            <el-tag size="medium"
                                    v-for="item in props.row.factors"
                                    :key="item.factor_name"
                                    type="success">
                                {{ item.factor_name }}
                            </el-tag>
                        </el-form-item>
                        <!--<el-col>-->
                            <!--<el-button style="margin-left: 50%" type="primary" plain>修改</el-button>-->
                        <!--</el-col>-->
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                    prop="device"
                    label="设备名"
                    width="400">
            </el-table-column>
            <el-table-column
                    prop="className"
                    label="类别名"
                    width="400">
                <template slot-scope="scope">
                    <el-tag
                            :key="item"
                            v-for="item in scope.row.className"
                            type="info"
                            close-transition>{{item}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="设备状态"
                    width="400">
            </el-table-column>
            <el-table-column label="操作" width="300">
                <template slot-scope="scope">
                    <el-button size="medium" @click="handleEdit(scope.row)" plain>修改</el-button>
                  <el-button type="warning" @click="handleDelete(scope.row)" plain>删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div align="center">
            <el-pagination
                    @current-change="handleCurrentChange"
                    :page-size="15"
                    layout="prev, pager, next, jumper"
                    :total="totalSize">
            </el-pagination>
        </div>
    </el-card>

</template>
<script>
    export default {
      data () {
        return {
        }
      },
      props: {
        tableData: {
          type: Array,
          required: true
        },
        statusControl: {
          type: Array,
          required: true
        },
        tableName: '',
        editClick: {type: Function},
        totalSize: 0
      },
      methods: {
        handleCurrentChange (val) {
          this.$emit('changePage', val)
        },
        handleEdit (row) {
          this.$emit('editClick', row.device_id)
        },
        cellStyle (cell) {
          if (cell.row.status === '异常' && cell.columnIndex === 3) {
            return { 'color': '#F56C6C', 'cursor': 'pointer', 'font-weight': '800' }
          } else if (cell.row.status === '正常' && cell.columnIndex === 3) {
            return { 'color': '#67C23A', 'font-weight': '800' }
          }
        },
        cellClick (row, column, cell, event) {
          var innerText = cell.innerText.split('\n')[0]
          this.$emit('errorDialog', [row.device_id, row.device, innerText])
        },
        addDevice () {
          this.$emit('addInfoDialog')
        },
        handleDelete (row) {
          this.$emit('deleteClick', row.device_id)
        }
      },
      name: 'devDataTable'
    }
</script>
<style scoped>
    .el-tag {
        margin: 5px;
    }
    .el-card {
        margin-top: 20px;
        position:relative;
    }
    .table-expand {
        font-size: 0;
    }
    .table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>
