<template>
    <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            multiple
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList">
        <el-button size="small" type="primary">选择文件</el-button>
    </el-upload>
</template>

<script>
  export default {
    data () {
      return {
        fileList: []
      }
    },
    methods: {
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePreview (file) {
        console.log(file)
      },
      handleExceed (files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      }
    }
  }
</script>
