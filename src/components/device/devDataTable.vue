//  设备管理部分的表格
<template>
    <el-card :header="tableName">
            <el-button style="position: absolute;top: 10px;right: 20px" @click="addDevice" type="primary">添加设备</el-button>
        <el-table
                :data="tableData"
                height="500"
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
                        <el-form-item label="设备数目：">
                            <span>{{ props.row.number }}</span>
                        </el-form-item>
                        <el-form-item label="购买时间：">
                            <span>{{ props.row.pur_time }}</span>
                        </el-form-item>
                        <el-form-item label="联系电话：">
                            <span>{{ props.row.telephone }}</span>
                        </el-form-item>
                        <el-form-item label="介绍：">
                            <span>{{ props.row.introduction }}</span>
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
                    prop="class"
                    label="类别名"
                    width="300">
            </el-table-column>
            <el-table-column
                    prop="dev"
                    label="设备名"
                    width="300">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="设备状态"
                    width="300">
            </el-table-column>
            <el-table-column label="操作" width="250">
                <template slot-scope="scope">
                    <el-button size="medium" plain>修改</el-button>
                </template>
            </el-table-column>
        </el-table>
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
        tableName: ''
      },
      methods: {
        cellStyle (cell) {
          for (let temp in this.statusControl) {
            if (cell.rowIndex === this.statusControl[temp].rowIndex && cell.columnIndex === 3) {
              cell.row.status = '异常'
              return { 'color': '#F56C6C', 'cursor': 'pointer', 'font-weight': '800' }
            }
          }
          if (cell.columnIndex === 3) {
            return { 'color': '#67C23A', 'font-weight': '800' }
          }
        },
        cellClick (row, column, cell, event) {
          var innerText = cell.innerText.split('\n')[0]
          this.$emit('errorDialog', [row.class, row.dev, innerText])
        },
        addDevice () {
          this.$emit('addInfoDialog')
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