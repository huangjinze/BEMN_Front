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
                <el-form-item prop="valueClassList" label="类别" >
                    <el-select v-model="valueClassList" multiple placeholder="请选择类型" >
                        <el-option
                                v-for="item in classList"
                                :key="item.id"
                                :label="item.text"
                                :value="item.text">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="devName" label="设备名" >
                    <el-input v-model="form.devName" placeholder="设备名"></el-input>
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

                <el-form-item id="tagCollapse" prop="factorTags" style="display: block" lable="检测指标">
                    <el-collapse >
                        <el-collapse-item title="检测指标" style="width: 100%" >
                            <el-button
                                    :key="tag"
                                    v-for="tag in tagsArray"
                                    size="mini"
                            @click="handleBtnClick(tag)">
                                {{tag}}
                            </el-button>
                            <el-tag
                                    :key="tag"
                                    v-for="tag in tagsAdd"
                                    closable
                                    :disable-transitions="false"
                                    @close="handleTagClose(tag)">
                                {{tag}}
                            </el-tag>
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
                        </el-collapse-item>
                    </el-collapse>
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

                    <el-form-item prop="classification" label="所属类别">
                        <el-select style="width: 100%" v-model="innerForm.classification" placeholder="所属类别" >
                            <el-option
                                    v-for="item in valueClassList"
                                    :key="item"
                                    :label="item"
                                    :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
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
            <el-dialog
                    width="30%"
                    :title="tagInfoDialogTitle"
                    :visible.sync="editInnerVisible"
                    append-to-body>
                <el-form :model="editInnerForm" ref="editInnerForm" label-width="80px" size="small">

                    <el-form-item prop="classification" label="所属类别">
                        <el-select style="width: 100%" v-model="editInnerForm.classification" placeholder="所属类别" >
                            <el-option
                                    v-for="item in valueClassList"
                                    :key="item"
                                    :label="item"
                                    :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="academic_name" label="指标学名">
                        <el-input v-model="editInnerForm.academic_name" placeholder="指标学名"></el-input>
                    </el-form-item>
                    <el-form-item prop="expression" label="表达式">
                        <el-input v-model="editInnerForm.expression" placeholder="表达式"></el-input>
                    </el-form-item>
                    <el-form-item prop="phoneticize" label="音标">
                        <el-input v-model="editInnerForm.phoneticize" placeholder="音标"></el-input>
                    </el-form-item>
                    <el-form-item prop="category" label="类目">
                        <el-input v-model="editInnerForm.category" placeholder="类目"></el-input>
                    </el-form-item>

                    <el-form-item prop="unit" label="数据单位">
                        <el-input v-model="editInnerForm.unit" placeholder="数据单位"></el-input>
                    </el-form-item>
                    <el-form-item prop="data_type" label="数据类型">
                        <el-radio-group v-model="editInnerForm.data_type">
                            <el-radio label="0"></el-radio>
                            <el-radio label="1"></el-radio>
                            <el-radio label="2"></el-radio>
                            <el-radio label="3"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="默认范围">
                        <el-col :span="11">
                            <el-form-item prop="min_default_value">
                                <el-input v-model="editInnerForm.min_default_value" placeholder="最小值"></el-input>
                            </el-form-item>

                        </el-col>
                        <el-col :span="2">-</el-col>
                        <el-col :span="11">
                            <el-form-item prop="max_default_value">
                                <el-input v-model="editInnerForm.max_default_value" placeholder="最大值"></el-input>
                            </el-form-item>

                        </el-col>
                    </el-form-item>
                    <el-form-item style="text-align: center;width:100%" size="medium">
                        <el-button type="primary" @click="onEditInnerSubmit('editInnerForm')">确定</el-button>
                        <el-button type="warning" @click="deleteFactor" plain>删除指标</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </el-dialog>
    </div>
</template>
<script>
  //  import moment from 'moment'
    import {deleteFactor} from '../../model/vftData'
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
        selectStation: {type: Function},
        devEditUpload: {type: Function},
        valueClass: {type: Array}
      },
      data () {
        return {
          dialogVisible: this.dialogEditingVisible,
          innerVisible: false,
          editInnerVisible: false,
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
            min_default_value: '',
            classification: ''
          },
          editInnerForm: {},
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
          tagsArray: this.tags,
          valueClassList: this.valueClass,
          tagsAdd: []
        }
      },
      watch: {
        tags (val) {
          this.tagsArray = val
        },
        valueClass (val) {
          this.valueClassList = val
        },
        valueClassList (val) {
          this.form.classSelect = val
        },
        dialogEditingVisible (val) {
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
          console.log(this.form)
          this.tagsAdd.splice(this.tagsAdd.indexOf(tag), 1)
        },
        deleteFactor () {
          var id = this.form.factorTags[this.tagInfoDialogTitle]['id']
          delete this.form.factorTags[this.tagInfoDialogTitle]
          this.tagsArray.splice(this.tagsAdd.indexOf(this.tagInfoDialogTitle), 1)
          this.editInnerVisible = false
          console.log(id)
          deleteFactor({factorId: id}).then( resp => {
            if (resp.data.status === 'success') {
              this.$message({
                message: '删除成功！',
                type: 'success'
              })
            }
          }).catch(resp => {
            this.$alert('删除失败', '失败', {confirmButtonText: 'ok'})
          })
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
            this.tagsAdd.push(inputValue)
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
              this.$emit('devEditUpload', this.form)
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
            } else {
              this.$message({
                message: '表单验证未通过',
                type: 'warning'
              })
              return false
            }
          })
        },
        onEditInnerSubmit (formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.form.factorTags[this.tagInfoDialogTitle] = JSON.parse(JSON.stringify(this.editInnerForm))
              this.formReset(formName)
              this.editInnerVisible = false
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
          if (formName === 'form') {
            this.tagsArray.splice(0, this.tagsArray.length)
            this.tagsAdd.splice(0, this.tagsAdd.length)
          }
        },
        handleBtnClick (factorName) {
          this.editInnerForm = JSON.parse(JSON.stringify(this.form.factorTags[factorName]))
          this.tagInfoDialogTitle = factorName
          this.editInnerVisible = true
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
    #tagCollapse>div {
        width:100%;
    }
</style>
