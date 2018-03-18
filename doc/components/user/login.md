# login 

> 登录表单

## props

* indexesOptions:
   * type: Array
   * 内容 指标下拉框中的指标
* CodeUrl: 
   * type: String,
   * 内容 验证码
* refreshCode: 
   * type: Function,
   * 内容 刷新验证码函数
* loginClick: 
   * type: Function
   * 内容 登录函数


## data

* form:
  * type: Object
  * 登录所要填的信息
 

## method

* onClick:
  * 参数 无
  * 作用 向父组件传递表单的值，并触发登录函数
  * 返回值 无

* onRefresh:
  * 参数 无
  * 作用 触发父组件刷新验证码的函数
  * 返回值 无
