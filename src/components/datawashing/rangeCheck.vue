<template>
  <el-form>
    <el-form-item v-for="(item,index) in indexes" :key="index">
      <span>{{ item.name }}:
        <el-input-number v-model="form[index].low"></el-input-number> -
        <el-input-number v-model="form[index].high"></el-input-number> </span>
    </el-form-item>
  </el-form>
</template>

<script>
  /* eslint-disable standard/object-curly-even-spacing */

  export default {
    components: {},
    name: 'rangeCheck',
    data () {
      return {
        form: []
      }
    },
    props: {
      indexes: {type: Array,
        default: function () {
          return [
          { name: 'H', low: 255, high: 540},
          { name: 'co2_flux', low: 200, high: 500},
          { name: 'h2o_flux', low: 200, high: 500}]
        }
      }
    },
    created: function () {
      for (let item in this.indexes) {
        console.log(this.indexes[item])
        this.form.push({name: this.indexes[item].name, low: this.indexes[item].low, high: this.indexes[item].high})
      }
    }
  }
</script>

<style scoped>

</style>
