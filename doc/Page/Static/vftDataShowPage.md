# dataShow
>水保领域数据表格展示页面
>——雷答
## data
* stationName:
  * type: Array
  * 记录当前选择的站点名
* className:
  * type: Array
  * 记录当前选择的类别名
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
* allIndexTags：
  * type: Map
  * 键名为category名，即ABCD等，键值为各个指标名
* navs:
  * type:Array
  * 存储表格数据
* currentTab：
  * type: Array
  * 存储当前选项卡名
* totalSize
  * type:Integer
  * 记录data总条数
## mounted
渲染页面前的操作
* getStation
  * 参数： '通量数据'
  * 作用： 获取站点名列表，存入indexTags和stations
  * 返回值： 无
## method
* parentStationListen
  * 参数： id
  * 作用：监听选择站点名标签事件 根据id在stations中查出站点名，再向后台请求查询类别名列表
  * 返回值： 无
* parentClassListen
  * 参数： id
  * 作用：监听点击类别名标签的事件，根据id查找类别名，向后台获取表格数据（指标数据表数据）
  * 返回值： 无
* CloseStationListen
  * 参数：无
  * 作用：监听关闭站点名标签的事件，选择面版状态切换
  * 返回值：无
* CloseClassListen
  * 参数：无
  * 作用：监听关闭类别标签事件
  * 返回值：无
* changeDataByPage
  * 参数：page页码
  * 作用：监听切换表格页面的事件，实现分页切换功能
  * 返回值：无
* getTableData
  * 参数：page
  * 作用：根据页码向后台获取对应的指标表格数据
  * 返回值：无

  


  