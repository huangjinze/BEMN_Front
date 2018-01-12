<template>
<el-form v-model="form" @click="onFormChange">

  <el-form-item>
    <el-select v-model="form.station" @change="onStationChange">
      <el-option
        v-for="item in stations"
        :key="item.label"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </el-form-item>

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

  <el-form-item>
    <el-date-picker
      v-model="form.year"
      align="right"
      type="year"
      placeholder="选择年"
      value-format="yyyy">
    </el-date-picker>
  </el-form-item>

  <el-form-item>
    <el-upload
      class="upload-demo"
      action=""
      :file-list="filelist"
      @on-change="onFileChange">
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
  </el-form-item>

</el-form>
</template>

<script>
  export default {
    components: {},
    name: 'washingForm',
    data () {
      return {
        filelist: [],
        form: {
          classification: 'co2',
          year: '',
          station: '奥林匹克'
        }
      }
    },
    props: {
      stations: {type: Array,
        default: () => {
          return [
          {label: '八达岭', value: '八达岭'},
          {label: '奥林匹克', value: '奥林匹克'},
          {label: '盐池_1', value: '盐池_1'}]
        }},
      classifications: {type: Array,
        default: () => {
          return [{label: '碳通量', value: 'co2'},
          {label: '水', value: 'water'},
          {label: '气象', value: 'weather'},
          {label: '能量', value: 'energy'}]
        }
      },
      input: {type: Object},
      StationChange: {type: Function}
    },
    watch: {},
    mounted () {
      this.$emit('input', this.form)
    },
    updated () {
      console.log('updata')
      this.$emit('input', this.form)
    },
    methods: {
      onFileChange (file, fileList) {
        console.log(fileList)
      },
      onFormChange () {
        this.$emit('input', this.form)
      },
      onStationChange () {
        this.$emit('StationChange')
      }
    }
  }
</script>

<style scoped>

</style>
