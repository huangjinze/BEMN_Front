<template>
    <BasePage>
        <div slot="aside"><navi></navi></div>
        <div slot="main">
            <div>
                <el-row>
                    <el-col :span="24">
                        <div id="demo1" class="grid-content bg-purple-dark">
                            <h3 class="title" style="display:inline;padding-left: 0px;padding-right: 6px;font-weight: bold;">角色管理</h3>
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
                            :data="tableData"
                            tooltip-effect="dark"
                            stripe
                            style="width: 100%">
                        <el-table-column
                                type="index"
                                :index="indexMethod">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="名称"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="display_name"
                                label="角色名称"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="description"
                                label="角色描述">
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button
                                        size="mini"
                                        type="success"
                                        @click="showinfo(scope.$index, scope.row)">查看权限</el-button>
                                <el-button
                                        size="mini"
                                        type="primary"
                                        v-if="PermissionChange === true"
                                        v-on:click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                                <el-button
                                        size="mini"
                                        type="warning"
                                        v-if="PermissionDelete === true"
                                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <el-dialog title="角色添加" :visible.sync="Addinfo ">
                    <el-form :model="formadd" v-bind:rules="formRules" ref="form">
                        <el-form-item label="名称" :label-width="formLabelWidth"  prop="name">
                            <el-input v-model="formadd.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="角色名称" :label-width="formLabelWidth"  prop="display_name">
                            <el-input v-model="formadd.display_name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="描述" :label-width="formLabelWidth" prop="description">
                            <el-input v-model="formadd.description" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="权限" :label-width="formLabelWidth">
                            <el-checkbox-group
                                    v-model="formadd.permission"
                                    :min="1"
                                    size="mini">
                                <el-checkbox v-for="item in permissions" :label="item.value" :key="item.value" border>{{item.lable}}</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="Addinfo  = false">取 消</el-button>
                        <el-button type="primary" @click="confirminfo">确 定</el-button>
                    </div>
                </el-dialog>
                <el-dialog title="角色修改" :visible.sync="Changeinfo ">
                    <el-form :model="formchange" v-bind:rules="formRules" ref="form">
                        <el-form-item label="名称" :label-width="formLabelWidth"  prop="name">
                            <el-input v-model="formchange.name" auto-complete="off" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="角色名称" :label-width="formLabelWidth"  prop="display_name">
                            <el-input v-model="formchange.display_name" auto-complete="off" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="描述" :label-width="formLabelWidth" prop="description">
                            <el-input v-model="formchange.description" auto-complete="off" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="权限" :label-width="formLabelWidth">
                            <el-checkbox-group
                                    v-model="formchange.permission"
                                    :min="1"
                                    size="mini">
                                <el-checkbox v-for="item in permissions" :label="item.value" :key="item.value" border>{{item.lable}}</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="Changeinfo  = false">取 消</el-button>
                        <el-button type="primary" @click="changeinfo">确 定</el-button>
                    </div>
                </el-dialog>
                <el-dialog title="角色信息" :visible.sync="Showinfo ">
                    <el-form :model="forminfo" ref="form">
                        <el-form-item label="名称" :label-width="formLabelWidth"  prop="name">
                            <el-input v-model="forminfo.name" auto-complete="off" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="角色名称" :label-width="formLabelWidth"  prop="display_name">
                            <el-input v-model="forminfo.display_name" auto-complete="off" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="描述" :label-width="formLabelWidth" prop="description">
                            <el-input v-model="forminfo.description" auto-complete="off" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="权限" :label-width="formLabelWidth" prop="description">
                            <el-tag
                                    v-for="tag in tags"
                                    :key="tag.name"
                                    :type="tag.type">
                                {{tag.name}}
                            </el-tag>
                        </el-form-item>
                    </el-form>
                </el-dialog>
            </div>
        </div>
    </BasePage>
</template>

<script>
  //  import {store} from '../store/index'
  import {mapGetters} from 'vuex'
//  import store from '../../store/index'
  import navi from '../../components/layout/navi'
  import BasePage from '../../components/BasePage'
  import {RoleInfo, DeleteRole, AddRole, FindRolePermission, ChangeRole, FindRolePermissionName} from '../../model/roles'
  import {addPermission, changePermission, deletePermission} from '../../Permission/RolePermission'
  export default {
    components: {navi, BasePage},
    data () {
      return {
        PermissionAdd: false,
        PermissionChange: false,
        PermissionDelete: false,
        tableData: [],
        tags: [],
        Addinfo: false,
        Changeinfo: false,
        Showinfo: false,
        formadd: {
          name: '',
          display_name: '',
          description: '',
          permission: []
        },
        formchange: {
          name: '',
          display_name: '',
          description: '',
          permission: []
        },
        forminfo: {
          name: '',
          display_name: '',
          description: ''
        },
        permissions: [],
        info: [],
        options: [],
        value: '',
        formLabelWidth: '120px',
        formRules: {
          name: [
            {
              required: true,
              message: '请输入名称',
              trigger: 'blur'
            }
          ],
          display_name: [
            {
              required: true,
              message: '请输入角色名称',
              trigger: 'blur'
            }
          ],
          description: [
            {
              required: true,
              message: '请输入该角色描述',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    created: function () {
      if (!this.msg) {
        this.$store.commit('SET_STATUS', JSON.parse(sessionStorage.getItem('userInfo')))
      }
//      console.log('created', this.add())
    },
    mounted: function () {
//      console.log('aaa', this.msg)
//      this.add()
//      console.log('created', this.add())
//      console.log('status', this.info)
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
      RoleInfo().then(resp => {
//        console.log('roles', resp.data.data[0])
//        console.log('userinfo', resp.data.data[0].length)
        for (let i = 0; i < resp.data.data[0].length; i++) {
          this.tableData.push({
            'name': resp.data.data[0][i].name,
            'display_name': resp.data.data[0][i].display_name,
            'description': resp.data.data[0][i].description
          })
//          console.log(this.tableData)
        }
//        console.log('permission', resp.data.data[1])
        for (let i = 0; i < resp.data.data[1].length; i++) {
          this.permissions.push({
            'lable': resp.data.data[1][i].display_name,
            'value': resp.data.data[1][i].id
          })
        }
//        console.log('permission', this.permissions)
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
      count () {
        console.log(this.multipleSelection)
      },
      handleEdit (index, row) {
//        console.log(index, row)
        this.Changeinfo = true
        this.formchange.display_name = row.display_name
        this.formchange.name = row.name
        this.formchange.description = row.description
        this.formchange.permission = []
        var name = []
        name.push({
          'display_name': row.display_name
        })
        FindRolePermission(name[0]).then(resp => {
//          console.log('addinfo', resp)
          for (let i = 0; i < resp.data.data[0].length; i++) {
            this.formchange.permission.push(
              resp.data.data[0][i].permission_id
            )
          }
//          console.log(this.formchange.permission)
        }).catch(resp => {
          this.$alert('网络差', '失败', {confirmButtonText: 'ok'})
        })
      },
      showinfo (index, row) {
//        console.log(index, row)
        this.Showinfo = true
        var name = []
        name.push({
          'display_name': row.display_name
        })
        FindRolePermissionName(name[0]).then(resp => {
//          console.log('addinfo', resp)
          this.forminfo.display_name = row.display_name
          this.forminfo.name = row.name
          this.forminfo.description = row.description
          this.tags = []
          for (let i = 0; i < resp.data.data[0].length; i++) {
            this.tags.push({
              'name': resp.data.data[0][i].display_name,
              'type': 'success'
            })
          }
//          console.log(this.tags)
        }).catch(resp => {
          this.$alert('网络差', '失败', {confirmButtonText: 'ok'})
        })
      },
      handleDelete (index, row) {
//        console.log(index, row.email)
        var name = []
        name.push({
          'display_name': row.display_name
        })
        console.log(name)
        DeleteRole(name[0]).then(resp => {
//          console.log('addinfo', resp)
          if (resp.data.status === 'success') {
            alert('删除成功')
            document.location.reload()
          } else {
            alert('删除失败')
          }
        }).catch(resp => {
          this.$alert('网络差', '失败', {confirmButtonText: 'ok'})
        })
      },
      confirminfo () {
//        console.log(this.formadd)
        AddRole(this.formadd).then(resp => {
//          console.log('addinfo', resp)
          if (resp.data.status === 'success') {
            alert('添加成功')
            document.location.reload()
          } else {
            alert('添加失败')
          }
        }).catch(resp => {
          this.$alert('网络差', '失败', {confirmButtonText: 'ok'})
        })
      },
      changeinfo () {
//        console.log(this.formchange.permission)
        ChangeRole(this.formchange).then(resp => {
//          console.log('changeinfo', resp)
          if (resp.data.status === 'success') {
            this.$alert('修改成功', {confirmButtonText: 'ok'})
//            document.location.reload()
          } else {
            this.$alert('修改失败', {confirmButtonText: 'ok'})
          }
        }).catch(resp => {
          this.$alert('网络差', '失败', {confirmButtonText: 'ok'})
        })
      }
    }
  }
</script>

<style>

</style>