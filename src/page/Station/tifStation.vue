<template>
    <BasePage>
        <div slot="aside"><navi></navi></div>
        <div slot="main">
            <div>
                <el-row>
                    <el-col :span="24">
                        <div id="demo1" class="grid-content bg-purple-dark">
                            <h3 class="title" style="display:inline;padding-left: 0px;padding-right: 6px;font-weight: bold;">森林领域</h3>
                        </div>
                    </el-col>
                </el-row>
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
                            :data="tableData"
                            border
                            style="width: 100%">
                        <el-table-column
                                fixed
                                prop="station_name"
                                label="站点名称"
                                width="150">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="管理员"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="station_coding"
                                label="监测站编码"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="regine"
                                label="地区"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="stations_longitude"
                                label="经度"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="stations_latitude"
                                label="纬度"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="elevation"
                                label="海拔"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="land_form"
                                label="地形面貌"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="soil_kind"
                                label="土壤类型"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="climatic_zone"
                                label="气候带"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="remarks"
                                label="备注"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                fixed="right"
                                label="操作"
                                width="150">
                            <template slot-scope="scope">
                                <el-button type="primary" size="small" v-if="PermissionChange === true" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                                <el-button type="warning" size="small" v-if="PermissionDelete === true" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <el-dialog title="站点信息" :visible.sync="Addinfo ">
                    <el-form :model="formadd" v-bind:rules="formRules" ref="form">
                        <el-form-item label="领域" :label-width="formLabelWidth">
                            <el-input v-model="formadd.domain" auto-complete="off" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="站点名称" :label-width="formLabelWidth"  prop="station_name">
                            <el-input v-model="formadd.station_name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="管理员" :label-width="formLabelWidth">
                            <el-select v-model="formadd.admin" placeholder="请选择">
                                <el-option label="无" value=""></el-option>
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="监测站编码" :label-width="formLabelWidth" prop="station_coding">
                            <el-input v-model="formadd.station_coding" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="地区" :label-width="formLabelWidth" prop="regine">
                            <el-input v-model="formadd.regine" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="经度" :label-width="formLabelWidth" prop="stations_longitude">
                            <el-input v-model="formadd.stations_longitude" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="纬度" :label-width="formLabelWidth" prop="stations_latitude">
                            <el-input v-model="formadd.stations_latitude" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="海拔" :label-width="formLabelWidth" prop="elevation">
                            <el-input v-model="formadd.elevation" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="地形面貌" :label-width="formLabelWidth" prop="land_form">
                            <el-input v-model="formadd.land_form" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="土壤类型" :label-width="formLabelWidth" prop="soil_kind">
                            <el-input v-model="formadd.soil_kind" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="气候带" :label-width="formLabelWidth" prop="climatic_zone">
                            <el-input v-model="formadd.climatic_zone" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="备注" :label-width="formLabelWidth" prop="remarks">
                            <el-input v-model="formadd.remarks" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="Addinfo  = false">取 消</el-button>
                        <el-button type="primary" @click="confirminfo">确 定</el-button>
                    </div>
                </el-dialog>
                <el-dialog title="站点信息" :visible.sync="Changeinfo ">
                    <el-form :model="formchange" v-bind:rules="formRules" ref="form">
                        <el-form-item label="领域" :label-width="formLabelWidth">
                            <el-input v-model="formchange.domain" auto-complete="off" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="站点名称" :label-width="formLabelWidth"  prop="station_name">
                            <el-input v-model="formchange.station_name" auto-complete="off" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="管理员" :label-width="formLabelWidth" v-show="PermissionChangeAdmin">
                            <el-select v-model="formchange.admin" placeholder="请选择">
                                <el-option label="无" value=""></el-option>
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="监测站编码" :label-width="formLabelWidth" prop="station_coding">
                            <el-input v-model="formchange.station_coding" auto-complete="off" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="地区" :label-width="formLabelWidth" prop="regine">
                            <el-input v-model="formchange.regine" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="经度" :label-width="formLabelWidth" prop="stations_longitude">
                            <el-input v-model="formchange.stations_longitude" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="纬度" :label-width="formLabelWidth" prop="stations_latitude">
                            <el-input v-model="formchange.stations_latitude" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="海拔" :label-width="formLabelWidth" prop="elevation">
                            <el-input v-model="formchange.elevation" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="地形面貌" :label-width="formLabelWidth" prop="land_form">
                            <el-input v-model="formchange.land_form" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="土壤类型" :label-width="formLabelWidth" prop="soil_kind">
                            <el-input v-model="formchange.soil_kind" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="气候带" :label-width="formLabelWidth" prop="climatic_zone">
                            <el-input v-model="formchange.climatic_zone" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="备注" :label-width="formLabelWidth" prop="remarks">
                            <el-input v-model="formchange.remarks" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="Changeinfo  = false">取 消</el-button>
                        <el-button type="primary" @click="changeinfo">确 定</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>
    </BasePage>
</template>

<script>
  //  import {store} from '../store/index'
  import {mapState, mapGetters} from 'vuex'
  import navi from '../../components/layout/navi'
  import BasePage from '../../components/BasePage'
  import {tifStationInfo, DeletetifStation, AddtifStation, ChangetifInfo, FindUserId} from '../../model/station'
  import {addStationPermission, changeStationPermission, addAdminPermission, changeAdminPermission, deleteAdminPermission, deleteStationPermission} from '../../Permission/tifStationPermission'
  export default {
    components: {navi, BasePage},
    data () {
      return {
        tableData: [],
        Addinfo: false,
        Changeinfo: false,
        PermissionAdd: false,
        PermissionChange: false,
        PermissionDelete: false,
        PermissionChangeAdmin: false,
        formadd: {
          domain: '森林领域',
          station_name: '',
          admin: '',
          station_coding: '',
          regine: '',
          stations_longitude: '',
          stations_latitude: '',
          elevation: '',
          land_form: '',
          soil_kind: '',
          climatic_zone: '',
          remarks: ''
        },
        formchange: {
          domain: '森林领域',
          station_name: '',
          admin: '',
          station_coding: '',
          regine: '',
          stations_longitude: '',
          stations_latitude: '',
          elevation: '',
          land_form: '',
          soil_kind: '',
          climatic_zone: '',
          remarks: ''
        },
        info: [],
        options: [],
        value: '',
        formLabelWidth: '120px',
        formRules: {
          station_name: [
            {
              required: true,
              message: '请输站点名称',
              trigger: 'blur'
            }
          ],
          station_coding: [
            {
              required: true,
              message: '请输入监测站编码',
              trigger: 'blur'
            }
          ],
          elevation: [
            {
              pattern: /^\d+(\.\d+)?$/,
              message: '海拔有误！'
            }
          ]
        }
      }
    },
    mounted: function () {
      if (addStationPermission(this.msg) === true) {
        this.PermissionAdd = true
      } else {
        this.PermissionAdd = false
      }
      if (changeStationPermission(this.msg) === true || addAdminPermission(this.msg) === true || changeAdminPermission(this.msg) === true || deleteAdminPermission(this.msg) === true) {
        this.PermissionChange = true
      } else {
        this.PermissionChange = false
      }
      if (deleteStationPermission(this.msg) === true) {
        this.PermissionDelete = true
      } else {
        this.PermissionDelete = false
      }
      if (addAdminPermission(this.msg) === true || changeAdminPermission(this.msg) === true || deleteAdminPermission(this.msg) === true) {
        this.PermissionChangeAdmin = true
      } else {
        this.PermissionChangeAdmin = false
      }
      tifStationInfo().then(resp => {
        console.log('tifStationInfo', resp.data.data)
//        console.log('userinfo', resp.data.data[0].length)
        for (let i = 0; i < resp.data.data[0].length; i++) {
          this.tableData.push({
            'station_name': resp.data.data[0][i].station_name,
            'name': resp.data.data[0][i].name,
            'station_coding': resp.data.data[0][i].station_coding,
            'regine': resp.data.data[0][i].regine,
            'stations_longitude': resp.data.data[0][i].stations_longitude,
            'stations_latitude': resp.data.data[0][i].stations_latitude,
            'elevation': resp.data.data[0][i].elevation,
            'land_form': resp.data.data[0][i].land_form,
            'soil_kind': resp.data.data[0][i].soil_kind,
            'climatic_zone': resp.data.data[0][i].climatic_zone,
            'remarks': resp.data.data[0][i].remarks
          })
        }
//        console.log('asd', this.tableData[1]['stations_longitude'])
        for (let i = 0; i < resp.data.data[1].length; i++) {
          this.options.push({
            'value': resp.data.data[1][i].id,
            'label': resp.data.data[1][i].name
          })
        }
      }).catch(resp => {
        this.$alert('网络差', '失败', {confirmButtonText: 'ok'})
      })
    },
    computed: {
      ...mapState([
        'status'
      ]),
      ...mapGetters({
        msg: 'GET_MSG'
      })
    },
    methods: {
      indexMethod (index) {
        return index + 1
      },
      con () {
        console.log(this.msg[0])
        console.log(this.msg[0].length)
      },
//      count () {
//        console.log(this.multipleSelection)
//      },
      handleEdit (index, row) {
//        console.log(index, row)
        this.Changeinfo = true
        this.formchange.station_name = row.station_name
        this.formchange.admin = ''
        this.formchange.station_coding = row.station_coding
        this.formchange.regine = row.regine
        this.formchange.stations_longitude = row.stations_longitude
        this.formchange.stations_latitude = row.stations_latitude
        this.formchange.elevation = row.elevation
        this.formchange.land_form = row.land_form
        this.formchange.soil_kind = row.soil_kind
        this.formchange.climatic_zone = row.climatic_zone
        this.formchange.remarks = row.remarks
        if (row.name) {
          var name = []
          name.push({
            'name': row.name
          })
//        console.log('find', name)
          FindUserId(name[0]).then(resp => {
            console.log('find', resp)
            this.formchange.admin = resp.data.data[0][0].id
          }).catch(resp => {
            this.$alert('网络差', '失败', {confirmButtonText: 'ok'})
          })
        }
      },
      handleDelete (index, row) {
//        console.log(index, row.email)
        var info = []
        info.push({
          'name': row.name,
          'station_name': row.station_name
        })
        console.log(info)
        DeletetifStation(info[0]).then(resp => {
          console.log('delinfo', resp)
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
        console.log(this.formadd)
        AddtifStation(this.formadd).then(resp => {
          console.log('addinfo', resp)
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
        console.log(this.formchange)
        ChangetifInfo(this.formchange).then(resp => {
          console.log('changeinfo', resp.data.status)
          if (resp.data.status === 'success') {
            this.$alert('修改成功', {confirmButtonText: 'ok'})
            document.location.reload()
          } else {
            this.$alert('添加失败', {confirmButtonText: 'ok'})
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