# vtfChart 

> 统计模块的图表

## props

* indexesOptions:
   * type: Array
   * 内容 指标下拉框中的指标

* v-model:
  * type: Object
  * 内容 表单的值
  * eg: 
  
  ```js
            form: {
              index: '',
              type: '',
              startTime: '',
              endTime: '',
              timeInterval: '',
              intervalUnit: '',
              model: ''
            }
  ```

## data

* UnitOptions:
  * type: Array
  * 单位
 
* modelOptions:
  * type: Array
  * 计算模型
   
* showTypeOptions:
  * type: Array
  * 展示模型
  
## method

