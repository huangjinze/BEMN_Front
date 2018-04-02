# ImportPage
>导入导出页面——雷答
## data
* stationName:
  * type: Array
  * 记录当前选择的站点名
* className:
  * type: Array
  * 记录当前选择的类别名
* indexName:
  * type: Array
  * 内容：已选中的选项卡名称，如ABCD等
* stations：
  * type: Array
  * 存储站点名列表
* classes:
  * type: Array
  * 存储类别名列表
* index:
  * type: Array
  * tab选项卡名称列表（在该组件中统一用index指代），可能是‘选择站点’，‘选择类型’字段，也可能是指标二级类别名（category）列表如ABCD等
* indexTags:
  * type: Array
  * 选择面板里的标签列表（可能是站点名列表，可能是类别列表，组件中统一用indexTags指代）
## mounted
* function
  * 参数：无
  * 作用：获取初始站点名标签列表
  * 返回值：无
## methods
* parentStationListen
  * 参数： id
  * 作用：监听选择站点名标签事件 根据id在stations中查出站点名，再向后台请求查询类别名列表
  * 返回值： 无
* parentClassListen
  * 参数： id
  * 作用：监听点击类别名标签的事件，根据id查找类别名，向后台获取指标数据
  * 返回值： 无
* parentIndexClassListen
  * 参数：id
  * 作用：监听点击tab选项卡事件
  * 返回值：无
* CloseStationListen
  * 参数：无
  * 作用：监听关闭站点名标签的事件，选择面版状态切换
  * 返回值：无
* CloseClassListen
  * 参数：无
  * 作用：监听关闭类别标签事件
  * 返回值：无
* onClickDataTable
  * 参数：DataTable
  * 作用：数据展示——导出数据表格
  * 返回值：无
* onClickMonthTable
  * 参数：MonthTable
  * 作用：月份对比——导出数据表格
  * 返回值：无
* onClickDataValue
  * 参数：DataValue
  * 作用：数据展示——导出统计值
  * 返回值：无
* onClickMonthValue
  * 参数：MonthValue
  * 作用：月份对比——导出统计值
 
  