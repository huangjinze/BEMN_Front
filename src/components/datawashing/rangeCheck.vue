<template>
  <div>
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

    <div>
      <el-form v-model="showIndexes">
        <el-form-item v-for="(item,index) in showIndexes" :key="index">
      <span>{{ item.name }}:
        <el-input-number v-model="item.min_default_value"></el-input-number> -
        <el-input-number v-model="item.max_default_value"></el-input-number> </span>
        </el-form-item>
      </el-form>
    </div>
  </div>

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
      input: {type: Array}
    },
    data () {
      return {
        selectedIndexes: [],
        showIndexes: this.input
      }
    },
    watch: {
      showIndexes: function (newValue) {
        this.selectedIndexes = this.showIndexes.map((item) => { return item.name })
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
      this.$emit('input', this.showIndexes)
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

</style>
