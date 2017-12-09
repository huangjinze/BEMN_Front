/*

*/
<template>
  <div :class="className" :id="id">
    <div class="header">
      <div>
        <el-form :model="form" :rules="rules" ref="form">
          <!-- 表单项，prop属性表示要进行表单验证，验证规则对应为rules的属性name -->
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item prop="index">
                <span>
                  选择指标：
                  <el-cascader
                    v-model="form.index"
                    placeholder="搜索"
                    :options="targetOptions"
                    filterable>
                  </el-cascader>
                </span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item>
            <span>
              类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：
              <el-select v-model="form.selectedType" placeholder="请选择" @change="onTypeChange">
                <el-option
                  class="optionCenter"
                  v-for="item in typeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
             </span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item>
                <span>
                  计算方法：
                  <el-select v-model="form.model" placeholder="请选择"  >
                  <el-option
                    class="optionCenter"
                    v-for="item in wayOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                </span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20" v-if="(form.selectedType =='a') ">
            <el-col :span="8">
              <el-form-item prop="start_time">
                <span>
                  开始时间：
                  <el-date-picker
                    v-model="form.start_time"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd">
                </el-date-picker>
                </span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="end_time">
                <span>
                  结束时间：
                  <el-date-picker
                    v-model="form.end_time"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd">
                </el-date-picker>
                </span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20" v-else-if="(form.selectedType =='b') ">
            <el-col :span="8">
              <el-form-item  prop="start_time">
                <span>开始时间：
                    <el-date-picker
                      v-model="form.start_time"
                      type="month"
                      placeholder="开始月"
                      value-format="yyyy-MM-dd">
                  </el-date-picker>
                </span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="end_time">
                <span>结束时间：
                    <el-date-picker
                      v-model="form.end_time"
                      type="month"
                      placeholder="结束月"
                      value-format="yyyy-MM-dd">
                  </el-date-picker>
                </span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20" v-else-if="(form.selectedType =='c') ">
            <el-col :span="8">
              <el-form-item>
                <span>
                  粒&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度：
                  <el-select v-model="form.time_interval" placeholder="请选择"  >
                  <el-option
                    class="optionCenter"
                    v-for="item in granularityOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                </span>
              </el-form-item>
            </el-col>

            <el-col :span="8" v-if="form.time_interval==='day'">
              <el-form-item prop="start_time">
                <span>
                  开始时间：
                  <el-date-picker
                    v-model="form.start_time"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd">
                </el-date-picker>
                </span>
              </el-form-item>
            </el-col>

            <el-col :span="16" v-if="form.time_interval==='month'">
              <el-col :span="8" style="width: 50%;padding-left: 0">
                <el-form-item>
                  <span prop="startTime">
                    开始月份：
                    <el-date-picker
                      v-model="form.start_time"
                      type="month"
                      placeholder="开始月"
                      value-format="yyyy-MM-dd">
                  </el-date-picker>
                  </span>
                </el-form-item>
              </el-col>
              <el-col :span="8"  style="width: 50%;padding-right: 0">
                <el-form-item prop="end_time">
                  <span>
                    结束月份：
                    <el-date-picker
                      v-model="form.end_time"
                      type="month"
                      placeholder="结束月"
                      value-format="yyyy-MM-dd">
                  </el-date-picker>
                  </span>
                </el-form-item>
              </el-col>
            </el-col>

            <el-col :span="8" v-if="form.time_interval=='2week'">
              <el-form-item prop="start_time">
                <span>开始时间：
                  <el-date-picker
                    v-model="form.start_time"
                    type="date"
                    placeholder="起始"
                    value-format="yyyy-MM-dd"
                  >
                </el-date-picker>
                </span>
              </el-form-item>
            </el-col>

            <el-col :span="8" v-if="form.time_interval=='week'">
              <el-form-item prop="start_time">
                <span>开始时间：
                  <el-date-picker
                    v-model="form.start_time"
                    type="date"
                    placeholder="起始"
                    value-format="yyyy-MM-dd">
                </el-date-picker>
                </span>
              </el-form-item>
            </el-col>

            <el-col :span="16" v-if="form.time_interval==='year'">
              <el-col :span="8" style="width: 50%;padding-left: 0">
                <el-form-item prop="start_time">
                  <span>
                    开始年份：
                    <el-date-picker
                      v-model="form.start_time"
                      type="year"
                      placeholder="起始"
                      value-format="yyyy-MM-dd">
                  </el-date-picker>
                  </span>
                </el-form-item>
              </el-col>
              <el-col :span="8" style="width: 50%;padding-right: 0">
                <el-form-item prop="end_time">
                  <span>
                    结束年份：
                    <el-date-picker
                      v-model="form.end_time"
                      type="year"
                      placeholder="结束"
                      value-format="yyyy-MM-dd">
                  </el-date-picker>
                  </span>
                </el-form-item>
              </el-col>
            </el-col>
          </el-row>

          <el-row :gutter="20" v-else-if="(form.selectedType =='d') ">
            <el-col :span="8">
              <el-form-item>
                <span>
                  粒&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度：
                </span>
                <el-select v-model="form.time_interval" placeholder="请选择"  >
                  <el-option
                    v-for="item in granularityOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="8" v-if="form.time_interval==='day'">
              <el-form-item prop="start_time">
                <span>
                  开始时间：
                  <el-date-picker
                    v-model="form.start_time"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd">
                </el-date-picker>
                </span>
              </el-form-item>
            </el-col>

            <el-col :span="16" v-if="form.time_interval==='month'">
              <el-col :span="8" style="width: 50%;padding-left: 0">
                <el-form-item prop="start_time">
                  <span>
                    开始月份：
                    <el-date-picker
                      v-model="form.start_time"
                      type="month"
                      placeholder="开始月"
                      value-format="yyyy-MM-dd">
                  </el-date-picker>
                  </span>
                </el-form-item>
              </el-col>
              <el-col :span="8" style="width: 50%;padding-right: 0">
                <el-form-item prop="end_time">
                  <span>
                    结束月份：
                    <el-date-picker
                      v-model="form.end_time"
                      type="month"
                      placeholder="结束月"
                      value-format="yyyy-MM-dd">
                  </el-date-picker>
                  </span>
                </el-form-item>
              </el-col>
            </el-col>

            <el-col :span="8" v-if="form.time_interval==='2week'">
              <el-form-item prop="start_time">
                <span>
                  开始时间：
                  <el-date-picker
                    v-model="form.start_time"
                    type="date"
                    placeholder="起始"
                    value-format="yyyy-MM-dd">
                </el-date-picker>
                </span>
              </el-form-item>
            </el-col>

            <el-col :span="8" v-if="form.time_interval==='week'">
              <el-form-item prop="start_time">
                <span>
                  开始时间：
                  <el-date-picker
                    v-model="form.start_time"
                    type="date"
                    placeholder="起始"
                    value-format="yyyy-MM-dd">
                </el-date-picker>
                </span>
              </el-form-item>
            </el-col>

            <el-col :span="16" v-if="form.time_interval==='year'">
              <el-col :span="8"  style="width: 50%;padding-left: 0">
                <el-form-item prop="start_time">
                  <span>
                    开始年份：
                    <el-date-picker
                      v-model="form.start_time"
                      type="year"
                      placeholder="起始"
                      value-format="yyyy-MM-dd">
                  </el-date-picker>
                  </span>
                </el-form-item>
              </el-col>
              <el-col :span="8"  style="width: 50%;padding-right: 0">
                <el-form-item prop="end_time">
                  <span>
                    结束年份：
                    <el-date-picker
                      v-model="form.end_time"
                      type="year"
                      placeholder="结束"
                      value-format="yyyy-MM-dd">
                  </el-date-picker>
                  </span>
                </el-form-item>
              </el-col>
            </el-col>
          </el-row>

          <el-row :gutter="20" v-else-if="(form.selectedType =='e') ">
            <el-col :span="8">
              <el-form-item prop="start_time">
                <span>
                  开始时间：
                  <el-date-picker
                    v-model="form.start_time"
                    type="month"
                    placeholder="开始"
                    value-format="yyyy-MM-dd">
                </el-date-picker>
                </span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="end_time">
                <span>
                  结束时间：
                  <el-date-picker
                    v-model="form.end_time"
                    type="month"
                    placeholder="结束"
                    value-format="yyyy-MM-dd">
                </el-date-picker>
                </span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="6">
              <el-form-item>
                <el-button type="primary" icon="el-icon-edit"  v-on:click="submitForm('form')" style="width: 80%;font-size: 18px">绘制</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import ElFormItem from '../../../node_modules/element-ui/packages/form/src/form-item.vue'

  export default {
    components: {
      ElFormItem
    },
    name: 'chartsForm',
    props: {
      className: String,
      id: String,
      Click: Function,
      targetOptions: {type: Array, default: []},
      value: Object }, // 目标选项
    mounted: function () {

    },
    data () {
      return {
        chartMeta: {
          tittle: {}
        },
        myChart: {},
        form: {
          index: [],
          selectedType: 'a',
          model: 'mean',
          time_interval: 'day',
          start_time: '',
          end_time: ''
        },
        rules: {
          index: [
            { type: 'array', required: true, message: '请输入活动名称', trigger: 'change' }
          ],
          start_time: [
            { type: 'string', required: true, message: '请选择开始时间', trigger: 'change' }
          ],
          end_time: [
            { type: 'string', required: true, message: '请选择结束时间', trigger: 'change' }
          ]
        },
        startPickerOptions: {
          disabledDate (time) {
            return time.getTime() > Date.now()
          }},
        endPickerOptions: {
          disabledDate (time) {
            return time.getTime() > Date.now()
          }
        },
        currentForm: 'data2dataForm',
        typeOptions: [
          {value: 'a', label: '展示散点图'},
          {value: 'b', label: '对比散点图'},
          {value: 'c', label: '柱状图'},
          {value: 'd', label: '箱线图'},
          {value: 'e', label: '纵向对比图'}],
        granularityOptions: [
          {
            value: 'day', label: '按天'
          },
          {
            value: 'month', label: '按月'
          },
          {
            value: '2week', label: '俩周'
          },
          {
            value: 'week', label: '一周'
          },
          {
            value: 'year', label: '按年'
          }
        ],
        wayOptions: [
          {
            value: 'mean', label: '平均值'
          },
          {
            value: 'max', label: '最大值'
          },
          {
            value: 'min', label: '最小值'
          },
          {
            value: 'mid', label: '中位数'
          },
          {
            value: 'std', label: '标准差'
          }
        ]
      }
    },
    methods: {
      onTypeChange (value) {
      },
      submitForm (formName) {
        console.log('表单：', this.$refs[formName])
        this.$refs[formName].validate((valid) => {
          console.log('valid', valid)
          if (valid) {
            this.$emit('input', this.form)
            this.$emit('Click', this.form)
            alert('submit!')
          } else {
            alert('error submit!!')
            return false
          }
        })
      }
    },
    watch: {

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

