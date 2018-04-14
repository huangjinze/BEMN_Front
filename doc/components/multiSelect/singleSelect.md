# singleSelect
>基于topIndexSelect的接口，屏蔽掉选择站点以外的功能
## data
* stationName
  * type: Array
  * 内容：初始时已选择的站点名
* className
  * type: Array
  * 内容：初始时已选择的类别名
* indexName
  * type: Array
  * 内容：初始时已选择的指标名
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
  * 作用：获取站点名列表
  * 返回值：无
## methods
* parentStationListen
  * 参数：id
  * 作用：监听选择站点名标签事件，此处通过令flag取4，使得后续面板不再显示
  * 返回值：无
* CloseStationListen
  * 参数：无
  * 作用：监听关闭站点名标签的事件，选择面版状态切换
  * 返回值：无