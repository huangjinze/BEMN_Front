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
        codeUrl: 'http://172.19.32.116/captcha/mews?r=' + Math.random()
      }
    },
    methods: {
      onRefreshCode () {
        console.log('refresh code')
        this.codeUrl = 'http://172.19.32.116/captcha/mews?r=' + Math.random()
      },
      onLoginClick () {
        console.log('on login')
        this.LoginUser(this.loginForm)
      },
      ...mapActions({LoginUser: 'Login'})
    }
  }
</script>

<style scoped>

</style>
