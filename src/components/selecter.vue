<template>
    <div>

        <el-select v-model="value" placeholder="请选择">
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
    </div>
</template>

<script>
  export default {
    name: 'selecter',
    data () {
      return {
        options: [{
          value: '选项1',
          label: '1'
        }, {
          value: '选项2',
          label: '2'
        }, {
          value: '选项3',
          label: '3'
        }, {
          value: '选项4',
          label: '4'
        }, {
          value: '选项5',
          label: '5'
        }, {
          value: '选项5',
          label: '6'
        }, {
          value: '选项5',
          label: '7'
        }, {
          value: '选项5',
          label: '8'
        }, {
          value: '选项5',
          label: '9'
        }, {
          value: '选项5',
          label: '10'
        }, {
          value: '选项5',
          label: '11'
        }, {
          value: '选项5',
          label: '12'
        }],
        value: ''
      }
    }
  }
</script>
