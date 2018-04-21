# devDataTable
>设备信息展示的表格，子组件——雷答

## props
* tableData
  * type: Array
  * 内容：接收父组件传来的表格数据
* tableName
  * type: String
  * 内容：表格名字
* totalSize
  * type: Interger
  * 内容：分页功能，表格记录的总条数




 
## methods
* handleCurrentChange
  * 参数：val
  * 作用：改变页码时触发，将页码信息传给父组件
  * 返回值：无
* handleEdit
  * 参数：row
  * 作用：单击修改按钮时触发，将该行对应的设备id传给父组件
  * 返回值：无
* cellStyle
  * 参数：cell
  * 作用：表格单元格的回调方法，为“异常”和“正常”分别设置不同的样式
  * 返回值：无
* cellClick
  * 参数：无
  * 作用：单击单元格的事件函数，打开故障信息模态框
* addDevice
  * 参数：无
  * 作用：打开添加信息的表单（模态框）
