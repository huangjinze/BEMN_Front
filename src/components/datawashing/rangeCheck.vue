<template>
  <el-form>
    <el-form-item v-for="(item,index) in indexes" :key="index">
      <span>{{ item.name }}:
        <el-input-number v-model="item.low"></el-input-number> -
        <el-input-number v-model="item.high"></el-input-number> </span>
    </el-form-item>
  </el-form>
</template>

<script>
  /* eslint-disable standard/object-curly-even-spacing */

  export default {
    components: {},
    name: 'rangeCheck',
    props: {
      indexes: {type: Array}
    }
  }
</script>

<style scoped>

</style>
