# LoginPage

> 登录页面

## props

无

## data

* loginForm:
  * type: object
  * 父组件中的登录信息
  
* codeUrl:
  * type: string
  * 刷新验证码的链接

## mounted
渲染登录页面背景的函数

## method

* onRefreshCode:
  * 参数 无
  * 作用 刷新验证码
  * 返回值 无

* onLoginClick:
  * 参数 无
  * 作用 进行登录操作，成功则跳转，失败则重新输入
  * 返回值 该登录操作是否成功
  

