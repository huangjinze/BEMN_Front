
<template>
  <div id="navi">
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
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-date"></i>
            <span>数据展示</span>
          </template>
          <el-submenu index="2-1" >
            <!--<i class="fa fa-snowflake-o" aria-hidden="true"></i>-->
            <template slot="title">水土保持领域</template>
            <el-menu-item-group>
                <el-menu-item index="/vtf/staisctic">数据展示</el-menu-item>
                <el-menu-item index="/dataManager">数据导入导出</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title">
            <i class="fa fa-area-chart" aria-hidden="true"></i>
            <span>统计分析</span>
          </template>
          <el-submenu index="3-1">
            <!--<i class="fa fa-snowflake-o" aria-hidden="true"></i>-->
            <template slot="title">水土保持领域</template>
            <el-menu-item-group>
              <el-menu-item index="3-1-1">数据展示</el-menu-item>
              <el-menu-item index="3-1-2">数据导入导出</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-submenu>

        <el-submenu index="4">
          <template slot="title">
            <i class="fa fa-podcast" aria-hidden="true"></i>
            <span>站点信息</span>
          </template>
          <el-submenu index="4-1">
            <template slot="title">
              <!--<i class="fa fa-snowflake-o" aria-hidden="true"></i>-->
              水土保持领域
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1-1">数据展示</el-menu-item>
              <el-menu-item index="4-1-2">数据导入导出</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-submenu>
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
</style>

