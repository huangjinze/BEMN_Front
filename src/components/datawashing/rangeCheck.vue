<template>
  <div>
    <span>
       指标选择：
      <el-select v-model="selectedIndexes"
                 multiple
                 filterable
                 placeholder="请选择"
                 @change="onIndexesSelectChange"
                 collapse-tags
                 size="large">
        <el-option
          v-for="(item, index) in indexesOptions"
          :key="index"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <!--<el-cascader-->
        <!--:options="indexesOptions"-->
        <!--v-model="selectedIndexes"-->
        <!--@change="onIndexesSelectChange"-->
      <!--&gt;</el-cascader>-->
    </span>

    <el-col id="indexRange">
      <el-form v-model="showIndexes">
        <template >
          <el-col v-for="(item,index) in showIndexes" :xs="24" :sm="24" :md="12" :lg="12" style="padding-left: 2%"  :key="index+'in19'">
            <el-form-item  >
              <div class="range">
                <i class="el-icon-remove" @click="onRemoveTagClick(item.name)" ></i>
                {{ item.name }}:
                <el-input-number v-model="item.min_default_value"></el-input-number> ~
                <el-input-number v-model="item.max_default_value"></el-input-number>
              </div>
            </el-form-item>
          </el-col>
        </template>
      </el-form>
    </el-col>
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
      indexes: {type: Array}
    },
    data () {
      return {
        selectedIndexes: [],
        showIndexes: []
      }
    },
    watch: {
      showIndexes: function (val) {
        if (this.showIndexes.length === 0) {
          this.selectedIndexes.length = 0
        }
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
      },
      onRemoveTagClick (value) {
        let index = this.selectedIndexes.indexOf(value)
        this.selectedIndexes.splice(index, 1)
        this.showIndexes = this.selectedIndexes.map((value) => {
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
  #indexRange{
    margin-top: 20px;
  }
  .el-icon-remove{
    color: #fab6b6;
  }
  .el-icon-remove{
    cursor: pointer ;
  }
  .el-icon-remove:hover{
    font-size: 16px;
    color: #f56C6C;
  }

</style>
