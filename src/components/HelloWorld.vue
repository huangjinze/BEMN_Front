
<template>
  <div id="app">
    <el-row class="tac">
  <el-col :span="12">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-menu-item index="1">
        
        <i class="el-icon-location"></i>
        <span slot="title">综合信息</span>
      </el-menu-item>

      <el-submenu index="2">
        <template slot="title">
        <i class="el-icon-document"></i>
        <span>数据展示</span>
        </template>
        <el-submenu index="2-1">
          <template slot="title">水土保持领域</template>
          <el-menu-item-group>
          <router-link :to="'/home'">
          <el-menu-item index="2-1-1">数据展示</el-menu-item>
          </router-link>
          <router-link :to="'/home1'">
          <el-menu-item index="2-1-2">数据导入导出</el-menu-item>
          </router-link>
          </el-menu-item-group>
        </el-submenu>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title">
        <i class="el-icon-document"></i>
        <span>统计分析</span>
        </template>
        <el-submenu index="3-1">
          <template slot="title">水土保持领域</template>
          <el-menu-item-group>
          <el-menu-item index="3-1-1">数据展示</el-menu-item>
          <el-menu-item index="3-1-2">数据导入导出</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-submenu>

      <el-submenu index="4">
        <template slot="title">
        <i class="el-icon-document"></i>
        <span>站点信息</span>
        </template>
        <el-submenu index="4-1">
          <template slot="title">水土保持领域</template>
          <el-menu-item-group>
          <el-menu-item index="4-1-1">数据展示</el-menu-item>
          <el-menu-item index="4-1-2">数据导入导出</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </el-col>
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
@import url("//unpkg.com/element-ui@2.0.5/lib/theme-chalk/index.css");
</style>

