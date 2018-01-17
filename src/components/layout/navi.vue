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
                <el-menu-item index="/washing" >
                    <i class="fa fa-refresh" aria-hidden="true"></i>
                    <span slot="title">数据清洗</span>
                </el-menu-item>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-date"></i>
                        <span>数据展示</span>
                    </template>
                    <el-submenu index="2-1" >
                        <!--<i class="fa fa-snowflake-o" aria-hidden="true"></i>-->
                        <template slot="title">
                            <i class="fa fa-tint" aria-hidden="true"></i>
                            水土保持领域
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/vft/list">
                                <i class="fa fa-table" aria-hidden="true"></i>
                                数据展示
                            </el-menu-item>
                            <el-menu-item index="2-1-2">
                                <i class="fa fa-download" aria-hidden="true"></i>
                                数据导入导出
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2-2" >
                        <!--<i class="fa fa-snowflake-o" aria-hidden="true"></i>-->
                        <template slot="title">
                            <i class="fa fa-tree" aria-hidden="true"></i>
                            森林领域
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

                <el-submenu index="3">
                    <template slot="title">
                        <i class="fa fa-area-chart" aria-hidden="true"></i>
                        <span>统计分析</span>
                    </template>
                    <el-menu-item index="3-1">
                        <i class="fa fa-tree" aria-hidden="true"></i>
                        森林领域
                    </el-menu-item>
                    <el-menu-item index="/vtf/staisctic">
                        <i class="fa fa-tint" aria-hidden="true"></i>
                        水土保持领域
                    </el-menu-item>
                </el-submenu>

                <el-submenu index="4">
                    <template slot="title">
                        <i class="fa fa-podcast" aria-hidden="true"></i>
                        <span>站点信息</span>
                    </template>
                    <el-menu-item index="4-1">
                        <i class="fa fa-tree" aria-hidden="true"></i>
                        森林领域
                    </el-menu-item>
                    <el-menu-item index="4-2">
                        <i class="fa fa-tint" aria-hidden="true"></i>
                        水土保持领域
                    </el-menu-item>
                </el-submenu>

                <el-menu-item index="5">
                    <i class="fa fa-desktop" aria-hidden="true"></i>
                    <span slot="title">设备管理</span>
                </el-menu-item>

                <el-menu-item index="6">
                    <i class="fa fa-user" aria-hidden="true"></i>
                    <span slot="title">用户管理</span>
                </el-menu-item>
            </el-menu>
        </el-row>
    </div>
</template>
<script>
    export default {
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

