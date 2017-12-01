/*

*/
<template>
  <div :class="className" :id="id">
    <div class="header">
      <div>
        <el-form v-model="form">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item>
                <span>
                  选择指标：
                  <el-cascader
                    v-model="form.selectedTarget"
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
                  <el-select v-model="form.way" placeholder="请选择"  >
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
              <el-form-item>
                <span>
                  开始时间：
                  <el-date-picker
                    v-model="form.aForm.startDate"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
                </span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item>
                <span>
                  结束时间：
                  <el-date-picker
                    v-model="form.aForm.endDate"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
                </span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20" v-else-if="(form.selectedType =='b') ">
            <el-col :span="8">
              <el-form-item>
                <span>开始时间：
                  <el-select v-model="form.bForm.startMonth" placeholder="请选择"  >
                    <el-option
                      v-for="item in monthOptions"
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
                <span>结束时间：
                  <el-select v-model="form.bForm.endMonth" placeholder="请选择" >
                    <el-option
                      v-for="item in monthOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </span>
            </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20" v-else-if="(form.selectedType =='c') ">
            <el-col :span="8">
              <el-form-item>
                <span>
                  粒&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度：
                  <el-select v-model="form.cForm.granularity" placeholder="请选择"  >
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

            <el-col :span="8" v-if="form.cForm.granularity==='day'">
              <el-form-item>
                <span>
                  开始时间：
                  <el-date-picker
                                    v-model="form.cForm.startDate"
                                    type="date"
                                    placeholder="选择日期">
                </el-date-picker>
                </span>
              </el-form-item>
              </el-col>

            <el-col :span="16" v-if="form.cForm.granularity==='month'">
              <el-col :span="8" style="width: 50%;padding-left: 0">
                <el-form-item>
                  <span>
                    开始月份：
                    <el-date-picker
                                        v-model="form.cForm.startMonth"
                                        type="month"
                                        placeholder="开始月">
                  </el-date-picker>
                  </span>
                </el-form-item>
              </el-col>
              <el-col :span="8"  style="width: 50%;padding-right: 0">
                <el-form-item>
                  <span>
                    结束月份：
                    <el-date-picker
                                        v-model="form.cForm.endMonth"
                                        type="month"
                                        placeholder="结束月">
                  </el-date-picker>
                  </span>
                </el-form-item>
              </el-col>
            </el-col>

            <el-col :span="8" v-if="form.cForm.granularity==='two-week'">
              <el-form-item>
                <span>开始时间：
                  <el-date-picker
                                    v-model="form.cForm.startDate"
                                    type="date"
                                    placeholder="起始">
                </el-date-picker>
                </span>
              </el-form-item>
            </el-col>

            <el-col :span="8" v-if="form.cForm.granularity==='week'">
              <el-form-item>
                <span>开始时间：
                  <el-date-picker
                                    v-model="form.cForm.startDate"
                                    type="date"
                                    placeholder="起始">
                </el-date-picker>
                </span>
              </el-form-item>
            </el-col>

            <el-col :span="16" v-if="form.cForm.granularity==='year'">
              <el-col :span="8" style="width: 50%;padding-left: 0">
                <el-form-item>
                  <span>
                    开始年份：
                    <el-date-picker
                                        v-model="form.cForm.startYear"
                                        type="year"
                                        placeholder="起始">
                  </el-date-picker>
                  </span>
                </el-form-item>
              </el-col>
              <el-col :span="8" style="width: 50%;padding-right: 0">
                <el-form-item>
                  <span>
                    结束年份：
                    <el-date-picker
                                        v-model="form.cForm.endYear"
                                        type="year"
                                        placeholder="结束">
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
                <el-select v-model="form.dForm.granularity" placeholder="请选择"  >
                  <el-option
                    v-for="item in granularityOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="8" v-if="form.dForm.granularity==='day'">
              <el-form-item>
                <span>
                  开始时间：
                  <el-date-picker
                    v-model="form.dForm.startDate"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
                </span>
              </el-form-item>
            </el-col>

            <el-col :span="16" v-if="form.dForm.granularity==='month'">
              <el-col :span="8" style="width: 50%;padding-left: 0">
                <el-form-item>
                  <span>
                    开始月份：
                    <el-date-picker
                                        v-model="form.dForm.startMonth"
                                        type="month"
                                        placeholder="开始月">
                  </el-date-picker>
                  </span>
                </el-form-item>
              </el-col>
              <el-col :span="8" style="width: 50%;padding-right: 0">
                <el-form-item>
                  <span>
                    结束月份：
                    <el-date-picker
                                        v-model="form.dForm.endMonth"
                                        type="month"
                                        placeholder="结束月">
                  </el-date-picker>
                  </span>
                </el-form-item>
              </el-col>
            </el-col>

            <el-col :span="8" v-if="form.dForm.granularity==='two-week'">
              <el-form-item>
                <span>
                  开始时间：
                  <el-date-picker
                    v-model="form.dForm.startDate"
                    type="date"
                    placeholder="起始">
                </el-date-picker>
                </span>
              </el-form-item>
            </el-col>

            <el-col :span="8" v-if="form.dForm.granularity==='week'">
              <el-form-item>
                <span>
                  开始时间：
                  <el-date-picker
                    v-model="form.dForm.startDate"
                    type="date"
                    placeholder="起始">
                </el-date-picker>
                </span>
              </el-form-item>
            </el-col>

            <el-col :span="16" v-if="form.dForm.granularity==='year'">
              <el-col :span="8"  style="width: 50%;padding-left: 0">
                <el-form-item>
                  <span>
                    开始年份：
                    <el-date-picker
                                        v-model="form.dForm.startYear"
                                        type="year"
                                        placeholder="起始">
                  </el-date-picker>
                  </span>
                </el-form-item>
              </el-col>
              <el-col :span="8"  style="width: 50%;padding-right: 0">
                <el-form-item>
                  <span>
                    结束年份：
                    <el-date-picker
                                        v-model="form.dForm.endYear"
                                        type="year"
                                        placeholder="结束">
                  </el-date-picker>
                  </span>
                </el-form-item>
              </el-col>
            </el-col>
          </el-row>

          <el-row :gutter="20" v-else-if="(form.selectedType =='e') ">
            <el-col :span="8">
              <el-form-item>
                <span>
                  开始时间：
                  <el-date-picker
                                    v-model="form.eForm.startMonth"
                                    type="month"
                                    placeholder="开始">
                </el-date-picker>
                </span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item>
                <span>
                  结束时间：
                  <el-date-picker
                                    v-model="form.eForm.endMonth"
                                    type="month"
                                    placeholder="结束">
                </el-date-picker>
                </span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="6">
              <el-form-item>
                <el-button type="primary" icon="el-icon-edit"  v-on:click="onClick" style="width: 80%;font-size: 18px">绘制</el-button>
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
          selectedTarget: [],
          selectedType: 'a',
          way: 'average',
          aForm: {},
          bForm: {},
          cForm: {granularity: 'day'},
          dForm: {granularity: 'day'},
          eForm: {}
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
        monthOptions: [{
          value: '1',
          label: '1'
        }, {
          value: '2',
          label: '2'
        }, {
          value: '3',
          label: '3'
        }, {
          value: '4',
          label: '4'
        }, {
          value: '5',
          label: '5'
        }, {
          value: '6',
          label: '6'
        }, {
          value: '7',
          label: '7'
        }, {
          value: '8',
          label: '8'
        }, {
          value: '9',
          label: '9'
        }, {
          value: '10',
          label: '10'
        }, {
          value: '11',
          label: '11'
        }, {
          value: '12',
          label: '12'
        }],
        granularityOptions: [
          {
            value: 'day', label: '按天'
          },
          {
            value: 'month', label: '按月'
          },
          {
            value: 'two-week', label: '俩周'
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
            value: 'average', label: '平均值'
          },
          {
            value: 'maximum', label: '最大值'
          },
          {
            value: 'minimum', label: '最小值'
          },
          {
            value: 'median', label: '中位数'
          },
          {
            value: 'standard', label: '标准差'
          }
        ]
      }
    },

    methods: {
      onTypeChange (value) {
      },
      onClick () {
        this.$emit('input', this.form)
        this.$emit('Click', this.form)
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

