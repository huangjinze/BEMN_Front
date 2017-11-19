import Vue from 'vue'
import Router from 'vue-router'
import StaiscticPage from '../page/StaiscticPage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'StaiscticPage',
      component: StaiscticPage
    }
  ]
})
