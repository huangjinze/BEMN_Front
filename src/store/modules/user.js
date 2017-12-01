import {loginUser} from '../../model/user'

const user = {
  state: {
    name: '',
    mail: '',
    token: '',
    roles: '',
    status: ''
  },
  mutations: {
    SET_NAME: (state, name) => {
      state.name = name
    }
  },
  actions: {
    Login ({ commit, state }, form) {
      console.log('vuex login')
      loginUser(form).then(function (resp) {
        console.log('vuex log', resp.data)
        console.log(resp.data.data[0].name)
        commit('SET_NAME', resp.data.data[0].name)
      })
    },
    Logout ({ commit, state }) {
    }
  }
}

export default user
