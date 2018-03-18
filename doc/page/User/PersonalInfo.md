# PersonalInfo

> 个人信息界面

## props

无

## data

* labelPosition:
  * type: string
  * 组件位置
  
* myurl:
  * type: url
  * 图片的url

* changeinfo:
  * type: bool
  * 判断是否可以更改

* formLabelAlign:
  * type: object
  * 更改个人信息表单的内容

* formRules:
  * type: object
  * 表单的验证规则

## mounted
* 渲染页面前的操作
* Info()
  * 参数：email[0]
  * 作用 向后台查询该用户的信息
  * 返回值 用户信息

## method

* confirm:
  * 参数 无
  * 作用 提交更改信息后的表单
  * 返回值 该操作是否成功

  

