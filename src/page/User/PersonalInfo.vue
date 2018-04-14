<template>
    <BasePage>
        <div slot="main" id="info" align="center">
            <div id="picture">
                <img :src="myurl" style="width:100px;">
            </div>
            <div align="center" style="padding-top: 50px">
                <el-button @click="changeInfo" type="primary">修改信息</el-button>
                <el-button type="primary" @click="resetPassword">修改密码</el-button>
            </div>
            <el-form :label-position="labelPosition" label-width="50px" :model="formLabelAlign" v-bind:rules="formRules" style="width: 500px;padding-top: 10px">
                <el-form-item label="姓名"  prop="name">
                    <el-input v-model="formLabelAlign.name" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="formLabelAlign.email" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="手机"  prop="phone">
                    <el-input v-model="formLabelAlign.phone" :disabled="changeinfo"></el-input>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input v-model="formLabelAlign.age" :disabled="changeinfo"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-select v-model="formLabelAlign.sex" placeholder="请选择用户性别" :disabled="changeinfo">
                        <el-option label="男" value="男"></el-option>
                        <el-option label="女" value="女"></el-option>
                    </el-select>
                </el-form-item>
                <el-button @click="cancel" type="primary" v-show="changeinfo === false">取 消</el-button>
                <el-button type="primary" @click="confirm"  v-show="changeinfo === false">确 认</el-button>
            </el-form>
        </div>
    </BasePage>
</template>

<script>
  import navi from '../../components/layout/navi'
  import BasePage from '../../components/BasePage'
  import pic from '../../assets/school.jpg'
  import {mapGetters} from 'vuex'
  import {ChangePersonalInfo, Info} from '../../model/user'
  export default {
    components: {navi, BasePage},
    computed: {
      ...mapGetters({
        msg: 'GET_MSG'
      })
    },
    data () {
      return {
        labelPosition: 'right',
        myurl: pic,
        changeinfo: true,
        formLabelAlign: {
          name: '',
          email: '',
          phone: '',
          age: '',
          sex: ''
        },
        formRules: {
          name: [
            {
              message: '请输入用户名',
              trigger: 'blur'
            }
          ],
          phone: [
            {
              pattern: /^1\d{10}$/,
              message: '手机号码有误！'
            }
          ]
        }
      }
    },
    mounted: function () {
      let email = []
      email.push({
        'email': this.msg[0][0].email
      })
      Info(email[0]).then(resp => {
        if (resp.data.status === 'success') {
          this.formLabelAlign.name = resp.data.data[0][0].name
          this.formLabelAlign.email = resp.data.data[0][0].email
          this.formLabelAlign.phone = resp.data.data[0][0].phone
          this.formLabelAlign.age = resp.data.data[0][0].age
          this.formLabelAlign.sex = resp.data.data[0][0].sex
        } else {
          this.$alert('查询失败', {confirmButtonText: 'ok'})
        }
      }).catch(resp => {
        this.$alert('网络差', '失败', {confirmButtonText: 'ok'})
      })
    },
    methods: {
      changeInfo () {
        this.changeinfo = false
      },
      cancel () {
        this.changeinfo = true
      },
      confirm () {
        ChangePersonalInfo(this.formLabelAlign).then(resp => {
          if (resp.data.status === 'success') {
            this.$alert('修改成功', {confirmButtonText: 'ok'})
            document.location.reload()
          } else {
            this.$alert('修改失败', {confirmButtonText: 'ok'})
          }
        }).catch(resp => {
          this.$alert('网络差', '失败', {confirmButtonText: 'ok'})
        })
      },
      resetPassword () {
        this.$router.push({path: '/resetpassword'})
      }
    }
  }
</script>

<style scoped>
</style>
