<template>
    <BasePage>
        <div slot="aside"><navi></navi></div>
        <div slot="main" id="info" align="center">
            <div id="picture">
                <img :src="myurl" style="width:100px;">
            </div>
            <el-form :label-position="labelPosition" :model="formLabelAlign" v-bind:rules="formRules" style="width: 500px;padding-top: 10px">
                <el-form-item label="邮箱" v-show="false">
                    <el-input v-model="formLabelAlign.email"></el-input>
                </el-form-item>
                <el-form-item label="原密码"  prop="oldpwd">
                    <el-input v-model="formLabelAlign.oldpwd" type="password"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newpwd">
                    <el-input v-model="formLabelAlign.newpwd" type="password"></el-input>
                </el-form-item>
                <el-form-item label="确  认"  prop="confirmpwd">
                    <el-input v-model="formLabelAlign.confirmpwd" type="password"></el-input>
                </el-form-item>
                <el-button @click="back" type="primary">返 回</el-button>
                <el-button type="primary" @click="confirm">确 认</el-button>
            </el-form>
        </div>
    </BasePage>
</template>

<script>
  import navi from '../../components/layout/navi'
  import BasePage from '../../components/BasePage'
  import pic from '../../assets/school.jpg'
  import {mapGetters} from 'vuex'
  import {ResetPwd} from '../../model/user'
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
          email: '',
          oldpwd: '',
          newpwd: '',
          confirmpwd: ''
        },
        formRules: {
          oldpwd: [
            {
              required: true,
              message: '请输入原密码',
              trigger: 'blur'
            }
          ],
          newpwd: [
            {
              required: true,
              message: '请输入新密码',
              trigger: 'blur'
            }
          ],
          confirmpwd: [
            {
              required: true,
              message: '请输入确认密码',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    mounted: function () {
      this.formLabelAlign.email = this.msg[0][0].email
    },
    methods: {
      back () {
        this.$router.push({path: '/personalinfo'})
      },
      confirm () {
        this.formLabelAlign.email = this.msg[0][0].email
        if (this.formLabelAlign.newpwd === this.formLabelAlign.confirmpwd) {
          ResetPwd(this.formLabelAlign).then(resp => {
            if (resp.data.status === 'success') {
              this.$alert('修改成功', {confirmButtonText: 'ok'})
            } else if (resp.data.status === 'fail') {
              this.$alert(resp.data.reason, {confirmButtonText: 'ok'})
            }
          }).catch(resp => {
            this.$alert('网络差', '失败', {confirmButtonText: 'ok'})
          })
        } else {
          this.$alert('两次新密码不一样', {confirmButtonText: 'ok'})
        }
      }
    }
  }
</script>

<style scoped>
</style>