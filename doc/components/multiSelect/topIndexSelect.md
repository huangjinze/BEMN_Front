# topIndexSelext
> 标签选择组件——雷答
## props
* className:
  * type:Array
  * 内容：存储类别名
* initTopPartTags:
  * type: Array
  * 内容：存储进入页面初始状态站点名（水保领域）
* initTopSiteTags
  * type: Array
  * 内容：存储进入页面初始状态类别名（水保领域）
* indices:
  * type: Array
  * 内容：存储tab选项卡名列表，与子组件的indices对应，与父组件的index对应
* indexTags
  * type: Array
  * 内容：选择面板里的标签列表（可能是站点名列表，可能是类别列表，组件中统一用indexTags指代）
## data
* topPartTags:
  * type: Array
  * 内容: 当前已选择站点名（水保领域）
* topSiteTags：
  * type: Array
  * 内容：当前已选择类别名（水保领域）
* topIndexTags：
  * type: Array
  * 内容：当前已选择指标名（水保领域）
* flag：
  * type：Interger
  * 内容：控制选择面板是否显示的标志
## mounted
渲染页面前的操作
* function
  * 参数：无
  * 作用：给顶部“已选择”列表中填充初始列表
  * 返回值：无
## methods
* handlePartClose
  * 参数：tag
  * 作用：监听站点名标签关闭事件
  * 返回值：无
* handleSiteClose
  * 参数：tag
  * 作用：监听类别名标签关闭事件
  * 返回值：无
* handleIndexClose
  * 参数：tag
  * 作用：监听指标名标签关闭事件
  * 返回值：无
* ChooseTag
  * 参数：id
  * 作用：选择标签的事件，标签可能是站点标签、类别标签等，根据flag来判定
  * 返回值：无
* ClickIndexClassListen
  * 参数：id
  * 作用：点击tab选项卡的事件
  * 返回值：无

