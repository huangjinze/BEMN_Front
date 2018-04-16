# UserPage

> 用户控制页面界面

## props

无

## data

* PermissionAdd:
  * type: bool
  * 是否显示增加角色的按钮
* currentPage:
  * type: number
  * 现在所在页数
* pagesize:
  * type: number
  * 总页数
* PermissionChange:
  * type: bool
  * 是否显示更改角色信息的按钮
* PermissionDelete:
  * type: bool
  * 是否显示删除角色信息的按钮
* tableData: 
  * type: array
  * 角色表格的所有信息
* tags: 
  * type: array
  * 角色权限的信息
* Addinfo:
  * type: bool
  * 是否弹出增加角色的框
* Changeinfo:
  * type: bool
  * 是否弹出改变角色信息的框
* formadd
  * type: object
  * 增加角色信息的表单
* formchange
  * type: object
  * 更改角色信息的表单
* permissions:
  * type: array
  * 角色选项
* formRules
  * type: object
  * 表单验证规则
  
## mounted
* 渲染页面前的操作：
* 权限判断
* UserInfo()
  * 参数：无
  * 作用 向后台查询所有用户的信息
  * 返回值 所有用户的信息

## method
* handleEdit:
  * 参数 row（行数）
  * 作用 弹出修改用户信息框，并把表格中相关数据填入框中相应位置
  * 返回值 在有角色的情况下，返回角色的id

* handleDelete:
  * 参数 row（行数）
  * 作用 在数据库中删除该行信息
  * 返回值 该操作是否成功
  
* confirminfo：
  * 参数 无
  * 作用 在数据库中添加新用户
  * 返回值 该操作是否成功 
  
* changeinfo：
  * 参数 无
  * 作用 在数据库中改变用户信息
  * 返回值 该操作是否成功
  
  

