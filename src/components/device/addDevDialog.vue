//  设备管理部分设备故障信息的对话模拟框
<template >
    <div :class="className" :id="id">
        <el-dialog  :title="dialogName" :visible.sync="dialogVisible">
            <el-form id="addDevDialogForm" :model="form" ref="form" :inline="true" label-width="80px" v-bind:rules="Rules">

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
                        <el-select v-model="form.classSelect" clearable :disabled="isDisabled" placeholder="请选择类型" >
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
                    <el-tag
                            :key="tag"
                            v-for="tag in form.factorTags"
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
                </el-form-item>
                <el-form-item prop="facturer" label="生产厂商">
                    <el-input v-model="form.facturer" placeholder="生产厂商"></el-input>
                </el-form-item>
                <el-form-item prop="standard" label="设备规模">
                    <el-input v-model="form.standard" placeholder="设备规模"></el-input>
                </el-form-item>
                <el-form-item prop="price" label="设备单价">
                    <el-input v-model="form.price" placeholder="设备单价"></el-input>
                </el-form-item>
                <el-form-item prop="number" label="设备数量" >
                    <el-input v-model="form.number" placeholder="设备数量"  ></el-input>
                </el-form-item>
                <el-form-item prop="pur_time" label="购买时间">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.pur_time"></el-date-picker>
                </el-form-item>
                <el-form-item prop="telephone" label="联系电话">
                    <el-input v-model="form.telephone" placeholder="联系电话" ></el-input>
                </el-form-item>
                <el-form-item prop="introduction" id="addDevTextAreaItem" style="display: block;width:100%" label="简介">
                    <el-input type="textarea" v-model="form.introduction" style="width: 95%"></el-input>
                </el-form-item>
                <el-form-item style="text-align: center;width:100%" size="large">
                    <el-button type="primary" @click="onSubmit('form')">提交</el-button>
                    <el-button @click="formReset('form')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
    import moment from 'moment'
    export default {
      props: {
        className: String,
        id: String,
        dialogAddingVisible: {type: Boolean, default: false},
        stationList: {type: Array},
        classList: {type: Array},
        dialogClose: {type: Function},
        selectStation: {type: Function}
      },
      data () {
        return {
          dialogVisible: this.dialogAddingVisible,
          isDisabled: true,
          dialogName: '添加设备',
          form: {
            stationSelect: '',
            classSelect: '',
            devName: '',
            factorTags: [],
            facturer: '',
            standard: '',
            price: '',
            number: '',
            pur_time: '',
            telephone: '',
            introduction: ''
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
          }
        }
      },
      watch: {
        dialogAddingVisible (val) {
          this.dialogVisible = val
        },
        dialogVisible (val) {
          this.$emit('dialogClose', val)
        }
      },
      methods: {
        clickSelectStation (value) {
          if (value) {
            this.$emit('selectStation', value)
            this.isDisabled = false
          } else {
            this.isDisabled = true
          }
        },
        handleTagClose (tag) {
          this.form.factorTags.splice(this.form.factorTags.indexOf(tag), 1)
        },
        showTagInput () {
          this.tagInputVisible = true
          this.$nextTick(_ => {
            this.$refs.saveTagInput.$refs.input.focus()
          })
        },
        tagInputConfirm () {
          let inputValue = this.tagInputValue
          if (inputValue) {
            this.form.factorTags.push(inputValue)
          }
          this.tagInputVisible = false
          this.tagInputValue = ''
        },
        onSubmit (formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.form.pur_time = moment(this.form.pur_time).format('YYYY-MM-DD')
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
        formReset (formName) {
          this.$refs[formName].resetFields()
        }
      },
      name: 'addDevDialog'
    }
</script>
<style>
    #addDevDialogForm>div>div>.el-tag {
        margin: 5px;
    }
    #addDevDialogForm>div>div>.el-input,.el-date-editor.el-input {
        width: 226px;
    }
    #addDevTextAreaItem>div {
        width: 80%;
    }
</style>
