<template>
<el-form v-model="form" @click="onFormChange">

  <el-col :span="6">
    <el-form-item>
      <el-select v-model="form.station">
        <el-option
                v-for="item in stations"
                :key="item.label"
                :label="item.label"
                :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
  </el-col>

  <el-col :span="6">
    <el-form-item>
      <el-select v-model="form.classification">
        <el-option
                v-for="item in classifications"
                :key="item.label"
                :label="item.label"
                :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
  </el-col>

  <el-col :span="6">
    <el-form-item>
      <el-date-picker
              v-model="form.year"
              align="right"
              type="year"
              placeholder="选择年">
      </el-date-picker>
    </el-form-item>
  </el-col>

  <el-col :span="6">
    <el-form-item>
      <el-upload
              class="upload-demo"
              action=""
              :file-list="filelist"
              @on-change="onFileChange">
        <el-button size="medium" type="primary">点击上传</el-button>
      </el-upload>
    </el-form-item>
  </el-col>

</el-form>
</template>

<script>
  export default {
    components: {},
    name: 'washingForm',
    data () {
      return {
        filelist: []
      }
    },
    props: {
      stations: {type: Array, default: () => { return [{label: '八达岭', value: '八达岭'}, {label: '奥林匹克', value: '奥林匹克'}] }},
      classifications: {type: Array,
        default: () => {
          return [{label: '碳通量', value: 'co2'},
          {label: '水', value: 'water'},
          {label: '气象', value: 'weather'},
          {label: '能量', value: 'energy'}]
        }
      },
      form: Object
    },
    methods: {
      onFileChange (file, fileList) {
        console.log(fileList)
      },
      onFormChange () {
        this.$emit('input', this.form)
      }
    }
  }
</script>

<style scoped>
  .el-col{
    text-align: center;
  }
  .el-button--medium {
    padding: 10px 80px!important;
    font-size: 14px;
    border-radius: 4px;
  }
  .el-form{
    margin-bottom: 24px;
  }

</style>
