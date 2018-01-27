//  设备管理部分设备故障信息的对话模拟框
<template >
    <div :class="className" :id="id">
        <el-dialog  :title="dialogName" :visible.sync="dialogVisible">
            <el-form id="editDevDialogForm" :model="form" ref="form" :inline="true" label-width="80px" v-bind:rules="Rules">

                <el-form-item prop="stationSelect" label="站点" >
                    <el-select v-model="form.stationSelect" clearable placeholder="请选择站点" @change="clickSelectStation">
                        <el-option
                                v-for="item in stationList"
                                :key="item.id"
                                :label="item.text"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="classSelect" label="类别" >
                    <el-select v-model="form.classSelect" multiple clearable filterable allow-create default-first-option placeholder="请选择类型" >
                        <el-option
                                v-for="item in classList"
                                :key="item.id"
                                :label="item.text"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="devName" label="设备名" >
                    <el-input v-model="form.devName" placeholder="设备名"></el-input>
                </el-form-item>
                <el-form-item prop="factorTags" style="display: block" label="检测指标">
                    <el-button
                            :key="tag"
                            v-for="tag in tagsArray"
                            size="mini">
                        {{tag}}
                    </el-button>
                    <el-input style="width: 90px;padding: 0"
                              class="input-new-tag"
                              v-if="tagInputVisible"
                              v-model="tagInputValue"
                              ref="saveTagInput"
                              size="small"
                              @keyup.enter.native="tagInputConfirm"
                              @blur="tagInputConfirm"
                    >
                    </el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showTagInput">+ 添加指标</el-button>
                </el-form-item>
                <el-form-item prop="facturer" label="生产厂商">
                    <el-input v-model="form.facturer" placeholder="生产厂商"></el-input>
                </el-form-item>
                <el-form-item prop="price" label="设备单价">
                    <el-input v-model="form.price" placeholder="设备单价"></el-input>
                </el-form-item>
                <el-form-item prop="number" label="设备规模" >
                    <el-input v-model="form.number" placeholder="设备规模"  ></el-input>
                </el-form-item>
                <el-form-item prop="telephone" label="联系电话">
                    <el-input v-model="form.telephone" placeholder="联系电话" ></el-input>
                </el-form-item>
                <el-form-item prop="place_introduction" class="addDevTextAreaItem" style="display: block;width:100%" label="站点简介">
                    <el-input type="textarea" v-model="form.place_introduction" style="width: 95%"></el-input>
                </el-form-item>
                <el-form-item prop="introduction" class="addDevTextAreaItem" style="display: block;width:100%" label="设备简介">
                    <el-input type="textarea" v-model="form.introduction" style="width: 95%"></el-input>
                </el-form-item>
                <el-form-item style="text-align: center;width:100%" size="large">
                    <el-button type="primary" @click="onSubmit('form')">提交</el-button>
                    <el-button @click="formReset('form')">重置</el-button>
                </el-form-item>
            </el-form>
            <el-dialog
                    width="30%"
                    :title="tagInfoDialogTitle"
                    :visible.sync="innerVisible"
                    append-to-body>
                <el-form :model="innerForm" ref="innerForm" label-width="80px" size="small">
                    <el-form-item prop="academic_name" label="指标学名">
                        <el-input v-model="innerForm.academic_name" placeholder="指标学名"></el-input>
                    </el-form-item>
                    <el-form-item prop="expression" label="表达式">
                        <el-input v-model="innerForm.expression" placeholder="表达式"></el-input>
                    </el-form-item>
                    <el-form-item prop="phoneticize" label="音标">
                        <el-input v-model="innerForm.phoneticize" placeholder="音标"></el-input>
                    </el-form-item>
                    <el-form-item prop="category" label="类目">
                        <el-input v-model="innerForm.category" placeholder="类目"></el-input>
                    </el-form-item>
                    <el-form-item prop="unit" label="数据单位">
                        <el-input v-model="innerForm.unit" placeholder="数据单位"></el-input>
                    </el-form-item>
                    <el-form-item prop="data_type" label="数据类型">
                        <el-radio-group v-model="innerForm.data_type">
                            <el-radio label="0"></el-radio>
                            <el-radio label="1"></el-radio>
                            <el-radio label="2"></el-radio>
                            <el-radio label="3"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="默认范围">
                        <el-col :span="11">
                            <el-form-item prop="min_default_value">
                                <el-input v-model="innerForm.min_default_value" placeholder="最小值"></el-input>
                            </el-form-item>

                        </el-col>
                        <el-col :span="2">-</el-col>
                        <el-col :span="11">
                            <el-form-item prop="max_default_value">
                                <el-input v-model="innerForm.max_default_value" placeholder="最大值"></el-input>
                            </el-form-item>

                        </el-col>
                    </el-form-item>
                    <el-form-item style="text-align: center;width:100%" size="medium">
                        <el-button type="primary" @click="onInnerSubmit('innerForm')">确定</el-button>
                        <el-button @click="formReset('innerForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </el-dialog>
    </div>
</template>
<script>
    import moment from 'moment'
    export default {
      props: {
        className: String,
        id: String,
        dialogEditingVisible: {type: Boolean, default: false},
        stationList: {type: Array},
        classList: {type: Array},
        editInfo: {type: Object},
        tags: {type: Array},
        dialogClose: {type: Function},
        selectStation: {type: Function}
      },
      data () {
        return {
          dialogVisible: this.dialogEditingVisible,
          innerVisible: false,
          isDisabled: true,
          dialogName: '修改设备信息',
          form: this.editInfo,
          innerForm: {
            academic_name: '',
            expression: '',
            phoneticize: '',
            category: '',
            unit: '',
            data_type: '',
            max_default_value: '',
            min_default_value: ''
          },
          tagInputVisible: false,
          tagInputValue: '',
          Rules: {
            devName: [{
              required: true,
              message: '设备名不能为空'
            }],
            number: [{
              pattern: /^\d+$/,
              message: '数量必须为数字值'
            }]
          },
          tagInfoDialogTitle: '',
          tagsArray: this.tags
        }
      },
      watch: {
        dialogEditingVisible (val) {
          console.log(val)
          this.dialogVisible = val
        },
        dialogVisible (val) {
          this.$emit('dialogClose', val)
        }
      },
      methods: {
        addClass (event) {
           console.log(event)
        },
        clickSelectStation (value) {
          if (value) {
            this.$emit('selectStation', value)
            this.isDisabled = false
          } else {
            this.isDisabled = true
          }
        },
        handleTagClose (tag) {
          delete this.form.factorTags[tag]
          this.tagsArray.splice(this.tagsArray.indexOf(tag), 1)
          console.log('h', this.form.factorTags)
        },
        showTagInput () {
          this.tagInputVisible = true
          this.$nextTick(_ => {
            this.$refs.saveTagInput.$refs.input.focus()
          })
        },
        tagInputConfirm () {
          let inputValue = this.tagInputValue
                //  this.form.factorTags = {}
          if (inputValue) {
            this.tagsArray.push(inputValue)
            this.form.factorTags[inputValue] = ''
            this.tagInputVisible = false
            this.tagInfoDialogTitle = this.tagInputValue
            this.innerVisible = true
            this.tagInputValue = ''
          }
        },
        onSubmit (formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$emit('devAddUpload', this.form)
            } else {
              this.$message({
                message: '表单验证未通过',
                type: 'warning'
              })
              return false
            }
          })
        },
        onInnerSubmit (formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.form.factorTags[this.tagInfoDialogTitle] = JSON.parse(JSON.stringify(this.innerForm))
              this.formReset(formName)
              this.innerVisible = false
              console.log(this.form.factorTags)
            } else {
              this.$message({
                message: '表单验证未通过',
                type: 'warning'
              })
              return false
            }
          })
        },
        formReset (formName) {
          this.$refs[formName].resetFields()
          if(formName === 'form'){
            this.tagsArray.splice(0, this.tagsArray.length)
          }
        }
      },
      name: 'editDevDialog'
    }
</script>
<style>
    #editDevDialogForm>div>div>.el-tag {
        margin: 5px;
    }
    #editDevDialogForm>div>div>.el-input,.el-date-editor.el-input {
        width: 226px;
    }
    .addDevTextAreaItem>div {
        width: 80%;
    }
</style>
