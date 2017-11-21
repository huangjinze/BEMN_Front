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

          <div v-if="(currentForm =='data2dataForm') ">
            <el-form-item>
              <el-date-picker
                v-model="form.startDate"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-date-picker
                v-model="form.endDate"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </div>

          <div v-else-if="(currentForm =='month2monthForm') ">
            <el-form-item>
              <el-select v-model="form.startMonth" placeholder="请选择"  >
                <el-option
                  v-for="item in monthOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="form.endMonth" placeholder="请选择" >
                <el-option
                  v-for="item in monthOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>

          <el-form-item>
            <el-button type="primary" icon="el-icon-edit" v-on:click="onClick">绘制</el-button>
          </el-form-item>
        </el-form>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    components: {
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
          selectedType: 'b'
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
        currentForm: 'month2monthForm',
        typeOptions: [
          {value: 'a', label: 'a'},
          {value: 'b', label: 'b'}],
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
        }]
      }
    },
    methods: {
      onTypeChange (value) {
        if (value === 'a') {
          this.currentForm = 'data2dataForm'
        }
        if (value === 'b') {
          this.currentForm = 'month2monthForm'
        }
        console.log(this.currentForm)
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

