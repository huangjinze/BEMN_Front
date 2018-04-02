/*

*/
<template>
  <el-row id="select_form">
    <el-form v-model="form">
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="9">

        <el-form-item v-if="form.type === 'compare'" prop="startTime">
          <div class="block">
            <span class="demonstration">开始年</span>
            <el-date-picker
                    v-model="form.startTime"
                    align="right"
                    type="year"
                    placeholder="选择年"
                    value-format="yyyy">
            </el-date-picker>
          </div>
        </el-form-item>

        <el-form-item v-if="form.type === 'compare'" prop="endTime">
          <div class="block">
            <span class="demonstration">结束年</span>
            <el-date-picker
              v-model="form.endTime"
              align="right"
              type="year"
              placeholder="选择年"
              value-format="yyyy">
            </el-date-picker>
          </div>
        </el-form-item>

        <el-form-item v-if="form.type !== 'compare'" prop="timeRange">
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
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="6">
        <el-form-item prop="selectedIndex">
          <span class="demonstration">选择指标</span>
          <el-cascader
                  placeholder="输入指标"
                  :options="indexesOptions"
                  v-model="selectedIndex"
                  filterable
          ></el-cascader>
        </el-form-item>
      </el-col>
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="6">
        <el-form-item prop="type">
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

      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="9">
        <el-form-item prop="type">
          <span class="demonstration">输入时长</span>
          <el-input-number v-model="form.timeInterval"></el-input-number>
        </el-form-item>
      </el-col>
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="6">
        <el-form-item prop="intervalUnit">
          <span class="demonstration">选择单位</span>
          <el-select v-model="form.intervalUnit" placeholder="请选择">
            <el-option
                    v-for="item in UnitOptions"
                    :key="item.value + 'unit'"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="6">
        <el-form-item prop="model">
          <span class="demonstration">展示模型</span>
          <el-select v-model="form.model" placeholder="请选择">
            <el-option
                    v-for="item in modelOptions"
                    :key="item.value + 'way'"
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
    name: 'chartsForm',
    props: {
      indexesOptions: Array,
      input: Object
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
          value: 'median',
          label: '中位数'
        }, {
          value: 'std',
          label: '标准差'
        }],
        showTypeOptions: [{
          value: 'boxplot',
          label: '箱线图'
        }, {
          value: 'compare',
          label: '散点图-对比'
        }, {
          value: 'scatter',
          label: '散点图-展示'
        }, {
          value: 'line_sum',
          label: '折线图-累计'
        }, {
          value: 'line',
          label: '折线图-趋势'
        }, {
          value: 'bar',
          label: '柱状图'
        }],
        selectedIndex: [],
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
  #select_form{
    margin-top: 20px;
  }
  @media only screen and (min-width: 1000px){
    #select_form{
      margin-left: 4.5%;
    }
  }
  @media only screen and (min-width: 1400px){
    #select_form{
      margin-left: 10%;
    }
  }
</style>

