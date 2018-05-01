# deviceAdding
>添加设备数据处理模块——雷答
## props
* dialogAddingVisible:
  * type: Boolean
  * 内容：true表示显示添加设备信息对话框，false表示不显示

## data
* dialogVisible:
  * type: Boolean
  * 内容：true表示显示添加设备信息对话框，false表示不显示
* stationList
  * type: Array
  * 内容：站点名列表
* classList
  * type: Array
  * 内容：类别名列表

## mounted
* function
  * 参数：无
  * 作用：获取站点名列表
  * 返回值：无
* watch/dialogAddingVisible
  * 参数：无
  * 作用：监听dialogAddingVisible的变化，赋值给dialogVisible
  * 返回值：无
* watch/dialogVisible
  * 参数：无
  * 作用：监听dialogVisible的变化，反向绑定给父组件
  * 返回值：无

## methods
* onSelectStation
  * 参数：id
  * 作用：监听select框选择站点事件，获取类别列表
  * 返回值：无
* closeDialog
  * 参数：val
  * 作用：监听关闭对话框的事件
* onDevAddUpload
  * 参数：formData
  * 作用：添加设备信息表单上传
  * 返回值：无