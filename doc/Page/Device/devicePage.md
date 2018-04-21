# devicePage
>设备管理页面——雷答
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
* allIndexTags：
  * type: Map
  * 键名为category名，即ABCD等，键值为各个指标名
* tableData：
  * type: Array
  * 内容：表格数据，即设备信息json数组，数组每一项包含某一个设备对应的各项属性信息
* dialogAddVisible：
  * type: boolean
  * 内容：true表示显示故障信息模态框，false表示不显示
* dialogErrorVisible：
  * type: boolean
  * 内容：true表示显示添加设备信息模态框，false表示不显示
* dialogEditVisible：
  * type: boolean
  * 内容：true表示显示编辑设备信息模态框，false表示不显示
* errorData：
  * type: Array
  * 内容：存储故障信息
* faultyDeviceName：
  * type: String
  * 内容：故障设备名字
* editInfo：
  * type: Object
  * 内容：修改设备信息模态框中显示的原有信息
* tagsArray：
  * type: Array
  * 内容：设备所对应的检测指标名列表
* selectClassList:
  * type: Array
  * 内容：select下拉列表包含的类别列表
* valueClassList：
  * type: Array
  * 内容：指标所属类别列表，类别可能不止一个
## mounted
* function
  * 参数：无
  * 作用：获取初始站点名标签列表，获取部分设备信息
  * 返回值：无
## methods
* errorDialog
  * 参数： temp
  * 作用：获取故障信息，打开故障信息模态框
  * 返回值： 无
* addInfoDialog
  * 参数：无
  * 作用：打开添加设备模态框
  * 返回值：无
* onSelectErrorByTime
  * 参数：time
  * 作用：根据时间条件获取故障信息
  * 返回值：无
* parentStationListen
  * 参数：id
  * 作用：监听选择站点标签的事件，根据站点名获取设备信息
  * 返回值：无
* CloseStationListen
  * 参数：无
  * 作用：监听关闭站点标签事件
  * 返回值：无
* onErrorInfoDialogClose
  * 参数：val
  * 作用：监听故障信息对话框关闭事件
  * 返回值：无
* onAddingDialogClose
  * 参数：val
  * 作用：监听添加设备对话框关闭事件
  * 返回值：无
* onEditDialogClose
  * 参数：val
  * 作用：监听修改设备信息对话框关闭事件
  * 返回值：无
* onAddDevice
  * 参数：无
  * 作用：打开添加设备对话框
  * 返回值：无
* onEditClick
  * 参数：无
  * 作用：打开修改设备信息对话框，并填入设备信息
  * 返回值：无
* onDevEditUpload
  * 参数：无
  * 作用：上传修改设备信息的表单
  * 返回值：无
* onSelectStation
  * 参数：id
  * 作用：监听站点select框选择站点的事件，获取类别列表
* onChangePage
  * 参数：page
  * 作用：根据切换的页码，获取设备信息
* getDevice
  * 参数：stationName, domainName, page
  * 作用：供其它方法调用
* getFactorsByDevice
  * 参数：devId
  * 作用：根据设备ID获取检测指标信息
  * 返回值：无