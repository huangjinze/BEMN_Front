<template>
    <BasePage>
        <div slot="main">
            <div>
                <el-row>
                    <el-col :span="24">
                        <div id="demo1" class="grid-content bg-purple-dark">
                            <h3 class="title" style="display:inline;padding-left: 0px;padding-right: 6px;font-weight: bold;">用户管理</h3>
                        </div>
                    </el-col>
                </el-row>
                <hr>
            </div>
            <!--按钮-->
            <div class="button" style="margin-right: 15px; float:right;">
                <el-button type="primary" v-on:click="Addinfo = true" v-if="PermissionAdd === true">添加</el-button>
                <!--<el-button type="primary" v-on:click="DeleteInfo">删除</el-button>-->
                <!--<el-button type="primary" v-on:click="ResetPwd">重置密码</el-button>-->
            </div>
            <!--绘制表格-->
            <div class="portlet-body">
                <div class="table-scrollable" style="">
                    <el-table
                            ref="multipleTable"
                            :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                            tooltip-effect="dark"
                            stripe
                            style="width: 100%">
                        <el-table-column
                                type="index"
                                :index="indexMethod">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="姓名"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="phone"
                                label="手机号">
                        </el-table-column>
                        <el-table-column
                                prop="email"
                                label="邮箱">
                        </el-table-column>
                        <el-table-column
                                prop="sex"
                                label="性别">
                        </el-table-column>
                        <el-table-column
                                prop="age"
                                label="年龄">
                        </el-table-column>
                        <el-table-column
                                prop="role"
                                label="角色">
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button
                                        size="mini"
                                        v-if="PermissionChange === true"
                                        v-on:click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                                <el-button
                                        size="mini"
                                        type="danger"
                                        v-if="PermissionDelete === true"
                                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                                <!--<el-button-->
                                        <!--size="mini"-->
                                        <!--@click="handleRole(scope.$index, scope.row)">分配角色</el-button>-->
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <el-dialog title="用户信息" :visible.sync="Addinfo ">
                    <el-form :model="formadd" v-bind:rules="formRules" ref="form">
                        <el-form-item label="姓名" :label-width="formLabelWidth"  prop="name">
                            <el-input v-model="formadd.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
                            <el-input v-model="formadd.phone" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="年龄" :label-width="formLabelWidth">
                            <el-input v-model="formadd.age" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
                            <el-input v-model="formadd.email" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="性别" :label-width="formLabelWidth">
                            <el-select v-model="formadd.sex" placeholder="请选择用户性别">
                                <el-option label="男" value="男"></el-option>
                                <el-option label="女" value="女"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="角色" :label-width="formLabelWidth">
                            <el-select v-model="formadd.roles" placeholder="请选择用戶角色">
                                <el-option label="无" value=""></el-option>
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                            <p style="color: red">带星号的为必填项</p>
                            <p style="color: red">新增用户默认密码为“123456”，请及时修改密码！</p>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="Addinfo  = false">取 消</el-button>
                        <el-button type="primary" @click="confirminfo">确 定</el-button>
                    </div>
                </el-dialog>
                <el-dialog title="用户信息" :visible.sync="Changeinfo ">
                    <el-form :model="formchange" ref="form" v-bind:rules="formRules">
                        <el-form-item label="姓名" :label-width="formLabelWidth"  prop="name">
                            <el-input v-model="formchange.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
                            <el-input v-model="formchange.phone" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="年龄" :label-width="formLabelWidth">
                            <el-input v-model="formchange.age" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
                            <el-input v-model="formchange.email" auto-complete="off" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="性别" :label-width="formLabelWidth">
                            <el-select v-model="formchange.sex" placeholder="请选择用户性别">
                                <el-option label="男" value="男"></el-option>
                                <el-option label="女" value="女"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="角色" :label-width="formLabelWidth">
                            <el-select v-model="formchange.roles" placeholder="请选择用戶角色">
                                <el-option label="无" value=""></el-option>
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                            <p style="color: red">带星号的为必填项</p>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="Changeinfo  = false">取 消</el-button>
                        <el-button type="primary" @click="changeinfo">确 定</el-button>
                    </div>
                </el-dialog>
            </div>
            <el-pagination
                    align="center"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[5, 10, 20, 50, 100]"
                    :page-size="pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="tableData.length">
            </el-pagination>
        </div>
    </BasePage>
</template>

<script>
  import {mapGetters} from 'vuex'
  import navi from '../../components/layout/navi'
  import BasePage from '../../components/BasePage'
  import {UserInfo, AddUser, DeleteUser, FindRoleId, ChangeUser} from '../../model/user'
  import {addPermission, changePermission, deletePermission} from '../../Permission/UserPermission'
  export default {
    components: {navi, BasePage},
    data () {
      return {
        tableData: [],
        currentPage: 1,
        pagesize: 5,
        Addinfo: false,
        Changeinfo: false,
        PermissionAdd: false,
        PermissionChange: false,
        PermissionDelete: false,
        formadd: {
          name: '',
          phone: '',
          age: '',
          sex: '男',
          email: '',
          password: '',
          roles: ''
        },
        formchange: {
          name: '',
          phone: '',
          age: '',
          sex: '',
          email: '',
          password: '',
          roles: ''
        },
        info: [],
        options: [],
        value: '',
        formLabelWidth: '120px',
        formRules: {
          name: [
            {
              required: true,
              message: '请输入用户名',
              trigger: 'blur'
            }
          ],
          phone: [
            {
              required: true,
              message: '请输入手机号码',
              trigger: 'blur'
            },
            {
              pattern: /^1\d{10}$/,
              message: '手机号码有误！'
            }
          ],
          email: [
            {
              required: true,
              message: '请输入邮箱地址',
              trigger: 'blur'
            },
            {
              pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
              message: '邮箱地址有误有误！'
            }
          ]
        }
      }
    },
    mounted: function () {
      if (addPermission(this.msg) === true) {
        this.PermissionAdd = true
      } else {
        this.PermissionAdd = false
      }
      if (changePermission(this.msg) === true) {
        this.PermissionChange = true
      } else {
        this.PermissionChange = false
      }
      if (deletePermission(this.msg) === true) {
        this.PermissionDelete = true
      } else {
        this.PermissionDelete = false
      }
      UserInfo().then(resp => {
        for (let i = 0; i < resp.data.data[0].length; i++) {
          this.tableData.push({
            'name': resp.data.data[0][i].name,
            'phone': resp.data.data[0][i].phone,
            'email': resp.data.data[0][i].email,
            'sex': resp.data.data[0][i].sex,
            'age': resp.data.data[0][i].age,
            'role': resp.data.data[0][i].display_name
          })
        }
        for (let i = 0; i < resp.data.data[1].length; i++) {
          this.options.push({
            'value': resp.data.data[1][i].id,
            'label': resp.data.data[1][i].display_name
          })
        }
      }).catch(resp => {
        this.$alert('网络差', '失败', {confirmButtonText: 'ok'})
      })
    },
    computed: {
      ...mapGetters({
        msg: 'GET_MSG'
      })
    },
    methods: {
      indexMethod (index) {
        return index + 1
      },
      handleEdit (index, row) {
        this.Changeinfo = true
        this.formchange.name = row.name
        this.formchange.email = row.email
        this.formchange.phone = row.phone
        this.formchange.sex = row.sex
        this.formchange.age = row.age
        this.formchange.roles = ''
        if (row.role) {
          var role = []
          role.push({
            'name': row.role
          })
          FindRoleId(role[0]).then(resp => {
            this.formchange.roles = resp.data.data[0][0].id
          }).catch(resp => {
            this.$alert('网络差', '失败', {confirmButtonText: 'ok'})
          })
        }
      },
      handleDelete (index, row) {
        var email = []
        email.push({
          'email': row.email
        })
        DeleteUser(email[0]).then(resp => {
          if (resp.data.status === 'success') {
            this.$alert('删除成功', {confirmButtonText: 'ok'})
            document.location.reload()
          } else {
            alert('删除失败')
          }
        }).catch(resp => {
          this.$alert('网络差', '失败', {confirmButtonText: 'ok'})
        })
      },
      confirminfo () {
        AddUser(this.formadd).then(resp => {
          if (resp.data.status === 'success') {
            this.$alert('添加成功', {confirmButtonText: 'ok'})
            document.location.reload()
          } else {
            this.$alert('添加失败', {confirmButtonText: 'ok'})
          }
        }).catch(resp => {
          this.$alert('网络差', '失败', {confirmButtonText: 'ok'})
        })
      },
      changeinfo () {
        ChangeUser(this.formchange).then(resp => {
          if (resp.data.status === 'success') {
            this.$alert('修改成功', {confirmButtonText: 'ok'})
            document.location.reload()
          } else {
            this.$alert('添加失败', {confirmButtonText: 'ok'})
          }
        }).catch(resp => {
          this.$alert('网络差', '失败', {confirmButtonText: 'ok'})
        })
      },
      handleSizeChange: function (size) {
        this.pagesize = size
      },
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage
      }
    }
  }
</script>

<style>

</style>
