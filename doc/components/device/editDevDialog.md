# editDevDialog
>修改设备信息对话框子组件——雷答

## props
* dialogEditingVisible
  * type: Boolean
  * 内容：true表示显示修改设备信息对话框，false表示不显示
* stationList
  * type: Array
  * 内容：select选择器站点列表
* classList
  * type: Array
  * 内容：select选择器类别列表
* editInfo
  * type: Object
  * 内容：待修改的原始信息
* tags
  * type: Array
  * 内容：检测指标标签列表







## data
* dialogVisible
  * type: Boolean
  * 内容：true表示显示添加设备信息对话框，false表示不显示
* innerVisible
  * type: Boolean
  * 内容：true表示显示添加检测指标信息对话框，false表示 不显示
* form
  * type: Object
  * 内容：表单数据(设备属性)
* innerForm
  * type: Object
  * 内容：子表单数据（指标属性）
* Rules
  * type: Object
  * 内容：定义填写表单的规范
* tagInfoDialogTitle
  * type：String
  * 内容：子对话框标题
* tagsArray
  * type: Array
  * 内容：指标名称列表，tag标签列表

 
## methods
* clickSelectStation
  * 参数：value
  * 作用：监听点击站点选择器的事件，把选择的站点名传递给父组件
  * 返回值：无
* handleTagClose
  * 参数：tag
  * 作用：关闭表单中检测指标标签
  * 返回值：无
* showTagInput
  * 参数：无
  * 作用：添加新指标标签函数
  * 返回值：无
* tagInputConfirm
  * 参数：无
  * 作用：鼠标失去标签上的焦点事件，确认输入的指标
* onSubmit
  * 参数：formName
  * 作用：将表单数据传给父组件
* onInnerSubmit
  * 参数：formName
  * 作用：判断子表单的是否通过验证
* formReset
  * 参数：formName
  * 作用：重置表单数据
  * 返回值：无
