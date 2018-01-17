<!-- 该组件为:多指标选择的标签页，标签页内为表格-->
<template>
    <div :class="className" :id="id">
        <el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick" id="tabs">
            <el-tab-pane
                    v-for="(value, index) in indices"
                    :key="value.text"
                    :label="value.text">
                <el-button
                        :span="4"
                        class="link"
                        @click="selectIndex(value.id)"
                        v-for="(value, index) in indexTags"
                        :key="value.text">
                    {{value.text}}
                </el-button>
            </el-tab-pane>
        </el-tabs>
    </div>

</template>

<script>
    export default {
      components: {
      },
      data () {
        return {

        }
      },
      props: {
        indices: {
          type: Array,
          required: true
        },
        indexTags: {
          type: Array,
          required: true
        }
      },
      mounted: function () {
        this.$nextTick(function () {
        })
      },
      methods: {
        handleClick (tab) {
          let id = tab['_data']['index']
          this.$emit('ClickIndexClass', id)
        },
        selectIndex (id) {
          this.$emit('ClickIndex', id)
        }
      },
      name: 'indexSelect'
    }
</script>
<style scoped>
    .el-button{
        font-size: 16px;
    }
    #tabs{
        margin-top: 50px;
    }
    .link{
        margin-bottom: 10px;
    }
</style>

