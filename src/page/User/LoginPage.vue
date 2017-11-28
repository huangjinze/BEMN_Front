<<template>

  <login v-model="loginForm" :CodeUrl="codeUrl" @refreshCode="onRefreshCode" @loginClick="onLoginClick"></login>
</template>

<<script>
  import login from '../../components/user/login.vue'
  import {mapActions} from 'vuex'

  export default {
    name: 'LoginPage',
    components: {login},
    data () {
      return {
        loginForm: {
        },
        codeUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1512470460&di=66d2f289cb3b77b41dc97e91842da2d4&imgtype=jpg&er=1&src=http%3A%2F%2Fwenwen.soso.com%2Fp%2F20101026%2F20101026151436-1771937959.jpg'
      }
    },
    methods: {
      onRefreshCode () {
        console.log('refresh code')
      },
      onLoginClick () {
        console.log('on login')
        this.LoginUser()
      },
      ...mapActions({LoginUser: 'Login'})
    }
  }
</script>

<style scoped>

</style>
