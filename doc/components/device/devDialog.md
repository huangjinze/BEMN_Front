# devDialog
>设备管理部分设备故障信息的对话框，子组件——雷答

## props
* dialogErrorVisible
  * type: Boolean
  * 内容：true或false，控制对话框是否显示
* errorData
  * type: Array
  * 内容：故障信息列表
* faultyDeviceName
  * type: String
  * 内容：故障设备名称，用于显示标题







## data
* time
  * type: String
  * 内容：与时间选择器的时间相对应
* dialogVisible
  * type: Boolean
  * 内容：与props中的dialogErrorVisible相对应
## mounted
* watch/dialogErrorVisible
  * 参数：val
  * 作用：监听dialogErrorVisible的变化，赋值给dialogVisible
  * 返回值：无
* watch/dialogVisible
  * 参数：无
  * 作用：监听dialogVisible的变化，反向绑定给父组件
  * 返回值：无
 
## methods
* onSelectErrorByTime
  * 参数：无
  * 作用：时间选择器事件函数，获取开始时间和结束时间，传给父组件
  * 返回值：无
