import Vuex from 'vuex'
import user from './modules/user'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,  // process.env.NODE_ENV !== 'production',
  modules: {
    user
  },
  state: {},
  mutations: {
  }
})

export default store
