# indexSelect
>标签选择组件的子组件——雷答
## props
* className:
  * type:Array
  * 内容：存储类别名
* indices:
  * type: Array
  * 内容：存储tab选项卡名列表，与父组件topIndexSelect的indices对应
* indexTags
  * type: Array
  * 内容：选择面板里的标签列表（可能是站点名列表，可能是类别列表，组件中统一用indexTags指代） 
## methods
* handleClick
  * 参数：tab
  * 作用：点击tab选项卡事件
  * 返回值：无
* selectIndex
  * 参数：id
  * 作用：选择标签事件
  * 返回值：无