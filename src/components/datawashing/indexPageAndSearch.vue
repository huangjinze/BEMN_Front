<template>

  <div class="index-page-and-search">
    <div class="search">
      <el-input v-model="search" placeholder="输入搜索..."></el-input>
    </div>
    <div class="indexes-content">
      <el-form>
        <el-form-item v-for="(item,index) in show_indexes.slice((current_page-1)*page_size, current_page*page_size )" :key="index">
      <span>{{ item.name }}:
        <el-input-number v-model="item.low"></el-input-number> -
        <el-input-number v-model="item.high"></el-input-number> </span>
        </el-form-item>
      </el-form>
    </div>

    <div class="pagenation">
      <span class="demonstration">页数较少时的效果</span>
      <el-pagination
        layout="prev, pager, next"
        :total="indexes.length"
        :current-page="current_page"
        :page-size="page_size"
        @current-change="onCurrentPageChange"
      >
      </el-pagination>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'index-page-and-search',
    props: {
      indexes: {type: Array},
      search: ''
    },
    data () {
      return {
        current_page: 1,
        page_size: 10,
        show_indexes: this.indexes.slice((this.current_page - 1) *
          this.page_size, this.current_page * this.page_size)
      }
    },
    watch: {
      search: function (newSearch) {

        },
    methods: {
      onCurrentPageChange (currentPage) {
        this.show_indexes = this.indexes.filter((item) => {
          return item.isShow === true
        })
      }
    }
  }
</script>

<style scoped>

</style>
