/*

*/
<template>
  <div :class="className" :id="id">
    <div class="header">
      <p>
        <el-form v-model="form">
          <el-form-item>
            <span>
          选择指标:
            <el-cascader
              v-model="form.selectedTarget"
              placeholder="搜索"
              :options="targetOptions"
              filterable
            ></el-cascader>
            </span>
          </el-form-item>

          <el-form-item>
        <span>
          类型:
          <el-select v-model="form.selectedType" placeholder="请选择" @change="onTypeChange">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </span>
          </el-form-item>

            <el-form-item>
              <el-select v-model="form.granularity" placeholder="请选择"  >
                <el-option
                  v-for="item in granularityOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

              <div v-if="form.granularity==='day'">
                <el-form-item>
                  <el-date-picker
                    v-model="form.startDate"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </div>

            <div v-if="form.granularity==='month'">
              <el-form-item>
                <el-date-picker
                  v-model="form.startMonth"
                  type="month"
                  placeholder="开始月">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-date-picker
                  v-model="form.endMonth"
                  type="month"
                  placeholder="结束月">
                </el-date-picker>
              </el-form-item>
            </div>

            <div v-if="form.granularity==='two-week'">
              <el-form-item>
                <el-date-picker
                  v-model="form.startDate"
                  type="date"
                  placeholder="起始">
                </el-date-picker>
              </el-form-item>
            </div>

            <div v-if="form.granularity==='week'">
              <el-form-item>
                <el-date-picker
                  v-model="form.startDate"
                  type="date"
                  placeholder="起始">
                </el-date-picker>
              </el-form-item>
            </div>

            <div v-if="form.granularity==='year'">
              <el-form-item>
                <el-date-picker
                  v-model="form.startYear"
                  type="year"
                  placeholder="起始">
                </el-date-picker>
              </el-form-item>

              <el-form-item>
                <el-date-picker
                  v-model="form.endYear"
                  type="year"
                  placeholder="结束">
                </el-date-picker>
              </el-form-item>
            </div>

          <el-form-item>
            <el-select v-model="form.way" placeholder="请选择"  >
              <el-option
                v-for="item in wayOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" icon="el-icon-edit" v-on:click="onClick">绘制</el-button>
          </el-form-item>

        </el-form>
      </p>
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
          way: '',
          selectedTarget: [],
          selectedType: 'a',
          granularity: 'day'
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
          {value: 'a', label: '柱状图'},
          {value: 'b', label: '散点图'}],
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
    }
  }
</script>
<style scoped>
  #chart_container {
    height: 500px;
  }
</style>

