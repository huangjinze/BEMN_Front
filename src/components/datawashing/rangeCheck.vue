<template>
  <el-row>
    <span>
      <el-select v-model="selectedIndexes"
                 multiple
                 filterable
                 placeholder="请选择"
                 @change="onIndexesSelectChange"
                 size="large">
        <el-option
          v-for="item in indexesOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </span>

    <el-row>
      <el-col :span="24">
        <el-form v-model="showIndexes">
          <el-form-item v-for="(item,index) in showIndexes" :key="index">
      <el-col :span="8">{{ item.name }}:
        <el-col :span="3">
          <el-input-number v-model="item.low"></el-input-number> -
        </el-col>
        <el-col :span="3">
          <el-input-number v-model="item.high"></el-input-number>
        </el-col>

      </el-col>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-row>

</template>

<script>
  /* eslint-disable standard/object-curly-even-spacing */

  import ElInputNumber from 'element-ui/packages/input-number/src/input-number'
  import ElForm from 'element-ui/packages/form/src/form'

  export default {
    components: {
      ElForm,
      ElInputNumber},
    name: 'rangeCheck',
    props: {
      indexes: {type: Array},
      input: {type: Array, default: () => { return [] }}
    },
    data () {
      return {
        selectedIndexes: [],
        showIndexes: this.input
      }
    },
    computed: {
      indexesOptions: function () {
        return this.indexes.map(
          (item) => {
            return {value: item.name, label: item.name}
          })
      }
    },
    updated () {
      this.$emit('input', this.input)
    },
    methods: {
      onIndexesSelectChange (values) {
        console.log('change', values)
        this.showIndexes = values.map((value) => {
          return this.indexes.find((item, index) => {
            console.log(item.name, index)
            return item.name === value
          })
        })
      }
    }
  }
</script>

<style scoped>
  .el-select{
    margin-top: -10px;
  }


</style>
