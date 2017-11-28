
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
    Login ({ commit, state }) {
      console.log('vuex login')
    },
    Logout ({ commit, state }) {
    }
  }
}

export default user
