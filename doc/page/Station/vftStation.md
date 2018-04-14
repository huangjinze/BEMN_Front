# vtfStation

> 水土保持站点信息

## props

无

## data

* tableData:
  * type: Array
  * 森林生态站点所有信息的表格
* currentPage:
  * type: number
  * 现在所在页数
* pagesize:
  * type: number
  * 每页显示几条数据
* Addinfo: 
  * type: bool
  * 控制弹出框，false不显示，true显示
* Changeinfo:
  * type: bool
  * 控制弹出框，false不显示，true显示
* PermissionAdd:
  * type: bool
  * 增加站点的权限，控制页面中的按钮，false无，true有
* PerMissionAddAdmin:
  * type: bool
  * 增加管理员的权限，控制页面中的按钮，false无，true有
* PermissionChange:
  * type: bool
  * 更改站点信息的权限，控制页面中的按钮，false无，true有
* PermissionDelete:
  * type: bool
  * 删除站点的权限，控制页面中的按钮，false无，true有
* PermissionChangeAdmin:
  * type: bool
  * 更改管理员的权限，控制页面中的按钮，false无，true有
* formadd:
  * type: object
  * 添加站点信息的表单内容
* formchange:
  * type: object
  * 更改站点信息的表单内容
* info:
  * type: Array
  * 添加表格中一行数据的所有数据
* options:
  * type: Array
  * 添加可以选择的管理员
* value:
  * type: String
  * 所选管理员的id
* formRules:
  * type: Object
  * 表单的验证规则
  
## mounted
渲染页面前的操作
* tifStationInfo
  * 参数 role[0]
  * 作用 向后台查询该用户的可以管理的站点
  * 返回值 所有可以管理的站点信息
## method

* handleEdit:
  * 参数 row（行数）
  * 作用 弹出修改站点信息框，并把表格中相关数据填入框中相应位置
  * 返回值 在有管理员的情况下，返回管理员的id

* handleDelete:
  * 参数 row（行数）
  * 作用 在数据库中删除该行信息
  * 返回值 该操作是否成功
  
* confirminfo：
  * 参数 无
  * 作用 在数据库中添加新增站点
  * 返回值 该操作是否成功 
  
* changeinfo：
  * 参数 无
  * 作用 在数据库中改变站点信息
  * 返回值 该操作是否成功
