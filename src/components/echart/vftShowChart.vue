/*

*/
<template>
  <el-row id="form">
    <el-form v-model="form">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="7">
        <el-form-item v-if="form.type !== 'compare'">
          <div class="block">
            <span class="demonstration">时间范围</span>
            <el-date-picker
                    v-model="timeRange"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd">
            </el-date-picker>
          </div>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="8">
        <el-form-item>
          <span class="demonstration">选择指标</span>
          <el-cascader
                  placeholder="输入指标"
                  :options="indexesOptions"
                  v-model="selectedIndex"
                  filterable
          ></el-cascader>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="8">
        <el-form-item>
          <span class="demonstration">展示方法</span>
          <el-select v-model="form.type" placeholder="请选择">
            <el-option
                    v-for="item in showTypeOptions"
                    :key="item.value + 'show'"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-form>
  </el-row>
</template>

<script>
  export default {
    components: {},
    name: 'vftShowChart',
    props: {
      indexesOptions: Array,
      input: Object
    },
    data () {
      return {
        showTypeOptions: [{
          value: 'scatter',
          label: '散点图'
        }, {
          value: 'line',
          label: '折线图'
        }],
        selectedIndex: '',
        timeRange: [],
        form: {
          index: '',
          type: '',
          startTime: '',
          endTime: ''
        }
      }
    },
    watch: {
      selectedIndex: {
        handler: function (val) {
          this.form.index = val[val.length - 1]
        },
        deep: true
      },
      timeRange: {
        handler: function (val) {
          this.form.startTime = val[0]
          this.form.endTime = val[1]
        },
        deep: true
      },
      form: {
        handler: function (val) {
          this.$emit('input', val)
        },
        deep: true
      }
    }
  }
</script>
<style scoped>
  #chart_container {
    height: 500px;
  }
  .optionCenter{
    text-align: center;
  }
  #form{
    margin-top: 20px;
    text-align: center;
  }
</style>

