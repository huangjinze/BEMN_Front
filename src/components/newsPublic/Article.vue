<template>
    <div id="articles">
        <el-row type="flex" justify="space-between" v-if="flage=='true'">
            <el-col :span="4">
                <div class="title">
                  <h3>新闻分类</h3>
                </div>
                  <div class="type-bg" v-for="leftItem in leftItems" :key="leftItem.value">
                      <a :href="leftItem.linkto">{{leftItem.label}}</a>
                  </div>
            </el-col>
            <el-col :span="19" style="padding-top: 20px;border-bottom: 1px solid #D8DCE5;">
              <el-row type="flex" justify="space-between">
                <el-col class="addnew-header">
                  <span class="addnew">新闻</span><a @click="edit" style="cursor:pointer;" class="el-icon-circle-plus-outline"></a>
                </el-col>
                <el-col>
                  <el-button type="primary" class="bnt-tag" v-for="rightBnt in rightBnts" :key="rightBnt.value">
                    {{rightBnt.bnt}}
                  </el-button>
                </el-col>
              </el-row>
              <el-row class="new-row" v-for="index in news" :key="index.no">
                <el-col :span="20" class="new-title">{{index.titile}}</el-col>
                <span style="float:right;">
                  <el-button type="danger" icon="el-icon-delete" @click="deleteNew">
                  </el-button>
                  <el-button type="success" icon="el-icon-edit">
                  </el-button>
                </span>
              </el-row>
            </el-col>
        </el-row>
        <div id="edit" v-else>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <vue-editor v-model="content"></vue-editor>
        </div>
    </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
export default {
  components: {
    VueEditor
  },
  data () {
    return {
      flage: 'true'
    }
  },
  props: {
    leftItems: {type: Array, default: []},
    rightBnts: {type: Array, default: []},
    news: {type: Array, default: []},
    options: {type: Array, default: []}
  },
  methods: {
    deleteNew () {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    edit () {
      this.flage = 'flase'
    }
  }
}
</script>
<style scoped>
  a{
    text-decoration-line: inherit;
  }
  .addnew-header{
    font-size: 20px;
    padding-top: 5px;
  }
  .addnew{
    color: #6484b3;
    margin-right: 5px;
  }
  .bnt-tag{
    margin-left: 5px;
    float: right;
    background-color: #6484b3;
  }
  .new-row{
    border-top: 1px solid #D8DCE5;
    padding: 3px 0 3px 0;
    margin-top: 5px;
  }
  .new-title{
    float: left;
    font-size: 25px;
    padding-left: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
    .title{
        background-color: #6484b3;
        color: #fff;
        text-align: center;
        height: 40px;
        line-height: 40px;
    }
    .type-bg{
        background-color: #f9fafc;
        padding-left: 15px;
        height: 35px;
        line-height: 35px;
    }
</style>


