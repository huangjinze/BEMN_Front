import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', // 领域计数展示功能，负责人雷答
      name: 'home',
      component: (resolve) => require(['@/page/HomePage'], resolve)
    },
    {
      path: '/vtf/staisctic', // 水土保持领域图表,负责人苏畅
      name: 'vtfstaisctic',
      component: (resolve) => require(['@/page/Static/vtfStaiscticPage.vue'], resolve)
    },
    {
      path: '/tif/staisctic', // 森林领域图表,负责人苏畅
      name: 'tifstaisctic',
      component: (resolve) => require(['@/page/Static/tifStaiscticPage.vue'], resolve)
    },
    {
      path: '/dataManager', // 森林领域样地信息 负责人陈宇捷
      name: 'dataManager',
      component: (resolve) => require(['@/page/DataPage'], resolve)
    },
    {
      path: '/vtf/list', // 通量数据数据展示 负责人陈宇捷
      name: 'vtflist',
      component: (resolve) => require(['@/page/VftListPage'], resolve)
    },
    {
      path: '/vtf/Importpage', // 水保领域导入导出页面 负责人雷答
      name: 'vtfImportpage',
      component: (resolve) => require(['@/page/ImportPage.vue'], resolve)
    },
    {
      path: '/login', //  登录界面-陆旻祎
      name: 'login',
      component: (resolve) => require(['@/page/User/LoginPage'], resolve)
    },
    {
      path: '/article', // 后台新闻管理页面 负责人陈宇捷
      name: 'article',
      component: (resolve) => require(['@/page/News/ArticlePage'], resolve)
    },
    {
      path: '/tif/forestAreaAll', // 森林领域计数展示页面 负责人雷答
      name: 'forestAreaAll',
      component: (resolve) => require(['@/page/Static/tifForestAreaAllPage.vue'], resolve)
    },
    {
      path: '/tif/water',
      name: 'water',
      component: (resolve) => require(['@/page/Static/forestDominPage.vue'], resolve)
    },
    {
      path: '/vft/dataShow', //  水保领域数据表格展示页面 负责人雷答
      name: 'dataShow',
      component: (resolve) => require(['@/page/Static/vftDataShowPage.vue'], resolve)
    },
    {
      path: '/index', //  首页-陆旻祎
      name: 'index',
      component: (resolve) => require(['@/page/Index.vue'], resolve)
    },
    {
      path: '/washing',
      name: 'DataWashingPage',
      component: (resolve) => require(['@/page/Washing/DataWashingPage.vue'], resolve)
    },
    {
      path: '/users', //  用户管理界面-陆旻祎
      name: 'users',
      component: (resolve) => require(['@/page/User/UserPage.vue'], resolve)
    },
    {
      path: '/roles', //  角色管理界面-陆旻祎
      name: 'roles',
      component: (resolve) => require(['@/page/User/RolesPage.vue'], resolve)
    },
    {
      path: '/vtfstation',  //  vtf站点信息-陆旻祎
      name: 'vtfstation',
      component: (resolve) => require(['@/page/Station/vtfStation.vue'], resolve)
    },
    {
      path: '/tifstation',  //  tif站点信息-陆旻祎
      name: 'tifstation',
      component: (resolve) => require(['@/page/Station/tifStation.vue'], resolve)
    },
    {
      path: '/deviceManage', //  设备管理页面，负责人雷答
      name: 'devicePage',
      component: (resolve) => require(['@/page/Device/devicePage'], resolve)
    },
    {
      path: '/personalinfo',  //  个人信息及修改-陆旻祎
      name: 'personalinfo',
      component: (resolve) => require(['@/page/User/PersonalInfo.vue'], resolve)
    },
    {
      path: '/resetpassword',  //  修改密码-陆旻祎
      name: 'resetpassword',
      component: (resolve) => require(['@/page/User/ResetPassword.vue'], resolve)
    },
    {
      path: '/one_chart_page',
      name: 'OneChartPage',
      component: (resolve) => require(['@/page/Static/OneChartPage.vue'], resolve)
    },
    {
      path: '/vtf/ShowStatisticsPage',
      name: 'vtfShowStaiscticPage',
      component: (resolve) => require(['@/page/Static/vtfShowStaiscticPage.vue'], resolve)
    },
    {
      path: '/vtf/ShowPaper',
      name: 'vtfShowPaper',
      component: (resolve) => require(['@/page/Static/vtfShowPaper.vue'], resolve)
    }
  ]

})
