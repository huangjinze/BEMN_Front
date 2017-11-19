import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import route1 from '@/components/route1'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/home',
      name: 'home',
      component: route1
    },
    {
      path: '/home1',
      name: 'home1',
      component: HelloWorld
    }
  ]

})
