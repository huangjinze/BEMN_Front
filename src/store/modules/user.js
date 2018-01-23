import {loginUser} from '../../model/user'

const user = {
  state: {
    name: '',
    mail: '',
    token: '',
    roles: '0',
    status: ''
  },
  mutations: {
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_STATUS: (state, status) => {
      console.log('e2')
      state.status = status
    }
  },
  actions: {
    Login ({ commit, state }, form) {
      console.log('vuex login')
      return loginUser(form).then(function (resp) {
        console.log('vuex log', resp.data.data[0])
        // console.log(resp.data.status)
        window.sessionStorage.clear()
        sessionStorage.setItem('userInfo', JSON.stringify(resp.data.data))
        // console.log('qwe', localStorage.getItem('userInfo'))
        if (resp.data.status === 'failed' && resp.data.reason === 'captcha error!') {
          alert('验证码错误')
          document.location.reload()
        } else if (resp.data.status === 'failed' && resp.data.reason === 'username/password error！') {
          alert('用户名或密码错误')
          document.location.reload()
        } else if (resp.data.status === 'success') {
          alert('登录成功')
          commit('SET_NAME', resp.data.data[0].name)
          return resp.data
        }
        commit('SET_STATUS', resp.data.data)
      })
    },
    Logout ({ commit, state }) {
    }
  },
  getters: {
    'GET_MSG': function (state) {
      // console.log('获取', state.status)
      return state.status
    }
  }
}

export default user
