<template>
    <div id="">
        <el-row class="tac">
            <el-menu default-active="2"
                     class="el-menu-vertical-demo"
                     @open="handleOpen"
                     @close="handleClose"
                     :default-active="$route.path"
                     light router>
                <el-menu-item index="/" >
                    <i class="el-icon-menu"></i>
                    <span slot="title">综合信息</span>
                </el-menu-item>
                <el-menu-item index="/washing" v-if="Data === true">
                    <i class="fa fa-refresh" aria-hidden="true"></i>
                    <span slot="title">Data QAQC</span>
                </el-menu-item>
                <el-submenu index="2" v-if="Data === true">
                    <template slot="title">
                        <i class="el-icon-date"></i>
                        <span>数据展示</span>
                    </template>
                    <el-submenu index="2-1" >
                        <!--<i class="fa fa-snowflake-o" aria-hidden="true"></i>-->
                        <template slot="title">
                            <i class="fa fa-tint" aria-hidden="true"></i>
                            通量数据
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/vft/dataShow">
                                <i class="fa fa-table" aria-hidden="true"></i>
                                数据展示
                            </el-menu-item>
                            <el-menu-item index="/vtf/Importpage">
                                <i class="fa fa-download" aria-hidden="true"></i>
                                数据导入导出
                            </el-menu-item>
                          <el-menu-item index="/vtf/ShowStatisticsPage">
                            <i class="fa fa-area-chart" aria-hidden="true"></i>
                            数据展示图表
                          </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2-2" >
                        <!--<i class="fa fa-snowflake-o" aria-hidden="true"></i>-->
                        <template slot="title">
                            <i class="fa fa-tree" aria-hidden="true"></i>
                            森林生态
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/tif/water"><i class="fa fa-tint" aria-hidden="true"></i>水文</el-menu-item>
                            <el-menu-item index="2-2-2"><i class="fa fa-globe" aria-hidden="true"></i>土壤</el-menu-item>
                            <el-menu-item index="2-2-3"><i class="fa fa-leaf" aria-hidden="true"></i>生物</el-menu-item>
                            <el-menu-item index="2-2-4"><i class="fa fa-cloud" aria-hidden="true"></i>气象</el-menu-item>
                            <el-menu-item index="/dataManager"><i class="fa fa-th-large" aria-hidden="true"></i>样地信息</el-menu-item>
                            <el-menu-item index="2-2-6"><i class="fa fa-pagelines" aria-hidden="true"></i>森林健康</el-menu-item>
                            <el-menu-item index="2-2-7"><i class="fa fa-stumbleupon" aria-hidden="true"></i>径流场信息</el-menu-item>
                            <el-menu-item index="2-2-8"><i class="fa fa-font-awesome" aria-hidden="true"></i>测流堰信息</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-submenu>

                <el-submenu index="3" v-if="Data === true">
                    <template slot="title">
                        <i class="fa fa-area-chart" aria-hidden="true"></i>
                        <span>统计分析</span>
                    </template>
                    <el-menu-item index="3-1">
                        <i class="fa fa-tree" aria-hidden="true"></i>
                        森林生态
                    </el-menu-item>
                    <el-menu-item index="/vtf/staisctic">
                        <i class="fa fa-tint" aria-hidden="true"></i>
                        通量数据
                    </el-menu-item>
                </el-submenu>

                <el-submenu index="4" v-if="StationTower === true">
                    <template slot="title">
                        <i class="fa fa-podcast" aria-hidden="true"></i>
                        <span>站点信息</span>
                    </template>
                    <el-menu-item index="/tifstation" v-if="Station === true">
                        <i class="fa fa-tree" aria-hidden="true"></i>
                        森林生态
                    </el-menu-item>
                    <el-menu-item index="/vtfstation" v-if="Tower === true">
                        <i class="fa fa-tint" aria-hidden="true"></i>
                        通量数据
                    </el-menu-item>
                </el-submenu>

                <el-menu-item index="/deviceManage">
                    <i class="fa fa-desktop" aria-hidden="true"></i>
                    <span slot="title">设备管理</span>
                </el-menu-item>

                <el-submenu index="6" v-if="UserRole === true">
                    <template slot="title">
                        <i class="fa fa-cog fa-fw" aria-hidden="true"></i>
                        <span>后台管理</span>
                    </template>
                    <el-menu-item index="/users" v-if="User === true">
                        <i class="fa fa-user" aria-hidden="true"></i>
                        用户管理
                    </el-menu-item>
                    <el-menu-item index="/roles" v-if="Role === true">
                        <i class="fa fa-user-plus" aria-hidden="true"></i>
                        角色管理
                    </el-menu-item>
                </el-submenu>
                <el-menu-item index="/article" v-if="Text === true">
                    <i class="fa fa-file-word-o" aria-hidden="true"></i>
                    <span slot="title">文章管理</span>
                </el-menu-item>
            </el-menu>
        </el-row>
    </div>
</template>
<script>
  import {mapState, mapGetters} from 'vuex'
  import {userListPermission, userCreatePermission, userEditPermission, userDeletePermission,
    roleListPermission, roleCreatePermission, roleEditPermission, roleDeletePermission,
    stationAddUserPermission, stationDeleteUserPermission, stationShowUserPermission, stationChangeUserPermission,
    stationAddPermission, stationDeletePermission, stationShowPermission, stationChangePermission,
    towerAddUserPermission, towerDeleteUserPermission, towerShowUserPermission, towerChangeUserPermission,
    towerAddPermission, towerDeletePermission, towerShowPermission, towerChangePermission,
    textAddPermission, textDeletePermission, textShowPermission, textOperationPermission,
    dataAddPermission, dataDeletePermission, dataShowPermission, dataOperationPermission} from '../../Permission/NaviPermission'
  export default {
    data () {
      return {
        UserRole: false,
        User: false,
        Role: false,
        StationTower: false,
        Station: false,
        Tower: false,
        Text: false,
        Data: false
      }
    },
    computed: {
      ...mapState([
        'status'
      ]),
      ...mapGetters({
        msg: 'GET_MSG'
      })
    },
    created: function () {
//      this.$store.commit('SET_STATUS', JSON.parse(sessionStorage.getItem('userInfo')))
    },
    mounted: function () {
//      console.log(this.msg)
      if (userListPermission(this.msg) === true || userCreatePermission(this.msg) === true ||
        userEditPermission(this.msg) === true || userDeletePermission(this.msg) === true ||
        roleListPermission(this.msg) === true || roleCreatePermission(this.msg) === true ||
        roleEditPermission(this.msg) === true || roleDeletePermission(this.msg) === true) {
        this.UserRole = true
      } else {
        this.UserRole = false
      }
      if (userListPermission(this.msg) === true || userCreatePermission(this.msg) === true ||
        userEditPermission(this.msg) === true || userDeletePermission(this.msg) === true) {
        this.User = true
      } else {
        this.User = false
      }
      if (roleListPermission(this.msg) === true || roleCreatePermission(this.msg) === true ||
        roleEditPermission(this.msg) === true || roleDeletePermission(this.msg) === true) {
        this.Role = true
      } else {
        this.Role = false
      }
      if (stationAddUserPermission(this.msg) === true || stationDeleteUserPermission(this.msg) === true ||
        stationShowUserPermission(this.msg) === true || stationChangeUserPermission(this.msg) === true ||
        stationAddPermission(this.msg) === true || stationDeletePermission(this.msg) === true ||
        stationShowPermission(this.msg) === true || stationChangePermission(this.msg) === true ||
        towerAddUserPermission(this.msg) === true || towerDeleteUserPermission(this.msg) === true ||
        towerShowUserPermission(this.msg) === true || towerChangeUserPermission(this.msg) === true ||
        towerAddPermission(this.msg) === true || towerDeletePermission(this.msg) === true ||
        towerShowPermission(this.msg) === true || towerChangePermission(this.msg) === true) {
        this.StationTower = true
      } else {
        this.StationTower = false
      }
      if (stationAddUserPermission(this.msg) === true || stationDeleteUserPermission(this.msg) === true ||
        stationShowUserPermission(this.msg) === true || stationChangeUserPermission(this.msg) === true ||
        stationAddPermission(this.msg) === true || stationDeletePermission(this.msg) === true ||
        stationShowPermission(this.msg) === true || stationChangePermission(this.msg) === true) {
        this.Station = true
      } else {
        this.Station = false
      }
      if (towerAddUserPermission(this.msg) === true || towerDeleteUserPermission(this.msg) === true ||
        towerShowUserPermission(this.msg) === true || towerChangeUserPermission(this.msg) === true ||
        towerAddPermission(this.msg) === true || towerDeletePermission(this.msg) === true ||
        towerShowPermission(this.msg) === true || towerChangePermission(this.msg) === true) {
        this.Tower = true
      } else {
        this.Tower = false
      }
      if (textAddPermission(this.msg) === true || textDeletePermission(this.msg) === true ||
        textShowPermission(this.msg) === true || textOperationPermission(this.msg) === true) {
        this.Text = true
      } else {
        this.Text = false
      }
      if (dataAddPermission(this.msg) === true || dataDeletePermission(this.msg) === true ||
        dataShowPermission(this.msg) === true || dataOperationPermission(this.msg) === true) {
        this.Data = true
      } else {
        this.Data = false
      }
    },
    methods: {
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      }
    }
}
</script>
<style scoped>
    .router-link-active,.el-menu-item,a{
        text-decoration: none;
    }
    .show{
        display: block;
    }
    .fa{
        margin: 0 5px;
    }
</style>

