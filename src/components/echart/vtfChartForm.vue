/*

*/
<template>
  <div>
    <el-form v-model="form">
      <el-form-item>
        <span class="demonstration">选择指标</span>
        <el-cascader
          placeholder="输入指标"
          :options="indexesOptions"
          v-model="selectedIndex"
          filterable
        ></el-cascader>
      </el-form-item>

      <el-form-item>
        <span class="demonstration">选择展示方法</span>
        <el-select v-model="form.type" placeholder="请选择">
          <el-option
            v-for="item in showTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <div class="block">
          <span class="demonstration">选择时间范围</span>
          <el-date-picker
            v-model="timeRange"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </el-form-item>

      <el-form-item>
        <span class="demonstration">输ru时长</span>
        <el-input-number v-model="timeInterval"></el-input-number>
      </el-form-item>

      <el-form-item>
        <span class="demonstration">单位</span>
        <el-select v-model="form.intervalUnit" placeholder="请选择">
          <el-option
            v-for="item in "
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <span class="demonstration">选择展示模型</span>
        <el-select v-model="form.type" placeholder="请选择">
          <el-option
            v-for="item in modelOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    components: {},
    name: 'chartsForm',
    props: {
      indexesOptions: Array,
      value: Object
    },
    data () {
      return {
        UnitOptions: [{
          value: 'day',
          label: '按天'
        }, {
          value: 'hour',
          label: '按小时'
        }],
        modelOptions: [{
          value: 'max',
          label: '最大值'
        }, {
          value: 'min',
          label: '最小值'
        }, {
          value: 'mean',
          label: '平均值'
        }, {
          value: 'max',
          label: '中位数'
        }, {
          value: 'max',
          label: '标准差'
        }],
        showTypeOptions: [{
          value: 'bar',
          label: '直方图'
        }, {
          value: 'boxplot',
          label: '箱线图'
        }, {
          value: 'compare',
          label: '散点图-对比'
        }, {
          value: '散点图-展示',
          label: 'scatter'
        }, {
          value: 'line',
          label: '折线图-累计'
        }, {
          value: 'line',
          label: '折线图-趋势'
        }, {
          value: 'bar',
          label: '柱状图'
        }],
        selectedIndex: '',
        timeRange: [],
        form: {
          index: '',
          type: '',
          startTime: '',
          endTime: '',
          timeInterval: '',
          intervalUnit: '',
          model: ''
        }
      }
    },
    watch: {
      selectedIndex: {
        handler: function (val) {
          this.form.index = val[this.val.length - 1]
        }
      },
      timeRange: {
        handler: function (val) {
          this.form.startTime = val[0]
          this.form.endTime = val[1]
        }
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
</style>

